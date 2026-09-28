import { expect, Page } from '@playwright/test';
import config from '../lib/config/config';

/**
 * Base Page class that all page objects will extend
 * Provides common functionality for navigation and URL validation
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a specific path
   * @param path - Optional path to append to base URL
   */
  async goto(path: string = ''): Promise<void> {
    const url = path ? `${config.baseURL}${path}` : config.baseURL;
    await this.page.goto(url);
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Validate the current page URL contains expected path
   * @param path - Expected path in URL
   */
  async validatePageURL(path: string): Promise<void> {
    expect(this.page.url()).toContain(path);
  }

  /**
   * Get page title
   */
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Take a screenshot
   * @param path - Path to save screenshot
   */
  async takeScreenshot(path: string): Promise<void> {
    await this.page.screenshot({ path, fullPage: true });
  }

  /**
   * Wait for a specific time
   * @param milliseconds - Time to wait in milliseconds
   */
  async wait(milliseconds: number): Promise<void> {
    await this.page.waitForTimeout(milliseconds);
  }
}
