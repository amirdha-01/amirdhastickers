# Render Deployment Guide

## Overview
This project is configured to run as a full-stack application on Render, with the Express backend serving both the API and the built React frontend.

## How It Works

1. **Build Process**: Render runs `npm run build` which creates the production-ready frontend in the `dist` folder
2. **Start Process**: Render runs `npm start` which starts the Express server
3. **Server Behavior**: 
   - Express serves API endpoints at `/api/*`
   - Express serves the static frontend files from `dist` folder
   - All other routes are handled by React Router (SPA routing)

## Deployment Steps

### Option 1: Using render.yaml (Recommended)

1. **Push your code to GitHub** (if not already done)

2. **Go to Render Dashboard**: https://dashboard.render.com/

3. **Create New Web Service**:
   - Click "New +" → "Blueprint"
   - Connect your GitHub repository
   - Render will automatically detect the `render.yaml` file
   - Click "Apply"

4. **Set Environment Variables** in Render Dashboard:
   - `GMAIL_USER` - Your Gmail address
   - `GMAIL_APP_PASSWORD` - Your Gmail app password
   - `NODE_ENV` - production (usually auto-set)

### Option 2: Manual Setup

1. **Go to Render Dashboard**: https://dashboard.render.com/

2. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository branch

3. **Configure Build Settings**:
   - **Name**: amirdha-stickers (or your preferred name)
   - **Region**: Choose closest to your users
   - **Branch**: main (or your default branch)
   - **Root Directory**: stickers (if your repo has multiple folders)
   - **Runtime**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free (or your preferred plan)

4. **Set Environment Variables**:
   - `GMAIL_USER` - Your Gmail address
   - `GMAIL_APP_PASSWORD` - Your Gmail app password
   - `NODE_ENV` - production

5. **Click "Create Web Service"**

## Important Notes

### Gmail Setup
Make sure you have:
- Enabled 2-factor authentication on your Gmail account
- Generated an App Password (not your regular password)
- Set both `GMAIL_USER` and `GMAIL_APP_PASSWORD` in Render environment variables

### Port Configuration
- Render automatically sets the `PORT` environment variable
- The server is configured to use `process.env.PORT || 3001`
- No manual port configuration needed

### Static File Serving
The server is configured to:
1. Serve API routes first (`/api/*`)
2. Serve static files from `dist` folder
3. Fallback to `index.html` for client-side routing

### Health Check
A health check endpoint is available at `/api/health` which returns:
```json
{ "status": "OK", "message": "Email API is running" }
```

## Testing Locally

To test the production setup locally:

```bash
# Build the frontend
npm run build

# Start the server (it will serve the built frontend)
npm start
```

Visit http://localhost:3001 to see the app running.

## Development Mode

For local development with hot-reload:

```bash
npm run dev:full
```

This runs the Vite dev server (port 5173) and Express server (port 3001) concurrently.

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json` (not just devDependencies if needed in production)
- Review build logs in Render dashboard

### Email Not Sending
- Verify environment variables are set correctly
- Check Gmail app password is valid
- Review server logs in Render dashboard

### 404 Errors on Page Refresh
- Ensure the catch-all route (`app.get('*')`) is at the bottom of server.js
- Verify `dist/index.html` exists after build

### API Calls Failing
- Check if API endpoints start with `/api/`
- Verify CORS settings in server.js
- Check environment variables are set

## Support

For issues specific to Render, visit:
- Render Docs: https://render.com/docs
- Render Status: https://status.render.com/
