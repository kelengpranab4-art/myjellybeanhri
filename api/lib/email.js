// Email Notification Service for Date Confirmations
// Supports Resend API (recommended on Vercel) and SMTP/Nodemailer (e.g. Gmail App Password)

import nodemailer from 'nodemailer';

/**
 * Builds romantic twilight HTML email template
 */
export function buildDateNotificationHtml({
  formattedDate,
  time,
  activity,
  bookingReference
}) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Date Confirmed with Hrishi! ♡</title>
</head>
<body style="margin: 0; padding: 0; background-color: #070814; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, serif; color: #f1f5f9;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #070814; padding: 40px 15px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" style="max-width: 560px; background: #16102b; border: 1px solid rgba(244, 114, 182, 0.35); border-radius: 24px; box-shadow: 0 15px 40px rgba(0,0,0,0.6); overflow: hidden;">
          
          <!-- Romantic Twilight Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #2b1646 0%, #170c2a 100%); padding: 36px 30px; text-align: center; border-bottom: 1px solid rgba(244, 114, 182, 0.2);">
              <div style="font-size: 32px; margin-bottom: 8px;">🌸 💌 🌸</div>
              <h1 style="margin: 0; font-family: Georgia, serif; font-size: 26px; font-weight: 700; color: #ffffff; letter-spacing: 0.5px;">
                A Little Something For You <span style="color: #f472b6;">♡</span>
              </h1>
              <p style="margin: 8px 0 0; font-size: 14px; color: #fbcfe8; font-style: italic;">
                He picked a date! Your date with Hrishi is officially locked in!
              </p>
            </td>
          </tr>

          <!-- Ticket Content -->
          <tr>
            <td style="padding: 32px 30px;">
              <table role="presentation" width="100%" style="background-color: #fbf8f0; border-radius: 16px; border: 1px solid rgba(180, 150, 110, 0.3); padding: 24px; box-shadow: inset 0 0 20px rgba(180, 150, 110, 0.1);">
                <tr>
                  <td>
                    <div style="display: flex; justify-content: space-between; border-bottom: 1px dashed #d6c7ab; padding-bottom: 12px; margin-bottom: 18px;">
                      <span style="font-family: monospace; font-size: 11px; font-weight: bold; color: #78350f; text-transform: uppercase; letter-spacing: 1px;">
                        OFFICIAL DATE RESERVATION
                      </span>
                      <span style="font-family: monospace; font-size: 11px; font-weight: bold; color: #be123c;">
                        ${bookingReference}
                      </span>
                    </div>

                    <table role="presentation" width="100%" cellspacing="0" cellpadding="8" style="font-family: Georgia, serif; color: #292524;">
                      <tr>
                        <td width="30%" style="font-size: 12px; color: #78716c; text-transform: uppercase;">📅 Date</td>
                        <td width="70%" style="font-size: 16px; font-weight: bold; color: #1c1917;">${formattedDate}</td>
                      </tr>
                      <tr>
                        <td style="font-size: 12px; color: #78716c; text-transform: uppercase;">⏰ Time</td>
                        <td style="font-size: 16px; font-weight: bold; color: #1c1917;">${time} (IST)</td>
                      </tr>
                      <tr>
                        <td style="font-size: 12px; color: #78716c; text-transform: uppercase;">✨ Activity</td>
                        <td style="font-size: 16px; font-weight: bold; color: #be123c;">${activity}</td>
                      </tr>
                    </table>

                    <div style="margin-top: 18px; padding-top: 14px; border-top: 1px dashed #d6c7ab; text-align: center; font-size: 13px; font-style: italic; color: #57534e;">
                      "Time to make wonderful memories together."
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Sweet Personal Note -->
              <div style="margin-top: 24px; text-align: center; font-size: 13px; color: #cbd5e1; line-height: 1.6;">
                This notification was sent automatically when the date was confirmed on your website.
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #100b21; padding: 20px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.05); font-size: 11px; color: #94a3b8;">
              A Little Something For You ♡ &bull; Made with love for Hrishi
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Builds plain text fallback for email
 */
export function buildDateNotificationText({
  formattedDate,
  time,
  activity,
  bookingReference
}) {
  return `
🌸 A Little Something For You ♡ — New Date Confirmed!

He said YES! A date has been scheduled with Hrishi:

• Date: ${formattedDate}
• Time: ${time} (IST)
• Activity: ${activity}
• Reference: ${bookingReference}

Can't wait for your date! ♡
  `.trim();
}

/**
 * Sends booking confirmation email via Resend API or SMTP
 */
export async function sendDateNotificationEmail({
  formattedDate,
  time,
  activity,
  bookingReference
}) {
  const recipientEmail = process.env.NOTIFICATION_EMAIL || process.env.ALERT_RECIPIENT_EMAIL || 'kelengpranab4@gmail.com';
  const fromEmail = process.env.NOTIFICATION_EMAIL_FROM || 'A Little Something For You <onboarding@resend.dev>';
  const resendApiKey = process.env.RESEND_API_KEY;
  const isMockMode = process.env.EMAIL_MOCK === 'true' || (!resendApiKey && !process.env.SMTP_HOST && !process.env.SMTP_USER);

  const subject = `💌 New Date Confirmed with Hrishi! ♡ [${bookingReference}]`;
  const html = buildDateNotificationHtml({ formattedDate, time, activity, bookingReference });
  const text = buildDateNotificationText({ formattedDate, time, activity, bookingReference });

  // 1. Mock Mode during development / testing
  if (isMockMode || !recipientEmail) {
    console.log('📧 [Email Mock Mode] Notification simulated for development/testing:');
    console.log(`   To: ${recipientEmail || 'Configured Recipient Email'}`);
    console.log(`   Subject: ${subject}`);
    console.log(`   Date: ${formattedDate} at ${time}`);
    console.log(`   Activity: ${activity}`);

    return {
      success: true,
      status: 'submitted',
      messageId: `mock-email-${Date.now()}`,
      isMock: true
    };
  }

  // 2. Option A: Resend REST API (Preferred on Vercel)
  if (resendApiKey) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [recipientEmail],
          subject: subject,
          html: html,
          text: text
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      const resData = await response.json();

      if (!response.ok) {
        console.error('Resend API error:', resData);
        return {
          success: false,
          status: 'failed',
          error: resData.message || `Resend HTTP ${response.status}`,
          providerResponse: resData
        };
      }

      return {
        success: true,
        status: 'submitted',
        messageId: resData.id || `resend-${Date.now()}`,
        providerResponse: resData
      };
    } catch (err) {
      console.error('Resend network error:', err.message);
      return {
        success: false,
        status: 'failed',
        error: err.message
      };
    }
  }

  // 3. Option B: SMTP / Nodemailer (e.g. Gmail App Password)
  if (process.env.SMTP_HOST || process.env.SMTP_USER) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '465', 10),
        secure: process.env.SMTP_SECURE !== 'false',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });

      const info = await transporter.sendMail({
        from: fromEmail,
        to: recipientEmail,
        subject: subject,
        text: text,
        html: html
      });

      return {
        success: true,
        status: 'submitted',
        messageId: info.messageId,
        providerResponse: info
      };
    } catch (err) {
      console.error('SMTP email error:', err.message);
      return {
        success: false,
        status: 'failed',
        error: err.message
      };
    }
  }

  return {
    success: false,
    status: 'failed',
    error: 'No email provider configured (set RESEND_API_KEY or SMTP credentials).'
  };
}
