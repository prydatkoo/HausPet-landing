# GitHub Setup Guide

This guide will help you initialize this project as a Git repository and push it to GitHub.

## ✅ Pre-Push Checklist

All of these have been completed for you:

- ✅ Code cleaned and all console.log statements removed from production code
- ✅ All linter errors fixed (0 errors, 0 warnings)
- ✅ All tests passing
- ✅ Production build successful
- ✅ README.md updated with comprehensive documentation
- ✅ .gitignore properly configured
- ✅ CONTRIBUTING.md created with contribution guidelines
- ✅ LICENSE file created
- ✅ Dependencies are up to date
- ✅ No sensitive data in code (use environment variables)

## 🚀 Step 1: Initialize Git Repository

```bash
cd /Users/maryanprydatko/HausPet-landing
git init
```

## 📝 Step 2: Create Initial Commit

```bash
# Add all files
git add .

# Create initial commit
git commit -m "feat: initial commit - HausPet landing page with bilingual support and admin dashboard"
```

## 🌐 Step 3: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right and select "New repository"
3. Fill in the details:
   - **Repository name**: `HausPet-landing` (or your preferred name)
   - **Description**: "Official landing page for HausPet Smart Collar - AI-powered pet health and location tracking"
   - **Visibility**: Private (recommended) or Public
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
4. Click "Create repository"

## 🔗 Step 4: Connect Local Repository to GitHub

GitHub will show you commands. Use these:

```bash
# Add the remote repository
git remote add origin https://github.com/YOUR_USERNAME/HausPet-landing.git

# Verify the remote was added
git remote -v

# Push to GitHub
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## 🔐 Step 5: Set Up Environment Variables (for Vercel)

When deploying to Vercel, add these environment variables in the Vercel dashboard:

```
RESEND_API_KEY=your_resend_api_key
KV_REST_API_URL=your_vercel_kv_url
KV_REST_API_TOKEN=your_vercel_kv_token
ADMIN_ACCESS_KEY=your_secure_admin_password
```

**Never commit these values to Git!**

## 📋 Step 6: Set Up Branch Protection (Optional but Recommended)

1. Go to your repository on GitHub
2. Click **Settings** → **Branches**
3. Click **Add rule** under "Branch protection rules"
4. Configure:
   - Branch name pattern: `main`
   - ✅ Require pull request reviews before merging
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging

## 🔄 Step 7: Set Up Continuous Deployment (Vercel)

1. Go to [Vercel](https://vercel.com)
2. Click **Add New** → **Project**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add environment variables (from Step 5)
6. Click **Deploy**

Vercel will automatically deploy on every push to the main branch.

## 📦 Recommended GitHub Repository Settings

### About Section
- **Description**: Official landing page for HausPet Smart Collar
- **Website**: https://hauspet.com
- **Topics**: `react`, `vite`, `tailwindcss`, `landing-page`, `pet-care`, `smart-collar`, `ai`

### Features to Enable
- ✅ Issues
- ✅ Discussions (optional, for community)
- ✅ Projects (optional, for task management)
- ✅ Wiki (optional, for documentation)

### Branch Protection
- Protect `main` branch
- Require pull request reviews
- Require status checks

## 🔍 Verify Everything is Working

After pushing to GitHub, verify:

1. ✅ All files are present in the repository
2. ✅ README displays correctly on the repository page
3. ✅ No sensitive data is visible
4. ✅ `.gitignore` is working (no `node_modules`, `dist`, `.env` files)
5. ✅ License and contributing files are visible

## 📱 Next Steps After GitHub Setup

1. **Set up CI/CD** (if not using Vercel auto-deploy):
   - GitHub Actions for linting and testing
   - Automated deployment on push

2. **Enable GitHub Features**:
   - Issue templates
   - Pull request templates
   - Dependabot for dependency updates
   - Code scanning (security)

3. **Documentation**:
   - Add screenshots to README
   - Create a CHANGELOG.md for version tracking
   - Document API endpoints

4. **Collaboration**:
   - Invite team members
   - Set up code owners
   - Define contribution workflow

## 🆘 Common Issues and Solutions

### Issue: Push rejected due to large files
**Solution**: Check `.gitignore` includes `node_modules/` and `dist/`

### Issue: Can't push - permission denied
**Solution**: 
- Set up SSH keys or use Personal Access Token
- Check remote URL: `git remote -v`

### Issue: Merge conflicts
**Solution**:
```bash
git pull origin main --rebase
# Resolve conflicts
git add .
git rebase --continue
git push
```

### Issue: Accidentally committed secrets
**Solution**:
1. Immediately rotate the exposed secrets
2. Remove from Git history: `git filter-branch` or use `BFG Repo-Cleaner`
3. Force push (use with caution): `git push --force`

## 📞 Need Help?

- Check the [CONTRIBUTING.md](CONTRIBUTING.md) file
- Review the [README.md](README.md) for project documentation
- Contact: hello@hauspet.net

---

## 🎉 You're All Set!

Your HausPet landing page is now ready for GitHub and production deployment!

**Remember to**:
- Keep dependencies updated
- Review and merge pull requests promptly
- Monitor Vercel deployments
- Track issues and feature requests
- Maintain documentation

Happy coding! 🐾

