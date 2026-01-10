# Vercel Deployment Guide for Amirdha Stickers

## Prerequisites
- GitHub repository: https://github.com/amirdha-01/amirdhastickers.git
- Vercel account (sign up at https://vercel.com)

## Deployment Steps

### 1. Push Latest Changes to GitHub
```bash
git add .
git commit -m "Add Vercel configuration with serverless functions"
git push origin main
```

### 2. Import Project to Vercel
1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub repository: `amirdha-01/amirdhastickers`
4. Click "Import"

### 3. Configure Project Settings
- **Framework Preset**: Vite
- **Root Directory**: `./` (leave as is)
- **Build Command**: `npm run vercel-build` (auto-detected)
- **Output Directory**: `dist` (auto-detected)

### 4. Add Environment Variables
In Vercel dashboard, go to **Settings → Environment Variables** and add:

#### Gmail Configuration (Required for Contact Form)
```
GMAIL_USER=amirdhastickers@gmail.com
GMAIL_APP_PASSWORD=wasjlkvdbbyyzuee
```

#### Cloudinary Configuration (Required for Image Uploads)
```
VITE_CLOUDINARY_CLOUD_NAME=donwqvg6t
VITE_CLOUDINARY_API_KEY=998627351575865
VITE_CLOUDINARY_API_SECRET=sEV-2Kca4dk6TKE2-HblJKlnFBo
VITE_CLOUDINARY_UPLOAD_PRESET=Amirdha Sample
CLOUDINARY_URL=cloudinary://998627351575865:sEV-2Kca4dk6TKE2-HblJKlnFBo@donwqvg6t
```

#### API Configuration
```
VITE_API_URL=https://your-project-name.vercel.app
```
*Note: Replace with your actual Vercel URL after deployment*

### 5. Deploy
1. Click **"Deploy"**
2. Wait for the build to complete (2-5 minutes)
3. Your site will be live at: `https://your-project-name.vercel.app`

### 6. Update API URL
After first deployment:
1. Copy your Vercel URL
2. Go to **Settings → Environment Variables**
3. Update `VITE_API_URL` with your actual URL
4. Redeploy from **Deployments** tab

## Backend API Endpoints

Your serverless functions will be available at:
- **Send Email**: `https://your-domain.vercel.app/api/send-email`
- **Health Check**: `https://your-domain.vercel.app/api/health`

## Project Structure
```
stickers/
├── api/                    # Vercel Serverless Functions
│   ├── send-email.js      # Contact form email handler
│   └── health.js          # Health check endpoint
├── src/                   # React application
├── dist/                  # Build output (auto-generated)
├── vercel.json           # Vercel configuration
├── .env                  # Environment variables (local only)
└── package.json          # Dependencies and scripts
```

## Important Notes

### Security
- ✅ `.env` file is gitignored (not pushed to GitHub)
- ✅ Environment variables set in Vercel dashboard
- ⚠️ **NEVER** commit `.env` to GitHub

### Custom Domain (Optional)
1. Go to **Settings → Domains**
2. Add your custom domain
3. Follow DNS configuration instructions

### Automatic Deployments
- Every push to `main` branch triggers auto-deployment
- Preview deployments for pull requests

### Monitoring
- View logs: **Deployments → [Select Deployment] → View Function Logs**
- Check analytics: **Analytics** tab

## Testing After Deployment

### Test Contact Form
1. Visit your site: `https://your-domain.vercel.app/contact`
2. Fill out the form
3. Check if email arrives at `amirdhastickers@gmail.com`

### Test API Health
```bash
curl https://your-domain.vercel.app/api/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Email API is running",
  "timestamp": "2026-01-03T..."
}
```

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Verify all dependencies are in `package.json`
- Ensure `vercel-build` script exists

### Contact Form Not Working
- Verify environment variables are set
- Check Function Logs for errors
- Ensure Gmail App Password is correct

### 404 on Routes
- Vercel automatically handles SPA routing via `vercel.json`
- Refresh should work on all routes

## Support
For issues, check:
- Vercel logs: **Deployments → View Function Logs**
- GitHub Actions (if configured)
- Contact: amirdhastickers@gmail.com
