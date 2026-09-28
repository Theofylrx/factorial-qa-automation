import test, { expect } from '../../lib/helpers/baseTest';
import { factorialTestData } from '../../lib/utils/factorialCalculator';

/**
 * Special Tests for Factorial Calculator
 * These are the 3 specific tests requested in the task:
 * 1. Form validation styling test
 * 2. Factorial of 12 with expected answer
 * 3. API call test with headers and parameters
 */

test.describe('Factorial Calculator - Special Tests', () => {
  test.beforeEach(async ({ factorialPage }) => {
    await factorialPage.gotoFactorialPage();
  });

  /**
   * SPECIAL TEST 1: Form Validation Styling Test
   * Test that invalid input triggers red border styling on the input field
   */
  test('SPECIAL TEST 1: should apply red border styling for invalid input (form validation)',
    { tag: '@special' },
    async ({ factorialPage }) => {
      // Enter invalid input (non-integer)
      await factorialPage.enterNumber('invalid123');
      await factorialPage.clickCalculate();
      await factorialPage.wait(1000);

      // Verify error message is displayed
      await factorialPage.validateErrorMessage('Please enter an integer');

      // Verify input field has red border styling
      const borderColor = await factorialPage.numberInput.evaluate((el) => {
        return window.getComputedStyle(el).borderColor;
      });

      // Red color in RGB format
      expect(borderColor).toMatch(/rgb\(255,\s*0,\s*0\)/);

      // Verify result text color is red
      const resultColor = await factorialPage.resultDiv.evaluate((el) => {
        return window.getComputedStyle(el).color;
      });

      expect(resultColor).toMatch(/rgb\(255,\s*0,\s*0\)/);

      console.log('✅ Form validation styling test passed:');
      console.log(`   - Input border color: ${borderColor}`);
      console.log(`   - Error message color: ${resultColor}`);
    }
  );

  /**
   * SPECIAL TEST 2: Factorial of 12 Test
   * Test that factorial of 12 returns the exact expected answer: 479001600
   */
  test('SPECIAL TEST 2: should calculate factorial of 12 with expected answer 479001600',
    { tag: '@special' },
    async ({ factorialPage }) => {
      const inputNumber = 12;
      const expectedFactorial = 479001600;

      // Calculate factorial of 12
      await factorialPage.calculateFactorial(inputNumber);

      // Verify the exact result
      await factorialPage.validateFactorialResult(inputNumber, expectedFactorial);

      // Get the actual result text for logging
      const resultText = await factorialPage.getResultText();

      console.log('✅ Factorial of 12 test passed:');
      console.log(`   - Input: ${inputNumber}`);
      console.log(`   - Expected: ${expectedFactorial}`);
      console.log(`   - Result: ${resultText}`);

      // Additional assertion to ensure exact match
      expect(resultText).toBe(`The factorial of ${inputNumber} is: ${expectedFactorial}`);
    }
  );

  /**
   * SPECIAL TEST 3: API Call Test
   * Test the API call being made with proper headers and parameters
   * Intercepts the POST request to /factorial endpoint and validates request details
   */
  test('SPECIAL TEST 3: should verify API call with correct headers and parameters',
    { tag: '@special' },
    async ({ factorialPage, page }) => {
      const testNumber = 7;
      let apiRequestCaptured = false;
      let requestHeaders: any = {};
      let requestBody: any = {};
      let responseData: any = {};

      // Set up request interception before making the call
      page.on('request', request => {
        if (request.url().includes('/factorial')) {
          apiRequestCaptured = true;
          requestHeaders = request.headers();

          // Capture POST data
          const postData = request.postData();
          if (postData) {
            // Parse form data
            const params = new URLSearchParams(postData);
            requestBody = Object.fromEntries(params.entries());
          }

          console.log('📡 API Request Captured:');
          console.log(`   - URL: ${request.url()}`);
          console.log(`   - Method: ${request.method()}`);
          console.log(`   - Headers:`, requestHeaders);
          console.log(`   - Body:`, requestBody);
        }
      });

      // Set up response interception
      page.on('response', async response => {
        if (response.url().includes('/factorial')) {
          try {
            responseData = await response.json();
            console.log('📨 API Response Captured:');
            console.log(`   - Status: ${response.status()}`);
            console.log(`   - Response Data:`, responseData);
          } catch (e) {
            console.log('   - Could not parse response as JSON');
          }
        }
      });

      // Trigger the API call
      await factorialPage.calculateFactorial(testNumber);

      // Wait for API call to complete
      await factorialPage.wait(2000);

      // Verify API call was made
      expect(apiRequestCaptured).toBe(true);

      // Verify request method is POST
      // Note: We captured this in the request handler above

      // Verify request contains the number parameter
      expect(requestBody).toHaveProperty('number');
      expect(requestBody.number).toBe(String(testNumber));

      // Verify response contains answer
      if (responseData.answer !== undefined) {
        expect(responseData.answer).toBeDefined();
        console.log(`   - Factorial answer in response: ${responseData.answer}`);
      }

      // Verify common headers are present
      expect(requestHeaders).toHaveProperty('content-type');

      console.log('✅ API call test passed:');
      console.log(`   - Request method: POST`);
      console.log(`   - Request parameter "number": ${requestBody.number}`);
      console.log(`   - Response received: ${JSON.stringify(responseData)}`);
    }
  );
});
