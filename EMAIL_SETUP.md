# Email Setup Guide

## 🔧 Configuration Steps

### 1. Generate Gmail App Password

Since you're using Gmail, you need to create an **App Password** (not your regular Gmail password):

1. Go to your Google Account: https://myaccount.google.com/
2. Click on **Security** in the left sidebar
3. Under "Signing in to Google", click on **2-Step Verification** (you must enable this first)
4. Scroll down and click on **App passwords**
5. Select **Mail** as the app and **Other (Custom name)** as the device
6. Enter "Amirdha Stickers Website" as the name
7. Click **Generate**
8. **Copy the 16-character password** (it will look like: `xxxx xxxx xxxx xxxx`)

### 2. Update .env File

Open the `.env` file in the root directory and update it:

```env
GMAIL_USER=amirdhastickers@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx    # Paste your generated app password here

VITE_API_URL=http://localhost:3001
```

**⚠️ Important:** 
- Remove spaces from the app password (make it `xxxxxxxxxxxxxxxx`)
- Never commit this file to Git (it's already in .gitignore)

### 3. Start Both Servers

You need to run both the frontend and backend:

**Option A: Run Both Together (Recommended)**
```bash
npm run dev:full
```

**Option B: Run Separately**

Terminal 1 - Frontend:
```bash
npm run dev
```

Terminal 2 - Backend:
```bash
npm run server
```

### 4. Test the Contact Form

1. Open http://localhost:8080 (or the port shown in terminal)
2. Go to the Contact page
3. Fill out the form with test data
4. Click "Send Message"
5. Check **amirdhastickers@gmail.com** inbox for the email

## 📁 Files Created

- ✅ `.env` - Environment variables (Gmail credentials)
- ✅ `server.js` - Backend API server (handles email sending)
- ✅ Updated `ContactSection.tsx` - Frontend form (calls backend API)
- ✅ Updated `package.json` - Added server scripts

## 🔍 How It Works

```
User fills form → Frontend sends data to backend API → Backend uses Nodemailer
→ Gmail SMTP sends email → Email arrives at amirdhastickers@gmail.com
```

## 🐛 Troubleshooting

**Email not sending?**
- Check that both servers are running
- Verify app password is correct in .env
- Check backend terminal for error messages
- Make sure 2-Step Verification is enabled on Gmail

**"Authentication failed" error?**
- Generate a new app password
- Make sure there are no spaces in the password
- Verify you're using amirdhastickers@gmail.com

**Backend not starting?**
- Check if port 3001 is already in use
- Try changing PORT in .env file
- Make sure all dependencies installed: `npm install`

## 📧 Email Format

Emails will include:
- Sender's name, email, and phone
- Subject line
- Message content
- Professional HTML formatting
- Reply-to set to sender's email (you can reply directly)

## 🚀 Production Deployment

For production, you'll need to:
1. Deploy the backend separately (Heroku, Railway, Render, etc.)
2. Update `VITE_API_URL` in .env to your backend URL
3. Keep Gmail credentials secure on your hosting platform
4. Enable CORS for your frontend domain

## 🔒 Security Notes

- ✅ Gmail credentials are stored in .env (not in code)
- ✅ .env is in .gitignore (won't be committed)
- ✅ Backend validates all form fields
- ✅ Uses Gmail's secure SMTP connection
- ✅ App password is safer than regular password
