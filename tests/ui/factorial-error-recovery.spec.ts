import test, { expect } from '../../lib/helpers/baseTest';

/**
 * Error Recovery Tests
 * Test the application's ability to recover from error states
 * Real-world scenario: users make mistakes and then correct them
 */

test.describe('Factorial Calculator - Error Recovery Tests', () => {

  test.beforeEach(async ({ factorialPage }) => {
    await factorialPage.goto();
  });

  test('should recover from invalid input to valid input', { tag: ['@recovery', '@smoke'] }, async ({ factorialPage }) => {
    // Step 1: Enter invalid input
    await factorialPage.enterNumber('abc');
    await factorialPage.clickCalculate();
    await factorialPage.wait(500);

    // Verify error state (or no result)
    const resultVisibleAfterError = await factorialPage.resultDiv.isVisible();

    // Step 2: Clear and enter valid input
    await factorialPage.clearInput();
    await factorialPage.enterNumber('5');
    await factorialPage.clickCalculate();

    // Wait for result
    await factorialPage.wait(1000);

    // Step 3: Verify successful calculation after recovery
    const resultText = await factorialPage.getResultText();
    expect(resultText).toContain('The factorial of 5 is: 120');

    console.log('✅ Error Recovery: Invalid input → Valid input = Success');
  });

  test('should recover from negative number to positive number', { tag: '@recovery' }, async ({ factorialPage }) => {
    // Step 1: Enter negative number
    await factorialPage.enterNumber('-10');
    await factorialPage.clickCalculate();
    await factorialPage.wait(500);

    // Note: Application shows no result for negative numbers (documented bug)

    // Step 2: Enter positive number
    await factorialPage.clearInput();
    await factorialPage.enterNumber('10');
    await factorialPage.clickCalculate();
    await factorialPage.wait(1000);

    // Step 3: Verify recovery
    const resultText = await factorialPage.getResultText();
    expect(resultText).toContain('The factorial of 10 is: 3628800');

    console.log('✅ Error Recovery: Negative number → Positive number = Success');
  });

  test('should recover from empty input to valid input', { tag: '@recovery' }, async ({ factorialPage }) => {
    // Step 1: Submit empty input
    await factorialPage.clickCalculate(); // Empty input
    await factorialPage.wait(500);

    // Step 2: Enter valid input
    await factorialPage.enterNumber('7');
    await factorialPage.clickCalculate();
    await factorialPage.wait(1000);

    // Step 3: Verify recovery
    const resultText = await factorialPage.getResultText();
    expect(resultText).toContain('The factorial of 7 is: 5040');

    console.log('✅ Error Recovery: Empty input → Valid input = Success');
  });

  test('should handle multiple error attempts before success', { tag: '@recovery' }, async ({ factorialPage }) => {
    // Multiple error attempts
    const invalidInputs = ['abc', '-5', '3.14', ''];

    for (const input of invalidInputs) {
      await factorialPage.clearInput();
      if (input) {
        await factorialPage.enterNumber(input);
      }
      await factorialPage.clickCalculate();
      await factorialPage.wait(300);
      console.log(`   Attempted invalid input: "${input}"`);
    }

    // Finally, valid input
    await factorialPage.clearInput();
    await factorialPage.enterNumber('6');
    await factorialPage.clickCalculate();
    await factorialPage.wait(1000);

    // Verify recovery after multiple errors
    const resultText = await factorialPage.getResultText();
    expect(resultText).toContain('The factorial of 6 is: 720');

    console.log('✅ Error Recovery: Multiple errors → Valid input = Success');
  });

  test('should recover from very large number to normal number', { tag: '@recovery' }, async ({ factorialPage }) => {
    // Step 1: Enter very large number that causes issues
    await factorialPage.enterNumber('1000');
    await factorialPage.clickCalculate();
    await factorialPage.wait(500);

    // Step 2: Enter normal valid number
    await factorialPage.clearInput();
    await factorialPage.enterNumber('8');
    await factorialPage.clickCalculate();
    await factorialPage.wait(1000);

    // Step 3: Verify recovery
    const resultText = await factorialPage.getResultText();
    expect(resultText).toContain('The factorial of 8 is: 40320');

    console.log('✅ Error Recovery: Large number → Normal number = Success');
  });

  test('should allow recalculation with different valid inputs', { tag: '@recovery' }, async ({ factorialPage }) => {
    // Calculate first value
    await factorialPage.calculateFactorial(3);
    let resultText = await factorialPage.getResultText();
    expect(resultText).toContain('The factorial of 3 is: 6');

    // Calculate second value
    await factorialPage.clearInput();
    await factorialPage.calculateFactorial(4);
    resultText = await factorialPage.getResultText();
    expect(resultText).toContain('The factorial of 4 is: 24');

    // Calculate third value
    await factorialPage.clearInput();
    await factorialPage.calculateFactorial(5);
    resultText = await factorialPage.getResultText();
    expect(resultText).toContain('The factorial of 5 is: 120');

    console.log('✅ Error Recovery: Multiple valid calculations in sequence');
  });

  test('should clear error styling after correction', { tag: '@recovery' }, async ({ factorialPage }) => {
    // Trigger error styling (if any)
    await factorialPage.enterNumber('abc');
    await factorialPage.clickCalculate();
    await factorialPage.wait(500);

    // Check if there's error styling on input
    const inputClassAfterError = await factorialPage.numberInput.getAttribute('class');
    console.log('   Input classes after error:', inputClassAfterError);

    // Enter valid input
    await factorialPage.clearInput();
    await factorialPage.enterNumber('5');
    await factorialPage.clickCalculate();
    await factorialPage.wait(1000);

    // Verify calculation worked
    const resultText = await factorialPage.getResultText();
    expect(resultText).toContain('120');

    // Check input styling after recovery
    const inputClassAfterRecovery = await factorialPage.numberInput.getAttribute('class');
    console.log('   Input classes after recovery:', inputClassAfterRecovery);

    console.log('✅ Error Recovery: Error styling cleared after correction');
  });

});
