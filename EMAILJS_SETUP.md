# EmailJS Setup Instructions

The contact form is configured to send emails to **amirdhastickers@gmail.com** using EmailJS.

## Setup Steps:

### 1. Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (allows 200 emails/month)
3. Verify your email address

### 2. Add Email Service
1. Go to **Email Services** in your dashboard
2. Click **Add New Service**
3. Choose **Gmail** (recommended for Gmail accounts)
4. Click **Connect Account** and authorize with **amirdhastickers@gmail.com**
5. Copy the **Service ID** (e.g., `service_xyz123`)

### 3. Create Email Template
1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template structure:

```
Subject: New Contact Form Message - {{subject}}

From: {{from_name}}
Email: {{from_email}}
Phone: {{from_phone}}

Subject: {{subject}}

Message:
{{message}}

---
This message was sent from the Amirdha Stickers contact form.
```

4. Save and copy the **Template ID** (e.g., `template_abc456`)

### 4. Get Public Key
1. Go to **Account** → **General**
2. Copy your **Public Key** (e.g., `abcDEF123xyz`)

### 5. Update the Code
Open `src/components/sections/ContactSection.tsx` and replace:

```typescript
const serviceId = 'YOUR_SERVICE_ID';      // Replace with your Service ID
const templateId = 'YOUR_TEMPLATE_ID';    // Replace with your Template ID
const publicKey = 'YOUR_PUBLIC_KEY';      // Replace with your Public Key
```

### 6. Test the Form
1. Fill out the contact form on your website
2. Click "Send Message"
3. Check **amirdhastickers@gmail.com** inbox for the email

## Troubleshooting:

- **Emails not arriving**: Check EmailJS dashboard logs
- **Service blocked**: Make sure Gmail account has "Less secure app access" enabled or use App Password
- **Rate limit**: Free tier allows 200 emails/month
- **Spam folder**: Check spam/junk folder in Gmail

## Alternative: Use Environment Variables (Recommended)

Create a `.env` file in the root directory:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Then update ContactSection.tsx:

```typescript
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
```

This keeps your credentials secure and out of source control.

## Free Alternative Services:

If you prefer not to use EmailJS, consider:
- **Web3Forms** (https://web3forms.com/) - 250 submissions/month
- **FormSpree** (https://formspree.io/) - 50 submissions/month
- **Netlify Forms** - If hosting on Netlify
- **Vercel Forms** - If hosting on Vercel
