import { test as baseTest } from '@playwright/test';
import { BasePage } from '../../Pages/basePage';
import { FactorialPage } from '../../Pages/factorialPage';

/**
 * Custom fixtures type definition
 * Extends Playwright's base test with our custom page objects
 */
type CustomFixtures = {
  basePage: BasePage;
  factorialPage: FactorialPage;
};

/**
 * Extended test object with custom fixtures
 * Provides automatic page object instantiation for all tests
 * Following the Fixture pattern for dependency injection
 */
const test = baseTest.extend<CustomFixtures>({
  basePage: async ({ page }, use) => {
    await use(new BasePage(page));
  },
  factorialPage: async ({ page }, use) => {
    await use(new FactorialPage(page));
  },
});

export default test;
export { expect } from '@playwright/test';
