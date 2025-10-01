# Security Policy

## 🔒 Reporting a Vulnerability

The HausPet team takes security seriously. We appreciate your efforts to responsibly disclose your findings.

### How to Report a Security Vulnerability

**Please DO NOT report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to:
- **Email:** hello@hauspet.net
- **Subject:** [SECURITY] Brief description of the issue

Please include:
- Description of the vulnerability
- Steps to reproduce the issue
- Potential impact
- Any suggested fixes (if available)

### What to Expect

- We will acknowledge receipt of your vulnerability report within 48 hours
- We will provide a more detailed response within 7 days
- We will work with you to understand and address the issue
- We will keep you informed of our progress
- Once the vulnerability is fixed, we may publicly acknowledge your responsible disclosure (if you wish)

## 🛡️ Security Best Practices

### For Users

1. **Environment Variables**: Never commit `.env` files to the repository
2. **API Keys**: Keep all API keys secure and rotate them regularly
3. **Admin Access**: Use strong passwords for admin panel access
4. **Updates**: Keep dependencies up to date

### For Contributors

1. **Code Review**: All code changes are reviewed before merging
2. **Dependencies**: Run `npm audit` regularly to check for vulnerabilities
3. **Authentication**: Never hardcode credentials or API keys
4. **Input Validation**: Always validate and sanitize user inputs
5. **HTTPS Only**: Ensure all production deployments use HTTPS

## 🔐 Supported Versions

We release security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## 🚨 Known Security Considerations

### Environment Variables
This application requires the following environment variables:
- `RESEND_API_KEY` - For email functionality
- `KV_REST_API_URL` and `KV_REST_API_TOKEN` - For database access
- `ADMIN_ACCESS_KEY` - For admin panel authentication

**These must NEVER be committed to the repository.**

### Admin Panel
The admin panel (`/admin`) is password-protected. Ensure you use a strong password in production.

### Data Storage
- User submissions are stored in Vercel KV (cloud database)
- No sensitive payment information is stored
- Email addresses are stored for contact purposes only

## 📋 Security Checklist

Before deploying to production:

- [ ] All environment variables are set in Vercel dashboard
- [ ] `.env` is in `.gitignore` (✅ already configured)
- [ ] Strong admin password is set
- [ ] HTTPS is enabled (automatic with Vercel)
- [ ] Dependencies are up to date (`npm audit`)
- [ ] No hardcoded secrets in code
- [ ] Input validation is in place
- [ ] CORS is properly configured

## 🔄 Security Updates

We regularly:
- Monitor dependencies for vulnerabilities
- Update packages with security patches
- Review and improve security practices
- Conduct code reviews

## 📞 Contact

For security concerns:
- **Email:** hello@hauspet.net
- **Response Time:** Within 48 hours

For general inquiries, please use GitHub Issues.

---

**Last Updated:** October 1, 2025

