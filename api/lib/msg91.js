// MSG91 SMS Flow API Service
// Strict security: Server-side only; credentials and recipient numbers are kept private

const MSG91_FLOW_URL = 'https://control.msg91.com/api/v5/flow';
const DEFAULT_TIMEOUT_MS = 8000;

/**
 * Normalizes Indian phone number to 91XXXXXXXXXX format required by MSG91
 */
export function formatIndianMobile(mobileStr) {
  if (!mobileStr) return null;
  // Remove spaces, hyphens, parentheses, plus signs
  const digits = String(mobileStr).replace(/\D/g, '');
  if (digits.length === 10) {
    return `91${digits}`;
  }
  if (digits.length === 12 && digits.startsWith('91')) {
    return digits;
  }
  return digits;
}

/**
 * Sends booking confirmation SMS notification via MSG91 Flow API
 */
export async function sendDateNotificationSMS({
  formattedDate,
  time,
  activity,
  bookingReference
}) {
  const authKey = process.env.MSG91_AUTH_KEY;
  const templateId = process.env.MSG91_TEMPLATE_ID;
  const rawRecipient = process.env.MSG91_RECIPIENT_NUMBER;
  const senderId = process.env.MSG91_SENDER_ID;
  const isMockMode = process.env.MSG91_MOCK === 'true' || !authKey || !templateId || !rawRecipient;

  const recipientMobile = formatIndianMobile(rawRecipient);

  // 1. Mock Mode during development / automated testing
  if (isMockMode) {
    console.log('📱 [MSG91 Mock Mode] SMS notification simulated for development/testing:');
    console.log(`   To: ${recipientMobile || 'Configured Mobile'}`);
    console.log(`   VAR1 (Date): ${formattedDate}`);
    console.log(`   VAR2 (Time): ${time}`);
    console.log(`   VAR3 (Activity): ${activity}`);
    console.log(`   VAR4 (Reference): ${bookingReference}`);

    return {
      success: true,
      status: 'submitted',
      messageId: `mock-msg91-${Date.now()}`,
      providerResponse: {
        type: 'success',
        message: 'Mock SMS dispatched successfully in development mode.',
        request_id: `mock-req-${Date.now()}`
      },
      isMock: true
    };
  }

  // 2. Validate real credentials
  if (!recipientMobile || recipientMobile.length < 10) {
    return {
      success: false,
      status: 'failed',
      error: 'Invalid or missing MSG91_RECIPIENT_NUMBER environment variable.',
      providerResponse: null
    };
  }

  // 3. Construct official MSG91 Flow API payload
  const payload = {
    template_id: templateId,
    short_url: '0',
    recipients: [
      {
        mobiles: recipientMobile,
        VAR1: formattedDate,
        VAR2: time,
        VAR3: activity,
        VAR4: bookingReference
      }
    ]
  };

  if (senderId) {
    payload.sender = senderId;
  }

  // 4. Send request with timeout controller
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

  try {
    const response = await fetch(MSG91_FLOW_URL, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        authkey: authKey,
        'content-type': 'application/json'
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    const responseText = await response.text();
    let responseData = {};
    try {
      responseData = JSON.parse(responseText);
    } catch {
      responseData = { rawResponse: responseText };
    }

    if (!response.ok) {
      console.error('MSG91 API error response:', response.status, responseData);
      return {
        success: false,
        status: 'failed',
        error: `MSG91 returned HTTP ${response.status}: ${JSON.stringify(responseData)}`,
        providerResponse: responseData
      };
    }

    // MSG91 returns type: 'success' or message id / request_id
    const messageId = responseData.request_id || responseData.message || `msg91-${Date.now()}`;

    return {
      success: true,
      status: 'submitted',
      messageId: String(messageId),
      providerResponse: responseData
    };
  } catch (networkErr) {
    clearTimeout(timeoutId);
    const isTimeout = networkErr.name === 'AbortError';
    const errorMsg = isTimeout
      ? 'Network timeout contacting MSG91 Flow API.'
      : `Network error contacting MSG91: ${networkErr.message}`;

    console.error('MSG91 Network Error:', errorMsg);

    return {
      success: false,
      status: 'failed',
      error: errorMsg,
      providerResponse: { error: errorMsg, isTimeout }
    };
  }
}
