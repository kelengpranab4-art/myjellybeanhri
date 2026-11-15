# MSG91 & Indian Telecom DLT Setup Guide

This guide walks you through configuring **MSG91 Flow API** and Indian **Distributed Ledger Technology (DLT)** compliance (mandatory as per TRAI regulations in India) to deliver instant SMS notifications when Hrishi confirms a date.

---

## 1. Overview of TRAI / DLT Requirements

In India, the Telecom Regulatory Authority of India (TRAI) mandates that **all commercial and automated SMS messages** sent to Indian mobile numbers (+91) must be routed through registered Principal Entities with approved Headers (Sender IDs) and approved Content Templates.

### Key Terms:
- **Principal Entity (PE)**: Your registered business or personal enterprise on an operator DLT portal.
- **Header / Sender ID**: The 6-character alphanumeric sender name that appears on the phone (e.g., `DTCONF`, `MYLOVE`, `HRISHI`).
- **DLT Template ID**: The unique approval ID issued by the DLT operator for your exact text template.
- **MSG91 Flow ID / Template ID**: The template ID in MSG91's Flow Builder mapped to your DLT Template ID.

---

## 2. Step-by-Step Setup Procedure

### Step 1: Register on an Indian DLT Portal
Register as a Principal Entity on any Indian telecom DLT portal (registration on one portal syncs across all operators):
- [Jio DLT (TrueConnect)](https://trueconnect.jio.com)
- [Airtel DLT](https://www.airtel.in/commercial-communication)
- [Vodafone Idea (Vi) DLT](https://www.vilpower.in)
- [BSNL DLT](https://www.ucc-bsnl.co.in)

> **Important Category Selection**:  
> Consult with MSG91 support regarding the category for personal/notification invitations. Typically, notifications fall under **Service Implicit** (for alerts and transactional notifications) or **Service Explicit** / **Promotional** depending on your entity type.

---

### Step 2: Register Header (Sender ID)
1. In your DLT portal, navigate to **Headers** > **Add Header**.
2. Select **Service Implicit** (or your assigned category).
3. Choose a 6-character alphanumeric identifier (e.g., `HRISHI` or `DTPASS`).
4. Submit justification explaining that it is used for personal date reservation confirmations.

---

### Step 3: Register Content Template
1. In the DLT portal, navigate to **Templates** > **Content Template** > **Add**.
2. Select your approved Header.
3. Message Type: **Text (ASCII)**.
4. Draft the message using standard DLT variables `{#var#}`:

```text
Yay! A date has been booked for {#var#} at {#var#}. Chosen activity: {#var#}. Reference: {#var#}. - A Little Something For You
```

5. Submit for approval. Once approved, copy the **DLT Content Template ID** (a 19-digit number).

---

### Step 4: Configure MSG91 Dashboard
1. Log into your [MSG91 Dashboard](https://control.msg91.com/).
2. Navigate to **SMS** > **DLT** and sync or enter your Entity ID and approved Sender ID.
3. Obtain your **Authkey**:
   - Go to **Dashboard** > **Authkey** > **Create Authkey** (or copy existing key).
   - This value is your `MSG91_AUTH_KEY`.

---

### Step 5: Create MSG91 Flow (Campaign Template)
1. Go to **MSG91** > **Campaign / Flow Builder**.
2. Click **Create New Flow**.
3. Select channel: **SMS**.
4. Select your approved Sender ID.
5. In the message box, map your DLT approved text:
   ```text
   Yay! A date has been booked for ##VAR1## at ##VAR2##. Chosen activity: ##VAR3##. Reference: ##VAR4##. - A Little Something For You
   ```
6. Link the **DLT Template ID** in the template properties modal.
7. Save and Publish the Flow.
8. Copy the **Template ID / Flow ID** (e.g., `67375a22d6fc05...`).
   - This value is your `MSG91_TEMPLATE_ID`.

---

### Step 6: Map Environment Variables
In your local `.env.local` or Vercel Project Settings, add:

```env
MSG91_AUTH_KEY=your_actual_msg91_authkey
MSG91_TEMPLATE_ID=your_msg91_flow_template_id
MSG91_SENDER_ID=your_dlt_sender_id
MSG91_RECIPIENT_NUMBER=919876543210
```

> **Note**: Replace `919876543210` with your actual personal 10-digit Indian mobile number prefixed with `91`.

---

## 3. Testing with Mock Mode vs Production

To test locally without consuming SMS credits or before your DLT template is approved:
- Set `MSG91_MOCK=true` in your `.env.local`.
- When set to `true`, the system simulates successful SMS dispatch, prints the exact payload to server logs, and stores `submitted` status in the database.
- Once your DLT and MSG91 Flow are approved, set `MSG91_MOCK=false` to send live SMS messages to your phone!
