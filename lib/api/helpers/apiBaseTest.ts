import { test as baseTest } from '@playwright/test';
import { FactorialApiClient } from '../clients/factorialApiClient';
import { FactorialService } from '../services/factorialService';

/**
 * API Test Fixtures
 * Provides dependency injection for API tests
 * Following the same pattern as UI tests with baseTest.ts
 *
 * Similar to apiBaseTest.ts in saucedemo project
 */
type ApiFixtures = {
    factorialApiClient: FactorialApiClient;
    factorialService: FactorialService;
};

/**
 * Extended test with API fixtures
 * Usage in tests:
 * import { apiTest as test, expect } from '../../lib/api/helpers/apiBaseTest';
 *
 * test('test name', async ({ factorialService }) => {
 *   const result = await factorialService.calculateFactorial(5);
 *   expect(result.answer).toBe(120);
 * });
 */
export const apiTest = baseTest.extend<ApiFixtures>({
    factorialApiClient: async ({}, use) => {
        const client = new FactorialApiClient();
        await client.init();
        await use(client);
        await client.dispose();
    },

    factorialService: async ({ factorialApiClient }, use) => {
        await use(new FactorialService(factorialApiClient));
    },
});

export { expect } from '@playwright/test';
