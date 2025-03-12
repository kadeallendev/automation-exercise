import test, { request, type APIRequestContext, type APIResponse } from '@playwright/test';

class BaseAPI {
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

  protected async get(url: string): Promise<APIResponse> {
    try {
      const fullURL = `${this.baseURL}${url.startsWith('/') ? '' : '/'}${url}`;
      const response = await this.requestContext.get(fullURL);
      if (!response.ok()) {
        throw new Error(`GET request failed: ${response.status()} ${response.statusText()}`);
      }
      return response;
    } catch (error) {
      throw new Error(`GET request failed: ${error}`);
    }
  }
}

export default BaseAPI;
