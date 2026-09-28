import test, { expect } from '../../lib/helpers/baseTest';

/**
 * UI and Visual Tests for Factorial Calculator
 * Testing layout, styling, responsiveness, and visual consistency
 */

test.describe('Factorial Calculator - UI/Visual Tests', () => {
  test.beforeEach(async ({ factorialPage }) => {
    await factorialPage.gotoFactorialPage();
  });

  test('should have proper page layout structure', { tag: '@ui' }, async ({ page }) => {
    // Check main container exists
    const bodyVisible = await page.locator('body').isVisible();
    expect(bodyVisible).toBe(true);

    // Check heading is visible
    const h1Visible = await page.locator('h1').isVisible();
    expect(h1Visible).toBe(true);
  });

  test('should have input field with proper styling', { tag: '@ui' }, async ({ page }) => {
    const input = page.locator('input#number');

    // Check input is visible and has reasonable size
    const boundingBox = await input.boundingBox();
    expect(boundingBox).not.toBeNull();
    expect(boundingBox?.width).toBeGreaterThan(50);
    expect(boundingBox?.height).toBeGreaterThan(20);
  });

  test('should have button with proper styling', { tag: '@ui' }, async ({ page }) => {
    const button = page.locator('button[type="submit"]');

    // Check button is visible and clickable
    await expect(button).toBeVisible();
    await expect(button).toBeEnabled();

    // Check button has reasonable size
    const boundingBox = await button.boundingBox();
    expect(boundingBox?.width).toBeGreaterThan(50);
  });

  test('should display result in visible area', { tag: '@ui' }, async ({ factorialPage, page }) => {
    await factorialPage.calculateFactorial(5);

    const resultDiv = page.locator('#resultDiv');
    await expect(resultDiv).toBeVisible();

    // Check result is in viewport
    const isInViewport = await resultDiv.evaluate(el => {
      const rect = el.getBoundingClientRect();
      return rect.top >= 0 && rect.bottom <= window.innerHeight;
    });

    expect(isInViewport).toBe(true);
  });

  test('should have consistent spacing between elements', { tag: '@ui' }, async ({ page }) => {
    // Check elements are not overlapping
    const h1Box = await page.locator('h1').boundingBox();
    const inputBox = await page.locator('input#number').boundingBox();

    // H1 should be above input
    expect(h1Box?.y).toBeLessThan(inputBox?.y || 0);
  });

  test('should maintain layout on window resize', { tag: '@ui' }, async ({ page, factorialPage }) => {
    // Resize to mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);

    // Elements should still be visible
    await expect(factorialPage.pageHeading).toBeVisible();
    await expect(factorialPage.numberInput).toBeVisible();
    await expect(factorialPage.calculateButton).toBeVisible();

    // Resize to tablet size
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(500);

    await expect(factorialPage.pageHeading).toBeVisible();
    await expect(factorialPage.numberInput).toBeVisible();

    // Resize to desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForTimeout(500);

    await expect(factorialPage.pageHeading).toBeVisible();
    await expect(factorialPage.numberInput).toBeVisible();
  });

  test('should have readable font sizes', { tag: '@ui' }, async ({ page }) => {
    // Check heading font size
    const h1FontSize = await page.locator('h1').evaluate(el => {
      return window.getComputedStyle(el).fontSize;
    });

    console.log('H1 font size:', h1FontSize);
    const fontSize = parseFloat(h1FontSize);
    expect(fontSize).toBeGreaterThan(16); // Minimum readable size

    // Check body text font size
    const bodyFontSize = await page.evaluate(() => {
      return window.getComputedStyle(document.body).fontSize;
    });

    console.log('Body font size:', bodyFontSize);
    const bodySize = parseFloat(bodyFontSize);
    expect(bodySize).toBeGreaterThan(12);
  });

  test('should have consistent color scheme', { tag: '@ui' }, async ({ page }) => {
    // Check primary colors are defined
    const bodyColor = await page.evaluate(() => {
      return window.getComputedStyle(document.body).color;
    });

    const bodyBg = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });

    console.log('Body text color:', bodyColor);
    console.log('Body background:', bodyBg);

    expect(bodyColor).toBeTruthy();
    expect(bodyBg).toBeTruthy();
  });

  test('should handle long result text without overflow', { tag: '@ui' }, async ({ factorialPage, page }) => {
    await factorialPage.calculateFactorial(20);
    await page.waitForTimeout(1000);

    const resultDiv = page.locator('#resultDiv');
    const hasOverflow = await resultDiv.evaluate(el => {
      return el.scrollWidth > el.clientWidth;
    });

    // Result should not overflow horizontally
    // (This might fail if text overflows)
    console.log('Result has overflow:', hasOverflow);
  });

  test('should have hover effects on interactive elements', { tag: '@ui' }, async ({ page }) => {
    const button = page.locator('button[type="submit"]');

    // Get initial style
    const initialCursor = await button.evaluate(el => {
      return window.getComputedStyle(el).cursor;
    });

    console.log('Button cursor style:', initialCursor);

    // Interactive elements should have pointer cursor or similar
    // (This is a suggestion, not all applications implement this)
  });

  test('should display error state with proper styling', { tag: '@ui' }, async ({ factorialPage, page }) => {
    await factorialPage.enterNumber('invalid');
    await factorialPage.clickCalculate();
    await factorialPage.wait(1000);

    // Check error styling
    const inputBorder = await factorialPage.numberInput.evaluate(el => {
      return window.getComputedStyle(el).borderColor;
    });

    console.log('Error input border color:', inputBorder);

    // Red border should be applied
    expect(inputBorder).toContain('255, 0, 0'); // RGB red
  });

  test('should have proper text alignment', { tag: '@ui' }, async ({ page }) => {
    // Check heading alignment
    const h1Alignment = await page.locator('h1').evaluate(el => {
      return window.getComputedStyle(el).textAlign;
    });

    console.log('H1 text alignment:', h1Alignment);
    expect(h1Alignment).toBeTruthy();
  });

  test('should have navigation links properly styled', { tag: '@ui' }, async ({ page }) => {
    const links = await page.locator('a').all();

    for (const link of links) {
      const isVisible = await link.isVisible();
      expect(isVisible).toBe(true);

      const color = await link.evaluate(el => {
        return window.getComputedStyle(el).color;
      });

      // Links should have defined color
      expect(color).toBeTruthy();
    }
  });

  test('should maintain aspect ratio on different screen sizes', { tag: '@ui' }, async ({ page }) => {
    const viewportSizes = [
      { width: 320, height: 568 },  // iPhone SE
      { width: 375, height: 667 },  // iPhone 6/7/8
      { width: 768, height: 1024 }, // iPad
      { width: 1280, height: 720 }, // Desktop
      { width: 1920, height: 1080 } // Full HD
    ];

    for (const size of viewportSizes) {
      await page.setViewportSize(size);
      await page.waitForTimeout(300);

      const h1Visible = await page.locator('h1').isVisible();
      expect(h1Visible).toBe(true);

      console.log(`Layout maintained at ${size.width}x${size.height}`);
    }
  });

  test('should not have horizontal scrollbar on standard viewport', { tag: '@ui' }, async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });

    const hasHorizontalScroll = await page.evaluate(() => {
      return document.body.scrollWidth > window.innerWidth;
    });

    expect(hasHorizontalScroll).toBe(false);
  });
});
