# Factorial Calculator - QA Automation Framework

A comprehensive test automation framework for the Factorial Calculator application built with **Playwright**, **TypeScript**, and **Page Object Model (POM)** pattern.

## 🎯 Project Overview

This project provides automated testing for the Factorial Calculator web application hosted at [http://qainterview.pythonanywhere.com](http://qainterview.pythonanywhere.com).

**Test Coverage:**
- ✅ Basic functionality tests
- ✅ Edge case tests
- ✅ Negative tests (invalid inputs)
- ✅ Navigation tests
- ✅ Security tests (SQL injection, XSS)
- ✅ Form validation styling tests
- ✅ API interception tests

**Test Results:** 31/34 tests passing (91.2%)
**Bugs Found:** 8 critical and high-priority bugs documented

---

## 📋 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Running Tests](#running-tests)
- [Test Reports](#test-reports)
- [Documentation](#documentation)
- [Best Practices](#best-practices)
- [CI/CD Integration](#cicd-integration)

---

## ✨ Features

### Framework Capabilities
- 🎭 **Playwright** - Modern browser automation
- 📝 **TypeScript** - Type-safe test development
- 🏗️ **Page Object Model** - Clean separation of concerns
- 💉 **Fixture Pattern** - Dependency injection for page objects
- 📊 **Multiple Reporters** - HTML, JSON, and List reporters
- 📸 **Screenshots** - Automatic capture on test failure
- 🎥 **Video Recording** - Test execution videos on failure
- 🔍 **Trace Viewer** - Detailed test execution traces
- 🏷️ **Test Tags** - Organized test execution (@smoke, @regression, @negative, etc.)

### Test Coverage
- **34 Total Test Cases**
- **8 Smoke Tests** - Critical functionality
- **2 Regression Tests** - Feature stability
- **7 Edge Case Tests** - Boundary conditions
- **11 Negative Tests** - Error handling
- **5 Navigation Tests** - Link verification
- **3 Special Tests** - Custom requirements

---

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (comes with Node.js)
- **Git** (optional, for cloning)

Check your installations:
```bash
node --version  # Should be v18.0.0+
npm --version   # Should be 8.0.0+
```

---

## 📥 Installation

### 1. Clone or Download the Repository

```bash
# If using Git
git clone <repository-url>
cd factorial-qa-automation

# Or download and extract the ZIP file
```

### 2. Install Dependencies

```bash
npm install
```

This will install:
- Playwright Test Framework
- TypeScript
- Type definitions
- All required dependencies

### 3. Install Playwright Browsers

```bash
# Install all browsers (Chromium, Firefox, Safari)
npx playwright install

# Or install specific browser only
npx playwright install chromium
```

---

## 📁 Project Structure

```
factorial-qa-automation/
├── Pages/                          # Page Object Model classes
│   ├── basePage.ts                # Base page with common methods
│   └── factorialPage.ts           # Factorial calculator page object
├── lib/                           # Library and utilities
│   ├── config/
│   │   └── config.ts             # Configuration management
│   ├── helpers/
│   │   └── baseTest.ts           # Test fixtures
│   └── utils/
│       └── factorialCalculator.ts # Test data and utilities
├── tests/                         # Test suites
│   └── ui/
│       ├── factorial-basic.spec.ts      # Basic functionality tests
│       ├── factorial-edge-cases.spec.ts # Edge case tests
│       ├── factorial-negative.spec.ts   # Negative/error tests
│       ├── factorial-navigation.spec.ts # Navigation tests
│       └── factorial-special.spec.ts    # Special requirement tests
├── docs/                          # Documentation
│   ├── BUG-REPORT.md             # Detailed bug documentation
│   └── TEST-CASES.md             # Test case documentation
├── test-results/                  # Test execution results
├── playwright-report/             # HTML test report
├── playwright.config.ts           # Playwright configuration
├── tsconfig.json                  # TypeScript configuration
├── package.json                   # Project dependencies
└── README.md                      # This file
```

---

## 🚀 Running Tests

### Run All Tests

```bash
npm test
```

### Run Specific Test Suites

```bash
# Run only UI tests
npm run test:ui

# Run only basic functionality tests
npx playwright test factorial-basic

# Run only negative tests
npx playwright test factorial-negative

# Run only special tests
npx playwright test factorial-special
```

### Run Tests by Tag

```bash
# Run smoke tests
npx playwright test --grep @smoke

# Run special tests (3 required tests)
npm run test:special

# Run security tests
npx playwright test --grep @security

# Run regression tests
npx playwright test --grep @regression
```

### Run Tests in Specific Browser

```bash
# Run in Chromium
npm run test:chromium

# Run in Firefox
npm run test:firefox

# Run in Safari
npm run test:safari
```

### Run Tests in Headed Mode (See Browser)

```bash
npm run test:headed

# Or with Playwright command
npx playwright test --headed
```

### Debug Tests

```bash
npm run test:debug

# Or with Playwright command
npx playwright test --debug
```

---

## 📊 Test Reports

### View HTML Report

After running tests, view the interactive HTML report:

```bash
npm run test:report

# Or
npx playwright show-report
```

The HTML report includes:
- ✅ Test pass/fail status
- 📸 Screenshots of failures
- 🎥 Video recordings
- 📝 Error details and stack traces
- ⏱️ Execution times

### Report Locations

- **HTML Report:** `playwright-report/index.html`
- **JSON Report:** `test-results/test-results.json`
- **Screenshots:** `test-results/*/test-failed-*.png`
- **Videos:** `test-results/*/video.webm`

---

## 📚 Documentation

### Bug Report

Comprehensive bug documentation is available in:
- **File:** `docs/BUG-REPORT.md`
- **Bugs Found:** 8
- **Severity Breakdown:**
  - High Priority: 3 bugs
  - Medium Priority: 4 bugs
  - Low Priority: 1 bug

**Key Bugs:**
1. ❌ Page title typo: "Factoriall"
2. ❌ Navigation links swapped (Terms ↔ Privacy)
3. ❌ Negative numbers show no error message
4. ❌ Very long numbers cause silent failure
5. ❌ Copyright year JavaScript not executing
6. ❌ External link navigation timeout
7. ❌ Large number overflow issues
8. ❌ Missing input validation documentation

### Test Cases

Detailed test case documentation is available in:
- **File:** `docs/TEST-CASES.md`
- **Total Test Cases:** 34
- **Pass Rate:** 91.2% (31 passed, 3 failed)
- **Includes:**
  - Test steps
  - Expected vs actual results
  - Screenshots and evidence
  - Pass/fail status

---

## 🏆 Best Practices Implemented

### 1. Page Object Model (POM)
- Clean separation between test logic and page interactions
- Reusable page methods
- Centralized locator management

```typescript
// Example: Using the Page Object
await factorialPage.gotoFactorialPage();
await factorialPage.calculateFactorial(12);
await factorialPage.validateFactorialResult(12, 479001600);
```

### 2. Fixture Pattern
- Automatic page object instantiation
- Dependency injection
- Clean test setup/teardown

```typescript
// Tests automatically receive page objects
test('my test', async ({ factorialPage }) => {
  // Page object ready to use
  await factorialPage.gotoFactorialPage();
});
```

### 3. Test Data Management
- Centralized test data
- Reusable constants
- Clear data organization

```typescript
import { factorialTestData, invalidInputData } from './utils/factorialCalculator';
```

### 4. Descriptive Test Names
- Clear test intentions
- Tag-based organization
- Easy filtering

```typescript
test('should calculate factorial of 12 with expected answer 479001600',
  { tag: '@special' },
  async ({ factorialPage }) => {
    // Test implementation
  }
);
```

### 5. Comprehensive Assertions
- Clear expected vs actual results
- Multiple validation points
- Detailed error messages

---

## 🎯 Special Tests (Task Requirements)

Three specific tests were required by the QA task:

### 1. Form Validation Styling Test ✅
**Location:** `tests/ui/factorial-special.spec.ts` (Line 21)
- Verifies red border on invalid input
- Confirms error message color
- Result: **PASSED**

### 2. Factorial of 12 Test ✅
**Location:** `tests/ui/factorial-special.spec.ts` (Line 57)
- Input: 12
- Expected: 479001600
- Result: **PASSED**

### 3. API Call Interception Test ✅
**Location:** `tests/ui/factorial-special.spec.ts` (Line 87)
- Captures POST request to /factorial
- Verifies headers and parameters
- Validates response format
- Result: **PASSED**

Run all special tests:
```bash
npm run test:special
```

---

## 🔄 CI/CD Integration

### GitHub Actions

Create `.github/workflows/tests.yml`:

```yaml
name: Playwright Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - name: Install dependencies
        run: npm ci
      - name: Install Playwright Browsers
        run: npx playwright install --with-deps
      - name: Run tests
        run: npm test
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
```

---

## 🐛 Known Issues

Based on test execution, the following bugs were found:

1. **Negative numbers** do not display error messages
2. **Very long numbers** cause silent failures
3. **External navigation link** causes timeout
4. **Terms and Privacy links** are swapped

See `docs/BUG-REPORT.md` for complete details.

---

## 📝 Test Results Summary

```
Test Suites: 5 files
Total Tests: 34
✅ Passed: 31 (91.2%)
❌ Failed: 3 (8.8%)

Execution Time: ~1.3 minutes
Browser: Chromium (Headless)
```

### Test Distribution
- Basic Functionality: 8/8 ✅
- Edge Cases: 7/7 ✅
- Negative Tests: 9/11 ⚠️ (2 failures)
- Navigation: 4/5 ⚠️ (1 failure)
- Special Tests: 3/3 ✅

---

## 🤝 Contributing

### Adding New Tests

1. Create test file in `tests/ui/` folder
2. Import base test and page objects
3. Follow naming convention: `factorial-<category>.spec.ts`
4. Use appropriate tags (@smoke, @regression, etc.)
5. Document test cases in `docs/TEST-CASES.md`

### Adding New Page Objects

1. Create class extending `BasePage`
2. Define locators in constructor
3. Create reusable methods
4. Add to fixtures in `lib/helpers/baseTest.ts`

---

## 📞 Support

For questions or issues:
- Check `docs/` folder for detailed documentation
- Review test-results for execution details
- Check HTML report for visual test results

---

## 📄 License

ISC License

---

## 🙏 Acknowledgments

- **Playwright** - Modern web testing framework
- **TypeScript** - Type-safe JavaScript
- **POM Pattern** - Clean test architecture

---

**Built with ❤️ for comprehensive QA testing**
