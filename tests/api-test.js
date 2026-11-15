// Comprehensive Automated Test Suite for Date Booking API
// Run with: node tests/api-test.js

import assert from 'node:assert';
import { validateBookingRequest, formatDisplayDate, getNowInKolkata } from '../api/lib/validation.js';
import { checkRateLimit } from '../api/lib/rate-limit.js';
import { sendDateNotificationSMS, formatIndianMobile } from '../api/lib/msg91.js';
import { sendDateNotificationEmail, buildDateNotificationHtml, buildDateNotificationText } from '../api/lib/email.js';
import handler from '../api/book-date.js';

// Mock helper to create mock req and res
function createMockHttp({ method = 'POST', headers = {}, body = {} } = {}) {
  const req = {
    method,
    headers: {
      'x-forwarded-for': '127.0.0.1',
      ...headers
    },
    body
  };

  let responseData = null;
  let statusCode = 200;
  const resHeaders = {};

  const res = {
    setHeader: (key, val) => {
      resHeaders[key] = val;
    },
    status: (code) => {
      statusCode = code;
      return res;
    },
    json: (data) => {
      responseData = data;
      return res;
    },
    end: () => res
  };

  return {
    req,
    res,
    getStatus: () => statusCode,
    getData: () => responseData,
    getHeaders: () => resHeaders
  };
}

async function runTestSuite() {
  console.log('🧪 Starting Date Booking & Notification Test Suite...\n');
  let passedCount = 0;
  let totalCount = 0;

  function test(name, fn) {
    totalCount++;
    try {
      fn();
      console.log(`  ✅ [PASS] ${name}`);
      passedCount++;
    } catch (err) {
      console.error(`  ❌ [FAIL] ${name}`);
      console.error(`     Error: ${err.message}`);
    }
  }

  async function testAsync(name, fn) {
    totalCount++;
    try {
      await fn();
      console.log(`  ✅ [PASS] ${name}`);
      passedCount++;
    } catch (err) {
      console.error(`  ❌ [FAIL] ${name}`);
      console.error(`     Error: ${err.message}`);
    }
  }

  // 1. Phone number formatting
  test('Indian mobile number formatting', () => {
    assert.strictEqual(formatIndianMobile('9876543210'), '919876543210');
    assert.strictEqual(formatIndianMobile('+91 98765 43210'), '919876543210');
    assert.strictEqual(formatIndianMobile('919876543210'), '919876543210');
  });

  // 2. Validation - Valid Booking
  test('Validation: Accepts valid booking data', () => {
    const payload = {
      date: '2026-11-23',
      time: '5:00 PM',
      activity: 'Coffee and Conversations',
      idempotencyKey: 'test-key-valid-12345',
      honeypot: ''
    };
    const res = validateBookingRequest(payload);
    assert.strictEqual(res.valid, true);
    assert.strictEqual(res.data.date, '2026-11-23');
    assert.strictEqual(res.data.time, '5:00 PM');
    assert.strictEqual(res.data.activity, 'Coffee and Conversations');
  });

  // 3. Validation - Date before November 21, 2026 rejected
  test('Validation: Rejects date before November 21, 2026', () => {
    const payload = {
      date: '2026-11-15',
      time: '5:00 PM',
      activity: 'Sunset Walk',
      idempotencyKey: 'test-key-early-12345'
    };
    const res = validateBookingRequest(payload);
    assert.strictEqual(res.valid, false);
    assert(res.error.includes('earlier than'));
  });

  // 4. Validation - Past date rejected
  test('Validation: Rejects past date', () => {
    const payload = {
      date: '2023-01-01',
      time: '5:00 PM',
      activity: 'Movie Date',
      idempotencyKey: 'test-key-past-12345'
    };
    const res = validateBookingRequest(payload);
    assert.strictEqual(res.valid, false);
  });

  // 5. Validation - Invalid time rejected
  test('Validation: Rejects invalid time', () => {
    const payload = {
      date: '2026-11-25',
      time: '4:15 AM',
      activity: 'Pizza and Random Talks',
      idempotencyKey: 'test-key-time-12345'
    };
    const res = validateBookingRequest(payload);
    assert.strictEqual(res.valid, false);
    assert(res.error.includes('Invalid time'));
  });

  // 6. Validation - Invalid activity rejected
  test('Validation: Rejects unapproved activity', () => {
    const payload = {
      date: '2026-11-25',
      time: '5:00 PM',
      activity: 'Skydiving and Chaos',
      idempotencyKey: 'test-key-act-12345'
    };
    const res = validateBookingRequest(payload);
    assert.strictEqual(res.valid, false);
    assert(res.error.includes('Invalid activity'));
  });

  // 7. Validation - Honeypot spam trap
  test('Validation: Catches honeypot spam', () => {
    const payload = {
      date: '2026-11-25',
      time: '5:00 PM',
      activity: 'Sunset Walk',
      idempotencyKey: 'test-key-spam-12345',
      honeypot: 'http://spam-link.ru'
    };
    const res = validateBookingRequest(payload);
    assert.strictEqual(res.valid, false);
    assert.strictEqual(res.isSpam, true);
  });

  // 8. Validation - Missing or invalid idempotency key
  test('Validation: Rejects short or invalid idempotency key', () => {
    const payload = {
      date: '2026-11-25',
      time: '5:00 PM',
      activity: 'Sunset Walk',
      idempotencyKey: 'abc' // too short (< 8)
    };
    const res = validateBookingRequest(payload);
    assert.strictEqual(res.valid, false);
    assert(res.error.includes('idempotencyKey'));
  });

  // 9. Rate limiting
  await testAsync('Rate Limiter: Limits excessive requests from single IP', async () => {
    const testIp = '198.51.100.42';
    // Consume 5 allowed requests
    for (let i = 0; i < 5; i++) {
      const res = await checkRateLimit(testIp);
      assert.strictEqual(res.allowed, true);
    }
    // 6th request must be blocked
    const blockedRes = await checkRateLimit(testIp);
    assert.strictEqual(blockedRes.allowed, false);
  });

  // 10. MSG91 Mock Notification dispatch
  await testAsync('MSG91: Safe mock SMS dispatch during test mode', async () => {
    process.env.MSG91_MOCK = 'true';
    const smsRes = await sendDateNotificationSMS({
      formattedDate: '23 November 2026',
      time: '5:00 PM',
      activity: 'Coffee and Conversations',
      bookingReference: 'DATE-TEST001'
    });
    assert.strictEqual(smsRes.success, true);
    assert.strictEqual(smsRes.status, 'submitted');
    assert.strictEqual(smsRes.isMock, true);
  });

  // 11. Handler HTTP Method validation
  await testAsync('API Handler: Rejects GET method with 405', async () => {
    const { req, res, getStatus, getData } = createMockHttp({ method: 'GET' });
    await handler(req, res);
    assert.strictEqual(getStatus(), 405);
    assert.strictEqual(getData().success, false);
  });

  // 12. Handler: Full Valid Booking Flow
  await testAsync('API Handler: Processes complete booking request', async () => {
    const uniqueKey = `test-e2e-${Date.now()}`;
    const { req, res, getStatus, getData } = createMockHttp({
      method: 'POST',
      body: {
        date: '2026-11-24',
        time: '5:00 PM',
        activity: 'Sunset Walk',
        idempotencyKey: uniqueKey,
        honeypot: ''
      }
    });

    await handler(req, res);
    assert.strictEqual(getStatus(), 200);
    const data = getData();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.booking.date, '2026-11-24');
    assert.strictEqual(data.booking.time, '5:00 PM');
    assert.strictEqual(data.booking.activity, 'Sunset Walk');
    assert.strictEqual(data.notification.status, 'submitted');
    assert.strictEqual(data.notification.sms, 'submitted');
    assert.strictEqual(data.notification.email, 'submitted');
  });

  // 13. Email Template Generation
  test('Email: HTML and Plain Text templates format properly', () => {
    const html = buildDateNotificationHtml({
      formattedDate: '23 November 2026',
      time: '5:00 PM',
      activity: 'Coffee and Conversations',
      bookingReference: 'DATE-REF01'
    });
    assert(html.includes('23 November 2026'));
    assert(html.includes('5:00 PM (IST)'));
    assert(html.includes('Coffee and Conversations'));
    assert(html.includes('DATE-REF01'));

    const text = buildDateNotificationText({
      formattedDate: '23 November 2026',
      time: '5:00 PM',
      activity: 'Coffee and Conversations',
      bookingReference: 'DATE-REF01'
    });
    assert(text.includes('Coffee and Conversations'));
    assert(text.includes('DATE-REF01'));
  });

  // 14. Email Mock Dispatch
  await testAsync('Email: Safe mock email dispatch during development', async () => {
    process.env.EMAIL_MOCK = 'true';
    const emailRes = await sendDateNotificationEmail({
      formattedDate: '23 November 2026',
      time: '5:00 PM',
      activity: 'Coffee and Conversations',
      bookingReference: 'DATE-REF01'
    });
    assert.strictEqual(emailRes.success, true);
    assert.strictEqual(emailRes.status, 'submitted');
    assert.strictEqual(emailRes.isMock, true);
  });

  // 15. Handler: Idempotency (duplicate request)
  await testAsync('API Handler: Duplicate idempotency key returns existing booking', async () => {
    const dupKey = `test-dup-${Date.now()}`;
    const payload = {
      date: '2026-11-26',
      time: '7:00 PM',
      activity: 'Pizza and Random Talks',
      idempotencyKey: dupKey,
      honeypot: ''
    };

    // First request
    const mock1 = createMockHttp({ method: 'POST', body: payload });
    await handler(mock1.req, mock1.res);
    assert.strictEqual(mock1.getStatus(), 200);

    // Second request with SAME idempotency key
    const mock2 = createMockHttp({ method: 'POST', body: payload });
    await handler(mock2.req, mock2.res);
    assert.strictEqual(mock2.getStatus(), 200);
    assert.strictEqual(mock2.getData().success, true);
  });

  console.log(`\n========================================`);
  console.log(`Test Results: ${passedCount}/${totalCount} tests passed.`);
  console.log(`========================================\n`);

  if (passedCount !== totalCount) {
    process.exit(1);
  }
}

runTestSuite();
