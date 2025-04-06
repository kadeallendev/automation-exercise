import test, { request, type APIRequestContext, type APIResponse } from '@playwright/test';

export class BaseAPI {
  protected requestContext!: APIRequestContext;
  private baseURL!: string;

  protected constructor() {}

  public static async create(baseURL: string): Promise<BaseAPI> {
    const instance = new BaseAPI();
    await instance.initializeRequestContext(baseURL);
    return instance;
  }

  private async initializeRequestContext(baseURL: string): Promise<void> {
    this.baseURL = baseURL;
    this.baseURL = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL;
    this.requestContext = await request.newContext({
      baseURL: baseURL,
      extraHTTPHeaders: BaseAPI.getHeadersFromConfig()
    });
  }

  private static getHeadersFromConfig(): Record<string, string> {
    return test.info().project.use.extraHTTPHeaders || {};
  }
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  protected async get(url: string, data: any): Promise<APIResponse> {
    try {
      const fullURL = `${this.baseURL}${url.startsWith('/') ? '' : '/'}${url}`;
      const response = await this.requestContext.get(fullURL, data);
      if (!response.ok()) {
        throw new Error(`GET request failed: ${response.status()} ${response.statusText()}`);
      }
      return response;
    } catch (error) {
      throw new Error(`GET request failed: ${error}`);
    }
  }
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  protected async delete(url: string, data: any): Promise<APIResponse> {
    try {
      const fullURL = `${this.baseURL}${url.startsWith('/') ? '' : '/'}${url}`;
      const response = await this.requestContext.delete(fullURL, data);
      if (!response.ok()) {
        throw new Error(`DELETE request failed: ${response.status()} ${response.statusText()}`);
      }
      return response;
    } catch (error) {
      throw new Error(`DELETE request failed: ${error}`);
    }
  }
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  protected async post(url: string, data: any): Promise<APIResponse> {
    try {
      const fullURL = `${this.baseURL}${url.startsWith('/') ? '' : '/'}${url}`;
      const response = await this.requestContext.post(fullURL, data);
      if (!response.ok()) {
        throw new Error(`POST request failed: ${response.status()} ${response.statusText()}`);
      }
      return response;
    } catch (error) {
      throw new Error(`POST request failed: ${error}`);
    }
  }
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  protected async put(url: string, data: any): Promise<APIResponse> {
    try {
      const fullURL = `${this.baseURL}${url.startsWith('/') ? '' : '/'}${url}`;
      const response = await this.requestContext.put(fullURL, data);
      if (!response.ok()) {
        throw new Error(`PUT request failed: ${response.status()} ${response.statusText()}`);
      }
      return response;
    } catch (error) {
      throw new Error(`PUT request failed: ${error}`);
    }
  }
}

export default BaseAPI;
