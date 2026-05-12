# Deployment Guide - Gweno Kipodi SDA Church Website

## Current Status
✅ Code built successfully
✅ All tests passing
✅ Ready for deployment
✅ Git repository initialized with commit: `b4c9742`

## Option 1: Deploy to Vercel (Recommended)

### Quick Start - Automatic GitHub Integration
1. Push to GitHub:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/gweno-kipodi-website.git
   git branch -M main
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com)
3. Click **"New Project"**
4. Select your GitHub repository
5. Click **Deploy** (Vercel auto-detects Next.js config)

### Manual Deployment via Vercel CLI
```bash
npx vercel
```
Follow the prompts:
- Login with GitHub/GitLab/GitBucket
- Select project name
- Keep all settings as default (Vercel auto-detects Next.js)
- Confirm deployment

**Expected URL:** `https://gweno-kipodi-website.vercel.app`

---

## Option 2: Deploy to Netlify

1. Build the project locally:
   ```bash
   npm run build
   ```

2. Go to [netlify.com](https://netlify.com)
3. Drag & drop the `.next/standalone` folder
4. Or connect GitHub for continuous deployment

---

## Option 3: Deploy to Firebase Hosting

Since your project uses Firebase (`lib/firebase.ts`):

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase init hosting
   ```

2. Configure `firebase.json`:
   ```json
   {
     "hosting": {
       "public": ".next/static",
       "rewrites": [
         {
           "source": "**",
           "destination": "/index.html"
         }
       ]
     }
   }
   ```

3. Deploy:
   ```bash
   npm run build
   firebase deploy
   ```

---

## Environment Variables

Create a `.env.local` file if needed for Firebase:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

---

## Post-Deployment Checklist

- [ ] Website loads successfully
- [ ] All routes accessible (/, /hymns, /sermons, /contact, etc.)
- [ ] Mobile responsive
- [ ] Forms submit properly
- [ ] Firebase connection working (if using backend)
- [ ] Analytics configured
- [ ] SSL certificate active
- [ ] Performance optimized

---

## Next Steps

1. **Set up custom domain** (optional)
2. **Configure analytics** (Google Analytics, Vercel Analytics)
3. **Enable auto-deployment** from GitHub
4. **Set up monitoring** (error tracking, uptime monitoring)
5. **Add CI/CD** for automated testing before deployment

---

## Useful Commands

```bash
# Local development
npm run dev

# Build for production
npm run build

# Start production build locally
npm start

# Lint code
npm run lint
```

---

## Support

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Netlify Docs:** https://docs.netlify.com
- **Firebase Docs:** https://firebase.google.com/docs
