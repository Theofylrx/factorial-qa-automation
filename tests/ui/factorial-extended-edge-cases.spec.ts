import test, { expect } from '../../lib/helpers/baseTest';

/**
 * Extended Edge Cases Tests for Factorial Calculator
 * Additional boundary testing and unusual input scenarios
 */

test.describe('Factorial Calculator - Extended Edge Cases', () => {
  test.beforeEach(async ({ factorialPage }) => {
    await factorialPage.gotoFactorialPage();
  });

  test('should handle zero with leading zeros (0000)', { tag: '@edge-case' }, async ({ factorialPage }) => {
    await factorialPage.calculateFactorial('0000');
    const result = await factorialPage.getResultText();
    expect(result).toBeTruthy();
  });

  test('should handle number with trailing spaces', { tag: '@edge-case' }, async ({ factorialPage }) => {
    await factorialPage.enterNumber('5   ');
    await factorialPage.clickCalculate();
    await factorialPage.wait(1000);
    const result = await factorialPage.getResultText();
    expect(result).toBeTruthy();
  });

  test('should handle number with leading spaces', { tag: '@edge-case' }, async ({ factorialPage }) => {
    await factorialPage.enterNumber('   5');
    await factorialPage.clickCalculate();
    await factorialPage.wait(1000);
    const result = await factorialPage.getResultText();
    expect(result).toBeTruthy();
  });

  test('should handle unicode numbers', { tag: '@edge-case' }, async ({ factorialPage }) => {
    await factorialPage.enterNumber('٥'); // Arabic numeral 5
    await factorialPage.clickCalculate();
    await factorialPage.wait(1000);
    const result = await factorialPage.getResultText();
    expect(result).toBeTruthy();
  });

  test('should handle scientific notation (1e2)', { tag: '@edge-case' }, async ({ factorialPage }) => {
    await factorialPage.enterNumber('1e2'); // 100 in scientific notation
    await factorialPage.clickCalculate();
    await factorialPage.wait(1000);
    const result = await factorialPage.getResultText();
    expect(result).toBeTruthy();
  });

  test('should handle hexadecimal input (0x10)', { tag: '@edge-case' }, async ({ factorialPage }) => {
    await factorialPage.enterNumber('0x10');
    await factorialPage.clickCalculate();
    await factorialPage.wait(1000);
    const result = await factorialPage.getResultText();
    expect(result).toBeTruthy();
  });

  test('should handle binary input (0b101)', { tag: '@edge-case' }, async ({ factorialPage }) => {
    await factorialPage.enterNumber('0b101');
    await factorialPage.clickCalculate();
    await factorialPage.wait(1000);
    const result = await factorialPage.getResultText();
    expect(result).toBeTruthy();
  });

  test('should handle octal input (0o7)', { tag: '@edge-case' }, async ({ factorialPage }) => {
    await factorialPage.enterNumber('0o7');
    await factorialPage.clickCalculate();
    await factorialPage.wait(1000);
    const result = await factorialPage.getResultText();
    expect(result).toBeTruthy();
  });

  test('should handle infinity input', { tag: '@edge-case' }, async ({ factorialPage }) => {
    await factorialPage.enterNumber('Infinity');
    await factorialPage.clickCalculate();
    await factorialPage.wait(1000);
    const result = await factorialPage.getResultText();
    expect(result).toBeTruthy();
  });

  test('should handle NaN input', { tag: '@edge-case' }, async ({ factorialPage }) => {
    await factorialPage.enterNumber('NaN');
    await factorialPage.clickCalculate();
    await factorialPage.wait(1000);
    const result = await factorialPage.getResultText();
    expect(result).toBeTruthy();
  });

  test('should handle null input', { tag: '@edge-case' }, async ({ factorialPage }) => {
    await factorialPage.enterNumber('null');
    await factorialPage.clickCalculate();
    await factorialPage.wait(1000);
    const result = await factorialPage.getResultText();
    expect(result).toBeTruthy();
  });

  test('should handle undefined input', { tag: '@edge-case' }, async ({ factorialPage }) => {
    await factorialPage.enterNumber('undefined');
    await factorialPage.clickCalculate();
    await factorialPage.wait(1000);
    const result = await factorialPage.getResultText();
    expect(result).toBeTruthy();
  });

  test('should handle comma as decimal separator (3,14)', { tag: '@edge-case' }, async ({ factorialPage }) => {
    await factorialPage.enterNumber('3,14');
    await factorialPage.clickCalculate();
    await factorialPage.wait(1000);
    const result = await factorialPage.getResultText();
    expect(result).toBeTruthy();
  });

  test('should handle thousands separator (1,000)', { tag: '@edge-case' }, async ({ factorialPage }) => {
    await factorialPage.enterNumber('1,000');
    await factorialPage.clickCalculate();
    await factorialPage.wait(1000);
    const result = await factorialPage.getResultText();
    expect(result).toBeTruthy();
  });

  test('should handle percentage input (50%)', { tag: '@edge-case' }, async ({ factorialPage }) => {
    await factorialPage.enterNumber('50%');
    await factorialPage.clickCalculate();
    await factorialPage.wait(1000);
    const result = await factorialPage.getResultText();
    expect(result).toBeTruthy();
  });

  test('should handle fraction input (1/2)', { tag: '@edge-case' }, async ({ factorialPage }) => {
    await factorialPage.enterNumber('1/2');
    await factorialPage.clickCalculate();
    await factorialPage.wait(1000);
    const result = await factorialPage.getResultText();
    expect(result).toBeTruthy();
  });

  test('should handle mathematical expression (2+3)', { tag: '@edge-case' }, async ({ factorialPage }) => {
    await factorialPage.enterNumber('2+3');
    await factorialPage.clickCalculate();
    await factorialPage.wait(1000);
    const result = await factorialPage.getResultText();
    expect(result).toBeTruthy();
  });

  test('should handle parentheses in input (5)', { tag: '@edge-case' }, async ({ factorialPage }) => {
    await factorialPage.enterNumber('(5)');
    await factorialPage.clickCalculate();
    await factorialPage.wait(1000);
    const result = await factorialPage.getResultText();
    expect(result).toBeTruthy();
  });

  test('should handle repeated clicks on calculate button', { tag: '@edge-case' }, async ({ factorialPage }) => {
    await factorialPage.enterNumber(5);

    // Click multiple times rapidly
    await factorialPage.clickCalculate();
    await factorialPage.clickCalculate();
    await factorialPage.clickCalculate();

    await factorialPage.wait(1500);

    const result = await factorialPage.getResultText();
    expect(result).toContain('120');
  });

  test('should handle clearing and re-entering value', { tag: '@edge-case' }, async ({ factorialPage }) => {
    // Enter and calculate first value
    await factorialPage.calculateFactorial(5);
    let result = await factorialPage.getResultText();
    expect(result).toContain('120');

    // Clear and enter new value
    await factorialPage.enterNumber('');
    await factorialPage.enterNumber(3);
    await factorialPage.clickCalculate();
    await factorialPage.wait(1000);

    result = await factorialPage.getResultText();
    expect(result).toContain('6');
  });

  test('should handle backspace/delete operations', { tag: '@edge-case' }, async ({ factorialPage, page }) => {
    await factorialPage.enterNumber('123');

    // Backspace to remove last digit
    await page.keyboard.press('Backspace');
    await factorialPage.clickCalculate();
    await factorialPage.wait(1000);

    // Should calculate factorial of 12
    const result = await factorialPage.getResultText();
    expect(result).toBeTruthy();
  });

  test('should handle copy-paste values', { tag: '@edge-case' }, async ({ factorialPage, page }) => {
    // Type a value
    await factorialPage.numberInput.fill('10');

    // Select all and copy
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Control+C');

    // Clear and paste
    await factorialPage.numberInput.clear();
    await page.keyboard.press('Control+V');

    await factorialPage.clickCalculate();
    await factorialPage.wait(1000);

    const result = await factorialPage.getResultText();
    expect(result).toContain('3628800');
  });

  test('should handle maximum safe integer', { tag: '@edge-case' }, async ({ factorialPage }) => {
    const maxSafeInteger = 9007199254740991;
    await factorialPage.enterNumber(maxSafeInteger.toString());
    await factorialPage.clickCalculate();
    await factorialPage.wait(1000);

    const result = await factorialPage.getResultText();
    expect(result).toBeTruthy();
  });

  test('should handle numbers beyond maximum safe integer', { tag: '@edge-case' }, async ({ factorialPage }) => {
    const beyondMax = '9007199254740992';
    await factorialPage.enterNumber(beyondMax);
    await factorialPage.clickCalculate();
    await factorialPage.wait(1000);

    const result = await factorialPage.getResultText();
    expect(result).toBeTruthy();
  });
});
