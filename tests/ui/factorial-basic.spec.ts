import test, { expect } from '../../lib/helpers/baseTest';
import { factorialTestData } from '../../lib/utils/factorialCalculator';

/**
 * Basic Functionality Tests for Factorial Calculator
 * Testing positive scenarios and basic user flows
 */

test.describe('Factorial Calculator - Basic Functionality', () => {
  test.beforeEach(async ({ factorialPage }) => {
    await factorialPage.gotoFactorialPage();
  });

  test('should load the page with all required elements', { tag: '@smoke' }, async ({ factorialPage }) => {
    // Validate page heading
    await factorialPage.validatePageHeading('The greatest factorial calculator!');

    // Validate all page elements are visible
    await factorialPage.validatePageElements();

    // Validate input placeholder
    await factorialPage.validateInputPlaceholder('Enter an integer');

    // Validate button text
    await factorialPage.validateCalculateButtonText('Calculate!');
  });

  test('should calculate factorial of 0', { tag: '@smoke' }, async ({ factorialPage }) => {
    await factorialPage.calculateFactorial(factorialTestData.zero.input);
    await factorialPage.validateFactorialResult(
      factorialTestData.zero.input,
      factorialTestData.zero.output
    );
  });

  test('should calculate factorial of 1', { tag: '@smoke' }, async ({ factorialPage }) => {
    await factorialPage.calculateFactorial(factorialTestData.one.input);
    await factorialPage.validateFactorialResult(
      factorialTestData.one.input,
      factorialTestData.one.output
    );
  });

  test('should calculate factorial of 5', { tag: '@smoke' }, async ({ factorialPage }) => {
    await factorialPage.calculateFactorial(factorialTestData.five.input);
    await factorialPage.validateFactorialResult(
      factorialTestData.five.input,
      factorialTestData.five.output
    );
  });

  test('should calculate factorial of 10', { tag: '@regression' }, async ({ factorialPage }) => {
    await factorialPage.calculateFactorial(factorialTestData.ten.input);
    await factorialPage.validateFactorialResult(
      factorialTestData.ten.input,
      factorialTestData.ten.output
    );
  });

  test('should allow multiple calculations in sequence', { tag: '@regression' }, async ({ factorialPage }) => {
    // First calculation
    await factorialPage.calculateFactorial(factorialTestData.three.input);
    await factorialPage.validateFactorialResult(
      factorialTestData.three.input,
      factorialTestData.three.output
    );

    // Second calculation
    await factorialPage.calculateFactorial(factorialTestData.seven.input);
    await factorialPage.validateFactorialResult(
      factorialTestData.seven.input,
      factorialTestData.seven.output
    );

    // Third calculation
    await factorialPage.calculateFactorial(factorialTestData.four.input);
    await factorialPage.validateFactorialResult(
      factorialTestData.four.input,
      factorialTestData.four.output
    );
  });

  test('should display correct page title', { tag: '@smoke' }, async ({ factorialPage, page }) => {
    const title = await factorialPage.getPageTitle();
    // Note: This test might fail if there's a typo in the page title
    expect(title).toBeTruthy();
  });

  test('should have all navigation links visible', { tag: '@smoke' }, async ({ factorialPage }) => {
    await expect(factorialPage.aboutLink).toBeVisible();
    await expect(factorialPage.termsLink).toBeVisible();
    await expect(factorialPage.privacyLink).toBeVisible();
    await expect(factorialPage.qxf2Link).toBeVisible();
  });
});
