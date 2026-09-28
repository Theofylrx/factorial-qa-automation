import test, { expect } from '../../lib/helpers/baseTest';

/**
 * Visual Regression Tests
 * Automated screenshot comparison to detect unintended visual changes
 * These tests create baseline screenshots and compare against them on subsequent runs
 *
 * Usage:
 * 1. First run: Creates baseline screenshots
 * 2. Subsequent runs: Compares against baseline
 * 3. Update baseline: npx playwright test --update-snapshots
 */

test.describe('Factorial Calculator - Visual Regression Tests', () => {

  test.beforeEach(async ({ factorialPage }) => {
    await factorialPage.goto();
    // Wait for page to stabilize
    await factorialPage.wait(500);
  });

  test('should match homepage baseline screenshot', { tag: ['@visual', '@smoke'] }, async ({ page, factorialPage }) => {
    // Wait for all elements to load
    await factorialPage.calculateButton.waitFor({ state: 'visible' });

    // Take screenshot and compare to baseline
    await expect(page).toHaveScreenshot('homepage.png', {
      fullPage: true,
      animations: 'disabled',
    });

    console.log('✅ Visual Regression: Homepage matches baseline');
  });

  test('should match input field focused state', { tag: '@visual' }, async ({ page, factorialPage }) => {
    // Focus on input field
    await factorialPage.numberInput.focus();
    await factorialPage.wait(200);

    // Capture focused state
    await expect(factorialPage.numberInput).toHaveScreenshot('input-focused.png');

    console.log('✅ Visual Regression: Input focused state matches baseline');
  });

  test('should match result display with calculation', { tag: '@visual' }, async ({ page, factorialPage }) => {
    // Perform calculation
    await factorialPage.calculateFactorial(5);
    await factorialPage.resultDiv.waitFor({ state: 'visible' });
    await factorialPage.wait(300);

    // Capture result area
    await expect(factorialPage.resultDiv).toHaveScreenshot('result-display.png');

    console.log('✅ Visual Regression: Result display matches baseline');
  });

  test('should match button hover state', { tag: '@visual' }, async ({ page, factorialPage }) => {
    // Hover over button
    await factorialPage.calculateButton.hover();
    await factorialPage.wait(200);

    // Capture button in hover state
    await expect(factorialPage.calculateButton).toHaveScreenshot('button-hover.png');

    console.log('✅ Visual Regression: Button hover state matches baseline');
  });

  test('should match error state styling', { tag: '@visual' }, async ({ page, factorialPage }) => {
    // Trigger error state
    await factorialPage.enterNumber('invalid123');
    await factorialPage.clickCalculate();
    await factorialPage.wait(500);

    // Capture error state
    await expect(page).toHaveScreenshot('error-state.png', {
      fullPage: true,
      animations: 'disabled',
    });

    console.log('✅ Visual Regression: Error state matches baseline');
  });

  test('should match footer section', { tag: '@visual' }, async ({ page, factorialPage }) => {
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await factorialPage.wait(300);

    // Capture footer
    const footer = page.locator('footer, .footer, p:has-text("Qxf2")');
    if (await footer.count() > 0) {
      await expect(footer.first()).toHaveScreenshot('footer-section.png');
      console.log('✅ Visual Regression: Footer section matches baseline');
    } else {
      console.log('⚠️  Footer element not found, capturing bottom of page');
      await expect(page).toHaveScreenshot('page-bottom.png', {
        fullPage: false,
      });
    }
  });

  test('should match mobile viewport layout', { tag: '@visual' }, async ({ page, factorialPage }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
    await factorialPage.wait(300);

    // Capture mobile layout
    await expect(page).toHaveScreenshot('mobile-layout.png', {
      fullPage: true,
      animations: 'disabled',
    });

    console.log('✅ Visual Regression: Mobile layout matches baseline');
  });

  test('should match tablet viewport layout', { tag: '@visual' }, async ({ page, factorialPage }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 }); // iPad
    await factorialPage.wait(300);

    // Capture tablet layout
    await expect(page).toHaveScreenshot('tablet-layout.png', {
      fullPage: true,
      animations: 'disabled',
    });

    console.log('✅ Visual Regression: Tablet layout matches baseline');
  });

  test('should match large result display', { tag: '@visual' }, async ({ page, factorialPage }) => {
    // Calculate large factorial
    await factorialPage.calculateFactorial(20);
    await factorialPage.resultDiv.waitFor({ state: 'visible' });
    await factorialPage.wait(300);

    // Capture large number display
    await expect(factorialPage.resultDiv).toHaveScreenshot('large-result-display.png');

    console.log('✅ Visual Regression: Large result display matches baseline');
  });

  test('should match page with multiple calculations', { tag: '@visual' }, async ({ page, factorialPage }) => {
    // Perform multiple calculations
    await factorialPage.calculateFactorial(3);
    await factorialPage.wait(500);

    await factorialPage.clearInput();
    await factorialPage.calculateFactorial(5);
    await factorialPage.wait(500);

    // Capture final state
    await expect(page).toHaveScreenshot('multiple-calculations.png', {
      fullPage: true,
      animations: 'disabled',
    });

    console.log('✅ Visual Regression: Multiple calculations state matches baseline');
  });

});
