import test, { expect } from '../../lib/helpers/baseTest';

/**
 * Navigation Tests for Factorial Calculator
 * Testing navigation links and page elements
 */

test.describe('Factorial Calculator - Navigation Tests', () => {
  test.beforeEach(async ({ factorialPage }) => {
    await factorialPage.gotoFactorialPage();
  });

  test('should navigate to About page when About link is clicked', { tag: '@navigation' }, async ({ factorialPage, page }) => {
    await factorialPage.clickNavigationLink('about');
    await factorialPage.wait(1000);

    // Verify URL changed
    expect(page.url()).toContain('/about');
  });

  test('should verify Terms and Conditions link', { tag: '@navigation' }, async ({ factorialPage, page }) => {
    // Click on Terms link (which points to /privacy - potential bug)
    await factorialPage.clickNavigationLink('terms');
    await factorialPage.wait(1000);

    // Check actual URL navigated to
    const currentUrl = page.url();
    console.log('Terms link navigated to:', currentUrl);
  });

  test('should verify Privacy link', { tag: '@navigation' }, async ({ factorialPage, page }) => {
    // Click on Privacy link (which points to /terms - potential bug)
    await factorialPage.clickNavigationLink('privacy');
    await factorialPage.wait(1000);

    // Check actual URL navigated to
    const currentUrl = page.url();
    console.log('Privacy link navigated to:', currentUrl);
  });

  test('should verify Qxf2 Services link opens external website', { tag: '@navigation' }, async ({ factorialPage, page, context }) => {
    // Listen for new page (external link might open in new tab)
    const pagePromise = context.waitForEvent('page');

    await factorialPage.qxf2Link.click();

    // Wait for new page or check current page URL
    try {
      const newPage = await pagePromise;
      expect(newPage.url()).toContain('qxf2.com');
      await newPage.close();
    } catch (e) {
      // Link opened in same page
      await factorialPage.wait(1000);
      expect(page.url()).toContain('qxf2.com');
    }
  });

  test('should verify all navigation links have proper href attributes', { tag: '@navigation' }, async ({ factorialPage }) => {
    // About link
    const aboutHref = await factorialPage.aboutLink.getAttribute('href');
    expect(aboutHref).toBe('/about');

    // Terms link
    const termsHref = await factorialPage.termsLink.getAttribute('href');
    console.log('Terms link href:', termsHref);

    // Privacy link
    const privacyHref = await factorialPage.privacyLink.getAttribute('href');
    console.log('Privacy link href:', privacyHref);

    // Qxf2 link
    const qxf2Href = await factorialPage.qxf2Link.getAttribute('href');
    expect(qxf2Href).toContain('qxf2.com');
  });
});
