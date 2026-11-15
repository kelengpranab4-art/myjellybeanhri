// Persistent and In-Memory Fallback Rate Limiting

const memoryStore = new Map();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

/**
 * Clean up stale in-memory entries periodically
 */
function cleanupMemoryStore() {
  const now = Date.now();
  for (const [ip, entry] of memoryStore.entries()) {
    if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
      memoryStore.delete(ip);
    }
  }
}

/**
 * Checks rate limit for a client IP.
 * Uses Supabase table `rate_limits` if available, falls back to memory store.
 */
export async function checkRateLimit(ip, supabaseClient = null) {
  const cleanIp = String(ip || 'unknown-client').trim();

  // If Supabase client is supplied, persist rate limit state in PostgreSQL
  if (supabaseClient) {
    try {
      const now = new Date();
      const windowStartThreshold = new Date(now.getTime() - RATE_LIMIT_WINDOW_MS).toISOString();

      const { data: existing, error: selectErr } = await supabaseClient
        .from('rate_limits')
        .select('ip, request_count, window_start')
        .eq('ip', cleanIp)
        .single();

      if (selectErr && selectErr.code !== 'PGRST116') { // PGRST116 is "Row not found"
        // Fall back to memory on unexpected error
        console.warn('Rate limit query warning, falling back to memory:', selectErr.message);
      } else if (!existing || new Date(existing.window_start) < new Date(windowStartThreshold)) {
        // Reset or initialize window
        await supabaseClient
          .from('rate_limits')
          .upsert({
            ip: cleanIp,
            request_count: 1,
            window_start: now.toISOString()
          });
        return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1 };
      } else {
        // Window is active
        if (existing.request_count >= MAX_REQUESTS_PER_WINDOW) {
          return { allowed: false, remaining: 0 };
        }
        await supabaseClient
          .from('rate_limits')
          .update({ request_count: existing.request_count + 1 })
          .eq('ip', cleanIp);
        return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - (existing.request_count + 1) };
      }
    } catch (err) {
      console.warn('Supabase rate limiting error, using memory fallback:', err.message);
    }
  }

  // In-Memory Fallback
  cleanupMemoryStore();
  const now = Date.now();
  const entry = memoryStore.get(cleanIp);

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    memoryStore.set(cleanIp, { windowStart: now, count: 1 });
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1 };
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return { allowed: false, remaining: 0 };
  }

  entry.count += 1;
  return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - entry.count };
}
