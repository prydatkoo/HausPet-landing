# 🚀 Vercel Deployment Guide

> Complete step-by-step guide to deploy HausPet Landing Page to Vercel

---

## 📋 Prerequisites

Before deploying to Vercel, ensure you have:

- ✅ GitHub repository created and code pushed
- ✅ Vercel account (sign up at https://vercel.com)
- ✅ Resend API key (get from https://resend.com)
- ✅ Vercel KV database (we'll create this)
- ✅ Admin password chosen (for admin panel)

---

## 🎯 Step-by-Step Deployment

### Step 1: Create Vercel Account

1. Go to **https://vercel.com**
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub account

---

### Step 2: Import Your GitHub Repository

1. Once logged in, click **"Add New..."** → **"Project"**
2. You'll see your GitHub repositories
3. Find **"HausPet-landing"**
4. Click **"Import"**

---

### Step 3: Configure Project Settings

#### Framework Preset
- **Framework Preset:** Vite
- **Root Directory:** `./` (leave as default)
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

These should be auto-detected! ✅

---

### Step 4: Set Up Vercel KV Database

**Before deploying, create the KV database:**

1. In the same project import screen, scroll down
2. Click **"Storage"** tab
3. Click **"Create"** → **"KV Database"**
4. Name it: `hauspet-kv`
5. Click **"Create"**

**Important:** This will automatically add the KV environment variables to your project!

The following variables will be auto-added:
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`
- `KV_REST_API_READ_ONLY_TOKEN`
- `KV_URL`

---

### Step 5: Add Environment Variables

#### Get Resend API Key

1. Go to **https://resend.com**
2. Sign up or log in
3. Go to **API Keys**
4. Click **"Create API Key"**
5. Name it "HausPet Production"
6. Copy the key (starts with `re_`)

#### Add Variables to Vercel

In the Vercel import screen:

1. Click **"Environment Variables"** section
2. Add these variables:

| Name | Value | Note |
|------|-------|------|
| `RESEND_API_KEY` | `re_YourActualKey` | From Resend dashboard |
| `ADMIN_ACCESS_KEY` | `YourSecurePassword123!` | Choose a strong password |

**Note:** `KV_REST_API_URL` and `KV_REST_API_TOKEN` are already added from Step 4!

---

### Step 6: Deploy!

1. Click **"Deploy"** button
2. Wait for the build to complete (2-3 minutes)
3. 🎉 Your site is live!

---

## 🔗 Access Your Deployed Site

After deployment:

- **Production URL:** `https://your-project-name.vercel.app`
- **Admin Panel:** `https://your-project-name.vercel.app/admin`

### Custom Domain (Optional)

1. Go to Project **Settings** → **Domains**
2. Click **"Add"**
3. Enter your domain: `hauspet.com`
4. Follow DNS configuration instructions
5. Vercel handles SSL automatically! 🔒

---

## 🔧 Post-Deployment Configuration

### Verify Environment Variables

1. Go to Project **Settings**
2. Click **"Environment Variables"**
3. Verify all variables are set:
   - ✅ `RESEND_API_KEY`
   - ✅ `KV_REST_API_URL`
   - ✅ `KV_REST_API_TOKEN`
   - ✅ `ADMIN_ACCESS_KEY`

### Test Your Deployment

#### Test the Homepage
1. Visit `https://your-project-name.vercel.app`
2. Verify the page loads correctly
3. Test language switcher (EN/DE)
4. Check all sections render

#### Test Form Submission
1. Scroll to "Early Access" section
2. Fill out the form
3. Submit
4. Check your email for confirmation
5. Check admin email for notification

#### Test Admin Panel
1. Visit `https://your-project-name.vercel.app/admin`
2. Enter your `ADMIN_ACCESS_KEY`
3. Verify submissions appear
4. Test export to CSV

---

## 📊 Monitor Your Deployment

### Vercel Dashboard

Access real-time metrics:

1. Go to your project dashboard
2. View:
   - **Analytics:** Traffic, visitors, page views
   - **Deployments:** Build history, logs
   - **Functions:** Serverless function performance
   - **Logs:** Real-time function logs

### Function Logs

To view API logs:

1. Go to **Functions** tab
2. Select a function (e.g., `submit-form`)
3. View real-time logs
4. Use for debugging

---

## 🔄 Continuous Deployment

Vercel automatically deploys when you push to GitHub!

### Automatic Deployments

- **Main branch:** Production deployment
- **Other branches:** Preview deployments
- **Pull requests:** Preview deployments

### Manual Redeploy

1. Go to **Deployments** tab
2. Find the latest deployment
3. Click **"..."** → **"Redeploy"**

---

## 🌍 Environment-Specific Variables

### Production Variables

Already set in Step 5!

### Preview/Development Variables (Optional)

1. Go to **Settings** → **Environment Variables**
2. For each variable, select scope:
   - ✅ Production
   - ✅ Preview
   - ✅ Development
3. Add different values for each environment if needed

---

## 🔒 Security Settings

### Enable Security Features

1. Go to **Settings** → **Security**
2. Enable:
   - ✅ **Vercel Authentication** (if you want to password-protect preview deployments)
   - ✅ **Trusted IPs** (optional - restrict access by IP)

### SSL/HTTPS

- Automatically enabled by Vercel ✅
- Certificates auto-renewed
- HSTS enabled

---

## 📈 Performance Optimization

### Vercel Analytics (Optional)

1. Go to **Analytics** tab
2. Click **"Enable Web Analytics"**
3. Free for hobby plan!
4. Track:
   - Real User Monitoring (RUM)
   - Core Web Vitals
   - Page performance

### Edge Caching

Vercel automatically caches static assets at the edge for faster loading!

---

## 🐛 Troubleshooting

### Build Fails

**Check build logs:**
1. Go to **Deployments**
2. Click on failed deployment
3. View **Build Logs**
4. Fix errors in code
5. Push to GitHub (auto-redeploys)

**Common issues:**
- Missing dependencies: Run `npm install` locally
- Environment variables: Verify they're set correctly
- Build command: Check `package.json` scripts

### Function Errors

**View function logs:**
1. Go to **Functions** tab
2. Select the failing function
3. Check error messages
4. Verify environment variables
5. Check API integrations (Resend, KV)

### Environment Variables Not Working

1. Verify variable names match exactly (case-sensitive)
2. Check variable values (no extra spaces)
3. Redeploy after adding variables
4. Check scope (Production/Preview/Development)

### Database Connection Issues

1. Verify KV database is created
2. Check `KV_REST_API_URL` and `KV_REST_API_TOKEN`
3. Test connection from function logs
4. Recreate KV database if needed

---

## 📱 Mobile Testing

Test your deployed site on mobile:

1. Open on your phone: `https://your-project-name.vercel.app`
2. Test touch interactions
3. Verify responsive design
4. Test forms on mobile

---

## 🔔 Set Up Notifications

### Deployment Notifications

1. Go to **Settings** → **Notifications**
2. Connect:
   - Slack
   - Discord
   - Email
3. Get notified on:
   - Successful deployments
   - Failed builds
   - Comments on deployments

---

## 📊 Vercel KV Database Management

### View Database Contents

1. Go to **Storage** tab
2. Click on your KV database
3. View stored keys and values
4. Manually add/edit/delete entries if needed

### Database Limits

**Hobby Plan:**
- Storage: 256 MB
- Commands: 10,000 per day
- Max key size: 1 MB

**Pro Plan:**
- Storage: 512 MB+
- Commands: 1M+ per day

---

## 💰 Pricing

### Hobby Plan (Free)
- ✅ Unlimited deployments
- ✅ Serverless functions
- ✅ 100GB bandwidth/month
- ✅ Web analytics
- ✅ KV database (256MB)
- ✅ Custom domains

**Perfect for HausPet landing page!**

### Pro Plan ($20/month)
- Everything in Hobby
- More bandwidth
- Password protection
- Advanced analytics
- Team collaboration

---

## 📋 Deployment Checklist

Before going live:

- [ ] All environment variables set
- [ ] KV database created and connected
- [ ] Resend API key configured
- [ ] Admin password is strong
- [ ] Forms tested and working
- [ ] Email confirmations working
- [ ] Admin panel accessible
- [ ] Custom domain configured (optional)
- [ ] Analytics enabled
- [ ] Performance tested
- [ ] Mobile responsive verified
- [ ] SSL certificate active (auto)

---

## 🎉 Success!

Your HausPet landing page is now deployed on Vercel!

**Next steps:**
1. Test all functionality
2. Share your link: `https://your-project-name.vercel.app`
3. Configure custom domain if needed
4. Monitor analytics
5. Collect early access signups!

---

## 📚 Useful Vercel Documentation

- **Vercel Docs:** https://vercel.com/docs
- **Serverless Functions:** https://vercel.com/docs/functions
- **Vercel KV:** https://vercel.com/docs/storage/vercel-kv
- **Environment Variables:** https://vercel.com/docs/projects/environment-variables
- **Custom Domains:** https://vercel.com/docs/custom-domains

---

## 📞 Support

**Vercel Support:** https://vercel.com/support  
**HausPet Issues:** https://github.com/prydatkoo/HausPet-landing/issues  
**Email:** hello@hauspet.net

---

## 🏷️ Tags

`#vercel` `#deployment` `#serverless` `#hosting` `#hauspet` `#guide`

---

**Last Updated:** October 1, 2025  
**Status:** ✅ Production Ready

