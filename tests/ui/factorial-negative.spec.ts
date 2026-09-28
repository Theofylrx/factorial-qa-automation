import test, { expect } from '../../lib/helpers/baseTest';
import { invalidInputData } from '../../lib/utils/factorialCalculator';

/**
 * Negative Tests for Factorial Calculator
 * Testing invalid inputs and error handling
 */

test.describe('Factorial Calculator - Negative Tests', () => {
  test.beforeEach(async ({ factorialPage }) => {
    await factorialPage.gotoFactorialPage();
  });

  test('should handle negative numbers (-5)', { tag: '@negative' }, async ({ factorialPage }) => {
    await factorialPage.enterNumber(invalidInputData.negative);
    await factorialPage.clickCalculate();
    await factorialPage.wait(1000);

    // Should show error message
    const result = await factorialPage.getResultText();
    expect(result).toBeTruthy();
    // Factorial is not defined for negative numbers
  });

  test('should handle decimal numbers (3.14)', { tag: '@negative' }, async ({ factorialPage }) => {
    await factorialPage.enterNumber(invalidInputData.decimal);
    await factorialPage.clickCalculate();
    await factorialPage.wait(1000);

    // Should show error message: "Please enter an integer"
    await factorialPage.validateErrorMessage('Please enter an integer');
  });

  test('should handle negative decimal numbers (-2.5)', { tag: '@negative' }, async ({ factorialPage }) => {
    await factorialPage.enterNumber(invalidInputData.negativeDecimal);
    await factorialPage.clickCalculate();
    await factorialPage.wait(1000);

    // Should show error message
    const result = await factorialPage.getResultText();
    expect(result).toContain('Please enter an integer');
  });

  test('should handle alphabetic input (abc)', { tag: '@negative' }, async ({ factorialPage }) => {
    await factorialPage.enterNumber(invalidInputData.string);
    await factorialPage.clickCalculate();
    await factorialPage.wait(1000);

    // Should show error message
    await factorialPage.validateErrorMessage('Please enter an integer');
  });

  test('should handle special characters (!@#)', { tag: '@negative' }, async ({ factorialPage }) => {
    await factorialPage.enterNumber(invalidInputData.specialChars);
    await factorialPage.clickCalculate();
    await factorialPage.wait(1000);

    // Should show error message
    await factorialPage.validateErrorMessage('Please enter an integer');
  });

  test('should handle empty input', { tag: '@negative' }, async ({ factorialPage }) => {
    await factorialPage.enterNumber(invalidInputData.empty);
    await factorialPage.clickCalculate();
    await factorialPage.wait(1000);

    // Should show error message or handle empty input
    const result = await factorialPage.getResultText();
    expect(result).toBeTruthy();
  });

  test('should handle whitespace input', { tag: '@negative' }, async ({ factorialPage }) => {
    await factorialPage.enterNumber(invalidInputData.whitespace);
    await factorialPage.clickCalculate();
    await factorialPage.wait(1000);

    // Should show error message
    const result = await factorialPage.getResultText();
    expect(result).toBeTruthy();
  });

  test('should handle mixed alphanumeric input (12abc)', { tag: '@negative' }, async ({ factorialPage }) => {
    await factorialPage.enterNumber(invalidInputData.mixed);
    await factorialPage.clickCalculate();
    await factorialPage.wait(1000);

    // Should show error message
    await factorialPage.validateErrorMessage('Please enter an integer');
  });

  test('should handle very long number string', { tag: '@negative' }, async ({ factorialPage }) => {
    const longNumber = '123456789012345678901234567890';
    await factorialPage.enterNumber(longNumber);
    await factorialPage.clickCalculate();
    await factorialPage.wait(1000);

    const result = await factorialPage.getResultText();
    expect(result).toBeTruthy();
  });

  test('should handle SQL injection attempt', { tag: '@security' }, async ({ factorialPage }) => {
    await factorialPage.enterNumber("1' OR '1'='1");
    await factorialPage.clickCalculate();
    await factorialPage.wait(1000);

    // Should show error message, not execute any SQL
    await factorialPage.validateErrorMessage('Please enter an integer');
  });

  test('should handle XSS attempt', { tag: '@security' }, async ({ factorialPage }) => {
    await factorialPage.enterNumber('<script>alert("XSS")</script>');
    await factorialPage.clickCalculate();
    await factorialPage.wait(1000);

    // Should show error message, not execute script
    await factorialPage.validateErrorMessage('Please enter an integer');
  });
});
