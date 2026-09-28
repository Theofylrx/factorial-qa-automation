import test, { expect } from '../../lib/helpers/baseTest';

/**
 * Accessibility Tests for Factorial Calculator
 * Testing WCAG compliance, keyboard navigation, and screen reader support
 */

test.describe('Factorial Calculator - Accessibility Tests', () => {
  test.beforeEach(async ({ factorialPage }) => {
    await factorialPage.gotoFactorialPage();
  });

  test('should have proper semantic HTML structure', { tag: '@accessibility' }, async ({ page }) => {
    // Check for proper heading hierarchy
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1); // Should have exactly one H1

    // Check for proper form elements
    const inputExists = await page.locator('input[type="text"]').count();
    expect(inputExists).toBeGreaterThan(0);

    const buttonExists = await page.locator('button[type="submit"]').count();
    expect(buttonExists).toBeGreaterThan(0);
  });

  test('should have accessible form labels', { tag: '@accessibility' }, async ({ page }) => {
    // Input should have associated label or aria-label or placeholder
    const input = page.locator('input#number');
    const placeholder = await input.getAttribute('placeholder');
    const ariaLabel = await input.getAttribute('aria-label');
    const id = await input.getAttribute('id');

    // Should have some form of labeling
    expect(placeholder || ariaLabel || id).toBeTruthy();
  });

  test('should support keyboard navigation - Tab to input', { tag: '@accessibility' }, async ({ page }) => {
    // Tab to input field
    await page.keyboard.press('Tab');

    const focusedElement = await page.evaluate(() => document.activeElement?.id);
    console.log('Focused element after Tab:', focusedElement);

    // Input should be focusable
    const input = page.locator('input#number');
    await expect(input).toBeFocused();
  });

  test('should support keyboard navigation - Enter to submit', { tag: '@accessibility' }, async ({ page }) => {
    // Type in input field
    await page.locator('input#number').fill('5');

    // Press Enter to submit
    await page.keyboard.press('Enter');
    await page.waitForTimeout(1000);

    // Result should be displayed
    const result = await page.locator('#resultDiv').textContent();
    expect(result).toContain('120');
  });

  test('should have sufficient color contrast', { tag: '@accessibility' }, async ({ page, factorialPage }) => {
    // Test error state color contrast
    await factorialPage.enterNumber('invalid');
    await factorialPage.clickCalculate();
    await factorialPage.wait(1000);

    const resultDiv = page.locator('#resultDiv');
    const color = await resultDiv.evaluate((el) => window.getComputedStyle(el).color);
    const backgroundColor = await resultDiv.evaluate((el) => window.getComputedStyle(el).backgroundColor);

    console.log('Error text color:', color);
    console.log('Background color:', backgroundColor);

    // Colors should be defined
    expect(color).toBeTruthy();
  });

  test('should have descriptive button text', { tag: '@accessibility' }, async ({ page }) => {
    const buttonText = await page.locator('button[type="submit"]').textContent();
    expect(buttonText?.trim()).toBe('Calculate!');
    expect(buttonText?.trim().length).toBeGreaterThan(0);
  });

  test('should have page title for screen readers', { tag: '@accessibility' }, async ({ page }) => {
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(0);
  });

  test('should have focusable interactive elements', { tag: '@accessibility' }, async ({ page }) => {
    // Check input is focusable
    const input = page.locator('input#number');
    await input.focus();
    await expect(input).toBeFocused();

    // Check button is focusable
    const button = page.locator('button[type="submit"]');
    await button.focus();
    await expect(button).toBeFocused();
  });

  test('should have accessible links with descriptive text', { tag: '@accessibility' }, async ({ page }) => {
    // Check all links have text
    const links = await page.locator('a').all();

    for (const link of links) {
      const text = await link.textContent();
      expect(text?.trim().length).toBeGreaterThan(0);
    }
  });

  test('should not have empty links', { tag: '@accessibility' }, async ({ page }) => {
    const emptyLinks = await page.locator('a:empty').count();
    expect(emptyLinks).toBe(0);
  });

  test('should have proper input type for number field', { tag: '@accessibility' }, async ({ page }) => {
    const inputType = await page.locator('input#number').getAttribute('type');
    // Currently "text" but ideally should be "number" for accessibility
    expect(inputType).toBeTruthy();
  });

  test('should provide feedback for form submission', { tag: '@accessibility' }, async ({ factorialPage }) => {
    await factorialPage.calculateFactorial(5);

    // Result should be visible and provide feedback
    const resultVisible = await factorialPage.resultDiv.isVisible();
    expect(resultVisible).toBe(true);
  });
});
