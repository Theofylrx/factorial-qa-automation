import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

/**
 * Page Object for Factorial Calculator Page
 * Follows Page Object Model pattern with proper encapsulation
 */
export class FactorialPage extends BasePage {
  readonly page: Page;

  // Header elements
  readonly pageTitle: Locator;
  readonly pageHeading: Locator;

  // Form elements
  readonly numberInput: Locator;
  readonly calculateButton: Locator;
  readonly resultDiv: Locator;

  // Navigation links
  readonly aboutLink: Locator;
  readonly termsLink: Locator;
  readonly privacyLink: Locator;
  readonly qxf2Link: Locator;

  // Footer elements
  readonly copyrightText: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;

    // Initialize locators
    this.pageTitle = page.locator('title');
    this.pageHeading = page.locator('h1');

    // Form elements using specific attributes
    this.numberInput = page.locator('input#number[name="number"]');
    this.calculateButton = page.locator('button#getFactorial[type="submit"]');
    this.resultDiv = page.locator('#resultDiv');

    // Navigation links
    this.aboutLink = page.locator('a[href="/about"]');
    this.termsLink = page.locator('a[href="/privacy"]'); // Note: This might be a bug
    this.privacyLink = page.locator('a[href="/terms"]'); // Note: This might be a bug
    this.qxf2Link = page.locator('a[href*="qxf2.com"]');

    // Footer
    this.copyrightText = page.locator('footer, .footer, p:has-text("Qxf2")').first();
  }

  /**
   * Navigate to the factorial calculator page
   */
  async gotoFactorialPage(): Promise<void> {
    await this.goto('/');
  }

  /**
   * Enter a number in the input field
   * @param value - The value to enter
   */
  async enterNumber(value: string | number): Promise<void> {
    await this.numberInput.clear();
    await this.numberInput.fill(String(value));
  }

  /**
   * Clear the input field
   */
  async clearInput(): Promise<void> {
    await this.numberInput.clear();
  }

  /**
   * Click the calculate button
   */
  async clickCalculate(): Promise<void> {
    await this.calculateButton.click();
  }

  /**
   * Calculate factorial by entering number and clicking button
   * @param value - Number to calculate factorial for
   */
  async calculateFactorial(value: string | number): Promise<void> {
    await this.enterNumber(value);
    await this.clickCalculate();
    // Wait for result to appear
    await this.wait(1000);
  }

  /**
   * Get the result text from the result div
   */
  async getResultText(): Promise<string> {
    await this.resultDiv.waitFor({ state: 'visible', timeout: 5000 });
    return await this.resultDiv.textContent() || '';
  }

  /**
   * Validate the result contains expected factorial value
   * @param number - Input number
   * @param expectedFactorial - Expected factorial result
   */
  async validateFactorialResult(number: number, expectedFactorial: string | number): Promise<void> {
    const resultText = await this.getResultText();
    expect(resultText).toContain(`The factorial of ${number} is: ${expectedFactorial}`);
  }

  /**
   * Validate error message is displayed
   * @param expectedMessage - Expected error message
   */
  async validateErrorMessage(expectedMessage: string): Promise<void> {
    const resultText = await this.getResultText();
    expect(resultText).toContain(expectedMessage);
  }

  /**
   * Get the border color of the input field
   */
  async getInputBorderStyle(): Promise<string> {
    return await this.numberInput.evaluate((el) => {
      return window.getComputedStyle(el).border;
    });
  }

  /**
   * Validate input field has error styling (red border)
   */
  async validateErrorStyling(): Promise<void> {
    const border = await this.numberInput.evaluate((el) => {
      return window.getComputedStyle(el).borderColor;
    });
    // Red border should be rgb(255, 0, 0) or similar
    expect(border).toMatch(/rgb\(255,\s*0,\s*0\)/);
  }

  /**
   * Get the text color of the result div
   */
  async getResultTextColor(): Promise<string> {
    return await this.resultDiv.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });
  }

  /**
   * Validate all page elements are visible
   */
  async validatePageElements(): Promise<void> {
    await expect(this.pageHeading).toBeVisible();
    await expect(this.numberInput).toBeVisible();
    await expect(this.numberInput).toBeEditable();
    await expect(this.calculateButton).toBeVisible();
    await expect(this.calculateButton).toBeEnabled();
    await expect(this.aboutLink).toBeVisible();
    await expect(this.termsLink).toBeVisible();
    await expect(this.privacyLink).toBeVisible();
    await expect(this.qxf2Link).toBeVisible();
  }

  /**
   * Validate page heading text
   */
  async validatePageHeading(expectedText: string): Promise<void> {
    await expect(this.pageHeading).toHaveText(expectedText);
  }

  /**
   * Click on a navigation link
   * @param linkName - Name of the link to click (about, terms, privacy, qxf2)
   */
  async clickNavigationLink(linkName: string): Promise<void> {
    switch (linkName.toLowerCase()) {
      case 'about':
        await this.aboutLink.click();
        break;
      case 'terms':
        await this.termsLink.click();
        break;
      case 'privacy':
        await this.privacyLink.click();
        break;
      case 'qxf2':
        await this.qxf2Link.click();
        break;
      default:
        throw new Error(`Unknown link: ${linkName}`);
    }
  }

  /**
   * Validate input field placeholder text
   */
  async validateInputPlaceholder(expectedText: string): Promise<void> {
    await expect(this.numberInput).toHaveAttribute('placeholder', expectedText);
  }

  /**
   * Validate calculate button text
   */
  async validateCalculateButtonText(expectedText: string): Promise<void> {
    await expect(this.calculateButton).toHaveText(expectedText);
  }
}
