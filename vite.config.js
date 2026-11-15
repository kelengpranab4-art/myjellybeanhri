import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'api-serverless-dev-middleware',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url && (req.url === '/api/book-date' || req.url.startsWith('/api/book-date?'))) {
            try {
              const { default: handler } = await import('./api/book-date.js');
              let body = '';
              req.on('data', (chunk) => {
                body += chunk;
              });
              req.on('end', async () => {
                if (body) {
                  try {
                    req.body = JSON.parse(body);
                  } catch {
                    req.body = body;
                  }
                }
                res.status = (code) => {
                  res.statusCode = code;
                  return res;
                };
                res.json = (data) => {
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify(data));
                  return res;
                };
                try {
                  await handler(req, res);
                } catch (e) {
                  console.error('API middleware error:', e);
                  res.statusCode = 500;
                  res.end(JSON.stringify({ success: false, error: e.message }));
                }
              });
              return;
            } catch (err) {
              console.error('Failed to load api/book-date handler:', err);
            }
          }
          next();
        });
      }
    }
  ],
  server: {
    port: 5173,
    host: true
  }
});
