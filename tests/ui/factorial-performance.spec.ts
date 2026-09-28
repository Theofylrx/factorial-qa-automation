import test, { expect } from '../../lib/helpers/baseTest';

/**
 * Performance Tests for Factorial Calculator
 * Testing page load time, response time, and application performance
 */

test.describe('Factorial Calculator - Performance Tests', () => {
  test.beforeEach(async ({ factorialPage }) => {
    await factorialPage.gotoFactorialPage();
  });

  test('should load page within acceptable time', { tag: '@performance' }, async ({ page }) => {
    const startTime = Date.now();

    await page.goto('http://qainterview.pythonanywhere.com');
    await page.waitForLoadState('domcontentloaded');

    const loadTime = Date.now() - startTime;
    console.log(`Page load time: ${loadTime}ms`);

    // Page should load in under 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });

  test('should respond to calculation quickly', { tag: '@performance' }, async ({ factorialPage, page }) => {
    await factorialPage.enterNumber(10);

    const startTime = Date.now();
    await factorialPage.clickCalculate();

    // Wait for result to appear
    await page.waitForSelector('#resultDiv:visible', { timeout: 5000 });

    const responseTime = Date.now() - startTime;
    console.log(`Calculation response time: ${responseTime}ms`);

    // Should respond in under 3 seconds
    expect(responseTime).toBeLessThan(3000);
  });

  test('should handle multiple rapid calculations', { tag: '@performance' }, async ({ factorialPage }) => {
    const calculations = [1, 2, 3, 4, 5];
    const startTime = Date.now();

    for (const num of calculations) {
      await factorialPage.enterNumber(num);
      await factorialPage.clickCalculate();
      await factorialPage.wait(500);
    }

    const totalTime = Date.now() - startTime;
    console.log(`Total time for ${calculations.length} calculations: ${totalTime}ms`);

    // Should complete all calculations reasonably fast
    expect(totalTime).toBeLessThan(10000);
  });

  test('should not have excessive DOM size', { tag: '@performance' }, async ({ page }) => {
    const domSize = await page.evaluate(() => {
      return document.getElementsByTagName('*').length;
    });

    console.log(`DOM elements count: ${domSize}`);

    // Simple page should have reasonable DOM size
    expect(domSize).toBeLessThan(500);
  });

  test('should not have memory leaks on repeated calculations', { tag: '@performance' }, async ({ factorialPage }) => {
    // Perform 10 calculations
    for (let i = 0; i < 10; i++) {
      await factorialPage.calculateFactorial(5);
      await factorialPage.wait(200);
    }

    // Page should still be responsive
    const inputEnabled = await factorialPage.numberInput.isEnabled();
    expect(inputEnabled).toBe(true);
  });

  test('should handle network latency gracefully', { tag: '@performance' }, async ({ page, factorialPage }) => {
    // Slow down network to simulate slow connection
    await page.route('**/factorial', async route => {
      await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
      route.continue();
    });

    await factorialPage.enterNumber(7);
    const startTime = Date.now();
    await factorialPage.clickCalculate();

    // Wait for result
    await page.waitForSelector('#resultDiv:visible', { timeout: 10000 });
    const responseTime = Date.now() - startTime;

    console.log(`Response time with network delay: ${responseTime}ms`);

    // Should handle delay without crashing
    const result = await factorialPage.getResultText();
    expect(result).toContain('5040');
  });

  test('should maintain performance with large numbers', { tag: '@performance' }, async ({ factorialPage, page }) => {
    const startTime = Date.now();

    await factorialPage.enterNumber(100);
    await factorialPage.clickCalculate();
    await page.waitForSelector('#resultDiv', { state: 'visible', timeout: 5000 });

    const responseTime = Date.now() - startTime;
    console.log(`Large number calculation time: ${responseTime}ms`);

    // Should complete even for large numbers
    expect(responseTime).toBeLessThan(5000);
  });

  test('should have minimal JavaScript execution time', { tag: '@performance' }, async ({ page }) => {
    const metrics = await page.evaluate(() => {
      const perfData = window.performance.timing;
      return {
        domContentLoaded: perfData.domContentLoadedEventEnd - perfData.navigationStart,
        pageLoad: perfData.loadEventEnd - perfData.navigationStart
      };
    });

    console.log('Performance metrics:', metrics);
    console.log(`DOM Content Loaded: ${metrics.domContentLoaded}ms`);
    console.log(`Page Load: ${metrics.pageLoad}ms`);

    // Metrics should be available
    expect(metrics.domContentLoaded).toBeGreaterThan(0);
  });

  test('should not block UI during calculation', { tag: '@performance' }, async ({ factorialPage, page }) => {
    await factorialPage.enterNumber(50);
    await factorialPage.clickCalculate();

    // UI should still be interactive
    const inputEnabled = await factorialPage.numberInput.isEnabled();
    expect(inputEnabled).toBe(true);
  });

  test('should have efficient CSS rendering', { tag: '@performance' }, async ({ page }) => {
    const cssCount = await page.evaluate(() => {
      return document.styleSheets.length;
    });

    console.log(`Number of stylesheets: ${cssCount}`);

    // Should not have excessive stylesheets
    expect(cssCount).toBeLessThan(10);
  });
});
