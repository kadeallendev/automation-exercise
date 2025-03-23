import type { APIResponse } from '@playwright/test';
import BaseAPI from './base-api';

class ProductsListHelper extends BaseAPI {
  public static async create(): Promise<ProductsListHelper> {
    const baseAPI = await BaseAPI.create(`${process.env.BASE_URL}/api`);
    return Object.assign(new ProductsListHelper(), baseAPI);
  }

  public async getAllProducts(): Promise<APIResponse> {
    return this.get('productsList', {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
  }
}

export default ProductsListHelper;
