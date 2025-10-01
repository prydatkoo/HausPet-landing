# Contributing to HausPet Landing Page

Thank you for your interest in contributing to the HausPet Landing Page! This document provides guidelines and instructions for contributing to this project.

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/HausPet-landing.git
   cd HausPet-landing
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create a branch** for your feature or fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 💻 Development Workflow

### Running the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Code Quality Checks

Before submitting your changes, ensure your code passes all quality checks:

```bash
# Run linter
npm run lint

# Run tests
npm test

# Build for production (to catch build errors)
npm run build
```

### Coding Standards

- **ESLint**: All code must pass ESLint checks with zero warnings
- **React Best Practices**: Follow React hooks rules and component patterns
- **TypeScript/JSDoc**: Add comments for complex functions
- **Naming Conventions**: 
  - Components: PascalCase (e.g., `MyComponent.jsx`)
  - Files: camelCase or PascalCase
  - Variables/Functions: camelCase
  - Constants: UPPER_SNAKE_CASE

### Component Structure

```jsx
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

/**
 * Component description
 */
const MyComponent = ({ prop1, prop2 }) => {
  // Hooks
  const [state, setState] = useState(null)
  
  // Effects
  useEffect(() => {
    // Effect logic
  }, [])
  
  // Event handlers
  const handleClick = () => {
    // Handler logic
  }
  
  // Render
  return (
    <div>
      {/* Component JSX */}
    </div>
  )
}

export default MyComponent
```

## 🧪 Testing

### Writing Tests

- Place tests in `__tests__` directories next to the components/pages they test
- Use React Testing Library for component tests
- Aim for meaningful test coverage of critical paths

Example test:
```javascript
import { render, screen } from '@testing-library/react'
import MyComponent from '../MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })
})
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## 🌍 Internationalization (i18n)

When adding new text content:

1. Add translations to `src/translations.js` for both `EN` and `DE`:
```javascript
export const translations = {
  EN: {
    newKey: 'New English Text'
  },
  DE: {
    newKey: 'Neuer deutscher Text'
  }
}
```

2. Use the translation hook in components:
```javascript
const { t } = useLanguage()
return <p>{t('newKey')}</p>
```

## 🎨 Styling Guidelines

- Use **Tailwind CSS** utility classes
- Follow the existing color scheme (defined in `tailwind.config.js`)
- Ensure responsive design (mobile-first approach)
- Use Framer Motion for animations

## 📝 Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Examples:
```
feat: add email validation to pre-order form
fix: resolve mobile menu navigation issue
docs: update README with deployment instructions
```

## 🔄 Pull Request Process

1. **Update your branch** with the latest changes from main:
   ```bash
   git fetch origin
   git rebase origin/main
   ```

2. **Ensure all checks pass**:
   - Linting: `npm run lint`
   - Tests: `npm test`
   - Build: `npm run build`

3. **Push your changes**:
   ```bash
   git push origin feature/your-feature-name
   ```

4. **Create a Pull Request** on GitHub with:
   - Clear title describing the change
   - Description of what was changed and why
   - Screenshots (for UI changes)
   - Reference to any related issues

5. **Address review feedback** if requested

6. **Squash commits** if needed before merging

## 🐛 Bug Reports

When reporting bugs, please include:

- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Screenshots/recordings if applicable
- Browser/device information
- Console errors (if any)

Use the GitHub issue template when available.

## 💡 Feature Requests

For feature requests, please:

- Check if a similar feature is already requested
- Provide a clear use case
- Explain how it benefits users
- Include mockups/examples if possible

## 🔒 Security

If you discover a security vulnerability:

1. **DO NOT** open a public issue
2. Email security concerns to: hello@hauspet.net
3. Provide details of the vulnerability
4. Allow time for the issue to be addressed before public disclosure

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project (UNLICENSED - Private and proprietary software).

## 🤝 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive experience for everyone.

### Our Standards

- Be respectful and inclusive
- Welcome diverse perspectives
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards others

### Unacceptable Behavior

- Harassment or discriminatory language
- Personal attacks or trolling
- Publishing others' private information
- Other unprofessional conduct

## 📞 Questions?

If you have questions about contributing:

- Open a GitHub Discussion
- Email: hello@hauspet.net
- Check existing issues and PRs

---

Thank you for contributing to HausPet! 🐾

