# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2024-05-24

### Added

-   **Testing:**
    -   Added Jest and React Testing Library for component testing.
    -   Added "renders without crashing" tests for all components and pages.
    -   Added a custom `renderWithProviders` function to wrap components with necessary context providers.
-   **Code Splitting and Lazy Loading:**
    -   Implemented code splitting at the page level using `React.lazy`.
    -   Implemented lazy loading for individual sections on the `HomePage` using a custom `useIntersectionObserver` hook.
-   **Build Analysis:**
    -   Added `rollup-plugin-visualizer` to analyze the production bundle.
-   **Documentation:**
    -   Added this `CHANGELOG.md` file.

### Changed

-   **Performance:**
    -   Reduced the main bundle size by over 15% through code splitting and icon optimization.
    -   Optimized `lucide-react` imports to only include the icons that are being used.
-   **Code Quality:**
    -   Fixed all linting errors, including unused variables, duplicate keys, and incorrect module syntax.
    -   Refactored the `LanguageContext` to separate the hook from the provider.
-   **Project Structure:**
    -   Created a `hooks` directory for custom hooks.
    -   Created a `__tests__` directory for all test files.

### Fixed

-   **Build:**
    -   Fixed a bug where `source-map-explorer` would fail to analyze the bundle.
-   **Linting:**
    -   Fixed a bug where the `lint` script would fail due to missing TypeScript dependencies.
-   **Testing:**
    -   Fixed a bug where tests would fail due to `TextEncoder` and `IntersectionObserver` not being defined in JSDOM.
