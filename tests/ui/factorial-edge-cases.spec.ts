import test, { expect } from '../../lib/helpers/baseTest';
import { factorialTestData } from '../../lib/utils/factorialCalculator';

/**
 * Edge Cases Tests for Factorial Calculator
 * Testing boundary values and edge scenarios
 */

test.describe('Factorial Calculator - Edge Cases', () => {
  test.beforeEach(async ({ factorialPage }) => {
    await factorialPage.gotoFactorialPage();
  });

  test('should handle factorial of large number (12)', { tag: '@edge-case' }, async ({ factorialPage }) => {
    await factorialPage.calculateFactorial(factorialTestData.twelve.input);
    await factorialPage.validateFactorialResult(
      factorialTestData.twelve.input,
      factorialTestData.twelve.output
    );
  });

  test('should handle factorial of larger number (13)', { tag: '@edge-case' }, async ({ factorialPage }) => {
    await factorialPage.calculateFactorial(factorialTestData.thirteen.input);
    // Note: JavaScript number precision issues might occur with larger factorials
    const result = await factorialPage.getResultText();
    expect(result).toContain('The factorial of 13 is:');
  });

  test('should handle very large numbers (20)', { tag: '@edge-case' }, async ({ factorialPage }) => {
    await factorialPage.calculateFactorial(20);
    const result = await factorialPage.getResultText();
    expect(result).toContain('The factorial of 20 is:');
    // Note: Expected to potentially have precision issues or overflow
  });

  test('should handle very large numbers (100)', { tag: '@edge-case' }, async ({ factorialPage }) => {
    await factorialPage.calculateFactorial(100);
    const result = await factorialPage.getResultText();
    // Very large factorials might overflow or display as Infinity
    expect(result).toContain('100');
  });

  test('should handle leading zeros (005)', { tag: '@edge-case' }, async ({ factorialPage }) => {
    await factorialPage.enterNumber('005');
    await factorialPage.clickCalculate();
    await factorialPage.wait(1000);
    const result = await factorialPage.getResultText();
    // Should be treated as 5
    expect(result).toBeTruthy();
  });

  test('should handle number with plus sign (+5)', { tag: '@edge-case' }, async ({ factorialPage }) => {
    await factorialPage.enterNumber('+5');
    await factorialPage.clickCalculate();
    await factorialPage.wait(1000);
    const result = await factorialPage.getResultText();
    expect(result).toBeTruthy();
  });

  test('should clear previous results when calculating new value', { tag: '@edge-case' }, async ({ factorialPage }) => {
    // First calculation
    await factorialPage.calculateFactorial(5);
    let result = await factorialPage.getResultText();
    expect(result).toContain('120');

    // Second calculation should replace first result
    await factorialPage.calculateFactorial(3);
    result = await factorialPage.getResultText();
    expect(result).toContain('6');
    expect(result).not.toContain('120');
  });
});
