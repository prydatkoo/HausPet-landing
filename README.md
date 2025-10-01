# HausPet Smart Collar Landing Page

[![License: UNLICENSED](https://img.shields.io/badge/License-UNLICENSED-red.svg)](LICENSE)
[![Node Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/react-18.2.0-blue.svg)](https://reactjs.org/)

The official landing page for the HausPet Smart Collar - an AI-powered pet health and location tracking device. This modern, responsive single-page application is built with React, Vite, and Tailwind CSS, featuring bilingual support (English/German) and a complete pre-order system.

## ✨ Features

### Product Features
- 🤖 **AI-Powered Health Monitoring** - Real-time tracking of your pet's vital signs and activity levels
- 📍 **GPS Location Tracking** - Precise location tracking with geofencing and location history
- ☀️ **Solar-Powered Charging** - Hybrid solar charging system for extended battery life
- 💧 **Waterproof Design** - IP67 waterproof rating for all-weather durability
- 📡 **Smart Connectivity** - Bluetooth and cellular connectivity for seamless data transmission

### Technical Features
- 🌍 **Bilingual Support** - Full English and German translations
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- ⚡ **High Performance** - Built with Vite for lightning-fast load times
- 🎨 **Modern UI/UX** - Beautiful animations with Framer Motion
- 📧 **Email Integration** - Automated email notifications via Resend
- 💾 **Database Integration** - Vercel KV for persistent storage
- 📊 **Admin Dashboard** - Complete admin panel for managing submissions
- 🧪 **Well-Tested** - Comprehensive Jest test suite

## 🚀 Getting Started

### Prerequisites

- Node.js >= 16.0.0
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/hauspet/landing-page.git
cd landing-page
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory (optional for local development):
```env
# Email Service (Resend)
RESEND_API_KEY=your_resend_api_key

# Database (Vercel KV)
KV_REST_API_URL=your_vercel_kv_url
KV_REST_API_TOKEN=your_vercel_kv_token

# Admin Access
ADMIN_ACCESS_KEY=your_secure_admin_key
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

Build the application:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

The production-ready files will be in the `dist/` directory.

### Testing

Run the test suite:

```bash
npm test
```

Run linting:

```bash
npm run lint
```

Analyze bundle size:

```bash
npm run analyze
```

## 📁 Project Structure

```
HausPet-landing/
├── api/                      # Serverless API functions
│   ├── admin/               # Admin API endpoints
│   ├── database.mjs         # Database operations
│   ├── get-submissions.mjs  # Fetch submissions
│   ├── send-bulk-email.mjs  # Bulk email sender
│   ├── submit-form.mjs      # Form submission handler
│   └── ...
├── public/                   # Static assets
│   └── assets/              # Images and media
├── src/
│   ├── components/          # React components
│   │   ├── __tests__/      # Component tests
│   │   ├── EarlyAccess.jsx
│   │   ├── Features.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   └── ...
│   ├── hooks/               # Custom React hooks
│   │   ├── useLanguage.js
│   │   └── useIntersectionObserver.js
│   ├── pages/               # Page components
│   │   ├── __tests__/      # Page tests
│   │   ├── AdminPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── PreOrderPage.jsx
│   │   └── UnderDevelopment.jsx
│   ├── App.jsx              # Main app component
│   ├── LanguageContext.jsx  # Language context provider
│   ├── translations.js      # Translation strings
│   └── main.jsx            # App entry point
├── .eslintrc.cjs           # ESLint configuration
├── .gitignore              # Git ignore rules
├── package.json            # Project dependencies
├── tailwind.config.js      # Tailwind CSS configuration
├── vercel.json             # Vercel deployment config
└── vite.config.js          # Vite configuration
```

## 🛠️ Tech Stack

### Frontend
- **React 18.2** - UI library
- **Vite 4.5** - Build tool and dev server
- **Tailwind CSS 3.3** - Utility-first CSS framework
- **Framer Motion 10.16** - Animation library
- **React Router DOM 7.7** - Routing library
- **Lucide React** - Icon library

### Backend & Services
- **Vercel** - Hosting and serverless functions
- **Vercel KV** - Redis-based key-value database
- **Resend** - Transactional email service

### Development & Testing
- **Jest** - Testing framework
- **Testing Library** - React testing utilities
- **ESLint** - Code linting
- **Babel** - JavaScript compiler

## 🌐 Deployment

This project is configured for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `RESEND_API_KEY` | API key for Resend email service | Optional |
| `KV_REST_API_URL` | Vercel KV database URL | Optional |
| `KV_REST_API_TOKEN` | Vercel KV database token | Optional |
| `ADMIN_ACCESS_KEY` | Secure key for admin panel access | Recommended |

## 🔒 Security

- Admin panel is password-protected
- Environment variables for sensitive data
- CORS protection on API endpoints
- Input validation on all forms
- XSS protection

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure your code:
- Passes all tests (`npm test`)
- Passes linting (`npm run lint`)
- Follows the existing code style
- Includes tests for new features

## 📄 License

This project is UNLICENSED - Private and proprietary software.

## 📧 Contact

- **Website:** [https://hauspet.com](https://hauspet.com)
- **Email:** hello@hauspet.net
- **Phone:** +49 (0) 160 121 8642

## 🙏 Acknowledgments

- Icons by [Lucide Icons](https://lucide.dev/)
- Animations by [Framer Motion](https://www.framer.com/motion/)
- Email service by [Resend](https://resend.com/)

---

Made with ❤️ by the HausPet Development Team
