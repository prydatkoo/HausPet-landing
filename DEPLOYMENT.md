# 🚀 HausPet Landing Page - Quick Deployment Guide

## **Step 1: Set Up Email Service (Resend.com)**

1. Go to [resend.com](https://resend.com) and sign up for free
2. Get your API key from the dashboard
3. Add your domain or use the provided test domain

## **Step 2: Deploy to Vercel**

### **Option A: Deploy via Vercel CLI (Recommended)**

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### **Option B: Deploy via GitHub**

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variable: `RESEND_API_KEY=your_api_key_here`
5. Deploy

## **Step 3: Configure Environment Variables**

In your Vercel dashboard, add this environment variable:
- `RESEND_API_KEY` = Your Resend API key

## **Step 4: Test the Form**

1. Visit your deployed site
2. Fill out the early access form
3. Submit and check for confirmation email

## **What's Included:**

✅ **Functional sign-up form** with validation  
✅ **Automatic confirmation emails** via Resend  
✅ **Serverless backend** (no server management)  
✅ **Mobile-responsive design**  
✅ **3D product visualization**  
✅ **Multi-language support** (EN/DE)  

## **Cost:**
- **Vercel**: Free tier (unlimited deployments)
- **Resend**: Free tier (3,000 emails/month)
- **Total**: $0/month

## **Next Steps:**
- Add database (MongoDB Atlas, Supabase, etc.)
- Set up analytics (Google Analytics, Vercel Analytics)
- Add payment processing (Stripe) for pre-orders

Your app will be live in under 5 minutes! 🎉 