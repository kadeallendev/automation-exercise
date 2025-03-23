import type { APIResponse } from '@playwright/test';
import BaseAPI from './base-api';

class SearchProductHelper extends BaseAPI {
  public static async create(): Promise<SearchProductHelper> {
    const baseAPI = await BaseAPI.create(`${process.env.BASE_URL}/api`);
    return Object.assign(new SearchProductHelper(), baseAPI);
  }

  public async searchForProduct(searchProduct: string): Promise<APIResponse> {
    const data = [`search_product=${encodeURIComponent(searchProduct)}`].join('&');
    const response = await this.post('searchProduct', {
      data: data,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    return response;
  }
}

export default SearchProductHelper;
