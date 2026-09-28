import { FactorialApiClient } from '../clients/factorialApiClient';

/**
 * Factorial Service
 * High-level business logic for Factorial Calculator API
 * Similar to UserService, PostService in saucedemo project
 *
 * This is the "Page Object" equivalent for APIs
 * Tests should use these methods, not the raw API client
 */
export class FactorialService {
    private client: FactorialApiClient;
    private readonly endpoint = '/factorial';

    constructor(client: FactorialApiClient) {
        this.client = client;
    }

    /**
     * Calculate factorial for a given number
     * @param number - Number to calculate factorial for
     * @returns Factorial result
     */
    async calculateFactorial(number: string | number): Promise<{
        answer: number;
        status: number;
        ok: boolean;
    }> {
        const response = await this.client.postForm(this.endpoint, {
            number: String(number)
        });

        // Handle the case where API returns HTML instead of JSON
        if (typeof response.body === 'string' && response.body.includes('<!doctype html>')) {
            throw new Error(`API returned HTML instead of JSON. Status: ${response.status}`);
        }

        return {
            answer: response.body.answer,
            status: response.status,
            ok: response.ok,
        };
    }

    /**
     * Calculate factorial and validate result
     * @param number - Number to calculate
     * @param expectedAnswer - Expected factorial result
     */
    async calculateAndValidate(number: number, expectedAnswer: number): Promise<boolean> {
        const result = await this.calculateFactorial(number);
        return result.answer === expectedAnswer;
    }

    /**
     * Test factorial endpoint with invalid input
     * Returns response details for validation testing
     */
    async testInvalidInput(input: string | number): Promise<{
        status: number;
        body: any;
        ok: boolean;
        isError: boolean;
    }> {
        try {
            const response = await this.client.postForm(this.endpoint, {
                number: String(input)
            });

            return {
                status: response.status,
                body: response.body,
                ok: response.ok,
                isError: response.status >= 400,
            };
        } catch (error: any) {
            return {
                status: 500,
                body: error.message,
                ok: false,
                isError: true,
            };
        }
    }

    /**
     * Test missing parameter
     */
    async testMissingParameter(): Promise<{
        status: number;
        body: any;
        ok: boolean;
    }> {
        const response = await this.client.postForm(this.endpoint, {});
        return {
            status: response.status,
            body: response.body,
            ok: response.ok,
        };
    }

    /**
     * Test with custom headers
     */
    async calculateWithHeaders(number: string | number, headers: Record<string, string>): Promise<{
        answer: number;
        status: number;
        headers: Record<string, string>;
    }> {
        const response = await this.client.postForm(this.endpoint,
            { number: String(number) },
            { headers }
        );

        return {
            answer: response.body.answer,
            status: response.status,
            headers: response.headers,
        };
    }

    /**
     * Test HTTP method support
     */
    async testHTTPMethod(method: 'GET' | 'PUT' | 'DELETE', number: string | number = '5'): Promise<{
        status: number;
        ok: boolean;
    }> {
        let response;
        switch (method) {
            case 'GET':
                response = await this.client.get(`${this.endpoint}?number=${number}`);
                break;
            case 'PUT':
                response = await this.client.put(this.endpoint, { number: String(number) });
                break;
            case 'DELETE':
                response = await this.client.delete(this.endpoint);
                break;
        }

        return {
            status: response.status,
            ok: response.ok,
        };
    }

    /**
     * Validate response format
     */
    async validateResponseFormat(number: string | number): Promise<{
        isJSON: boolean;
        hasAnswer: boolean;
        contentType: string;
    }> {
        const response = await this.client.postForm(this.endpoint, {
            number: String(number)
        });

        const contentType = response.headers['content-type'] || '';
        const isJSON = contentType.includes('application/json');
        const hasAnswer = typeof response.body === 'object' && 'answer' in response.body;

        return {
            isJSON,
            hasAnswer,
            contentType,
        };
    }

    /**
     * Test concurrent requests
     */
    async testConcurrentRequests(numbers: number[]): Promise<{
        results: number[];
        allSucceeded: boolean;
    }> {
        const promises = numbers.map(num => this.calculateFactorial(num));
        const responses = await Promise.all(promises);

        return {
            results: responses.map(r => r.answer),
            allSucceeded: responses.every(r => r.ok),
        };
    }

    /**
     * Measure response time
     */
    async measureResponseTime(number: string | number): Promise<{
        answer: number;
        responseTime: number;
    }> {
        const startTime = Date.now();
        const result = await this.calculateFactorial(number);
        const responseTime = Date.now() - startTime;

        return {
            answer: result.answer,
            responseTime,
        };
    }
}
