import type { APIResponse } from '@playwright/test';
import BaseAPI from './base-api';

class SearchProductHelper extends BaseAPI {
  public static async create(): Promise<SearchProductHelper> {
    const baseAPI = await BaseAPI.create(`${process.env.BASE_URL}/api`);
    return Object.assign(new SearchProductHelper(), baseAPI);
  }

  public async searchForProduct(criteria: string): Promise<APIResponse> {
    return this.post('searchProduct', { criteria });
  }
}

export default SearchProductHelper;
