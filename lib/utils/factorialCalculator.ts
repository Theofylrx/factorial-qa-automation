/**
 * Utility functions for factorial calculations
 * Used for test data generation and validation
 */

/**
 * Calculate factorial of a number
 * @param n - Number to calculate factorial for
 * @returns Factorial result or error for invalid inputs
 */
export function calculateFactorial(n: number): number {
  if (n < 0) {
    throw new Error('Factorial is not defined for negative numbers');
  }
  if (n === 0 || n === 1) {
    return 1;
  }
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

/**
 * Factorial test data
 * Pre-calculated factorial values for common test cases
 */
export const factorialTestData = {
  zero: { input: 0, output: 1 },
  one: { input: 1, output: 1 },
  two: { input: 2, output: 2 },
  three: { input: 3, output: 6 },
  four: { input: 4, output: 24 },
  five: { input: 5, output: 120 },
  six: { input: 6, output: 720 },
  seven: { input: 7, output: 5040 },
  eight: { input: 8, output: 40320 },
  nine: { input: 9, output: 362880 },
  ten: { input: 10, output: 3628800 },
  eleven: { input: 11, output: 39916800 },
  twelve: { input: 12, output: 479001600 },
  thirteen: { input: 13, output: 6227020800 },
};

/**
 * Invalid input test data
 */
export const invalidInputData = {
  negative: -5,
  decimal: 3.14,
  negativeDecimal: -2.5,
  string: 'abc',
  specialChars: '!@#',
  empty: '',
  whitespace: '   ',
  mixed: '12abc',
};
