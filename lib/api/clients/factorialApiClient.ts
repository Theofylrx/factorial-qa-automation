import { APIRequestContext, request } from '@playwright/test';

/**
 * Factorial API Client
 * Low-level HTTP wrapper for the Factorial Calculator API
 * Follows the same pattern as ApiClient in saucedemo project
 */
export class FactorialApiClient {
    private requestContext: APIRequestContext | null = null;
    private baseURL: string;
    private defaultHeaders: Record<string, string>;

    constructor(baseURL: string = 'http://qainterview.pythonanywhere.com') {
        this.baseURL = baseURL;
        this.defaultHeaders = {
            'Accept': 'application/json',
        };
    }

    /**
     * Initialize the API request context
     */
    async init(): Promise<void> {
        this.requestContext = await request.newContext({
            baseURL: this.baseURL,
            extraHTTPHeaders: this.defaultHeaders,
        });
    }

    /**
     * Dispose of the request context
     */
    async dispose(): Promise<void> {
        if (this.requestContext) {
            await this.requestContext.dispose();
        }
    }

    /**
     * POST request
     */
    async post(endpoint: string, data: any, options: { headers?: Record<string, string> } = {}) {
        if (!this.requestContext) {
            throw new Error('API Client not initialized. Call init() first.');
        }

        const response = await this.requestContext.post(endpoint, {
            data,
            headers: { ...this.defaultHeaders, ...options.headers },
        });

        return {
            status: response.status(),
            statusText: response.statusText(),
            headers: response.headers(),
            body: await this.parseResponse(response),
            ok: response.ok(),
            rawResponse: response,
        };
    }

    /**
     * POST request with form data
     */
    async postForm(endpoint: string, formData: Record<string, string>, options: { headers?: Record<string, string> } = {}) {
        if (!this.requestContext) {
            throw new Error('API Client not initialized. Call init() first.');
        }

        const response = await this.requestContext.post(endpoint, {
            form: formData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                ...options.headers,
            },
        });

        return {
            status: response.status(),
            statusText: response.statusText(),
            headers: response.headers(),
            body: await this.parseResponse(response),
            ok: response.ok(),
            rawResponse: response,
        };
    }

    /**
     * GET request
     */
    async get(endpoint: string, options: { params?: Record<string, any>, headers?: Record<string, string> } = {}) {
        if (!this.requestContext) {
            throw new Error('API Client not initialized. Call init() first.');
        }

        const response = await this.requestContext.get(endpoint, {
            params: options.params,
            headers: { ...this.defaultHeaders, ...options.headers },
        });

        return {
            status: response.status(),
            statusText: response.statusText(),
            headers: response.headers(),
            body: await this.parseResponse(response),
            ok: response.ok(),
            rawResponse: response,
        };
    }

    /**
     * PUT request
     */
    async put(endpoint: string, data: any, options: { headers?: Record<string, string> } = {}) {
        if (!this.requestContext) {
            throw new Error('API Client not initialized. Call init() first.');
        }

        const response = await this.requestContext.put(endpoint, {
            data,
            headers: { ...this.defaultHeaders, ...options.headers },
        });

        return {
            status: response.status(),
            statusText: response.statusText(),
            headers: response.headers(),
            body: await this.parseResponse(response),
            ok: response.ok(),
            rawResponse: response,
        };
    }

    /**
     * DELETE request
     */
    async delete(endpoint: string, options: { headers?: Record<string, string> } = {}) {
        if (!this.requestContext) {
            throw new Error('API Client not initialized. Call init() first.');
        }

        const response = await this.requestContext.delete(endpoint, {
            headers: { ...this.defaultHeaders, ...options.headers },
        });

        return {
            status: response.status(),
            statusText: response.statusText(),
            headers: response.headers(),
            body: await this.parseResponse(response),
            ok: response.ok(),
            rawResponse: response,
        };
    }

    /**
     * Parse response body based on content type
     */
    private async parseResponse(response: any): Promise<any> {
        const contentType = response.headers()['content-type'] || '';

        if (contentType.includes('application/json')) {
            try {
                return await response.json();
            } catch (error) {
                return await response.text();
            }
        }

        return await response.text();
    }

    /**
     * Get base URL
     */
    getBaseURL(): string {
        return this.baseURL;
    }
}
