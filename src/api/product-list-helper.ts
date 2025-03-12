import type { APIResponse } from '@playwright/test';
import BaseAPI from './base-api';

class ProductListHelper extends BaseAPI {
  public static async create(): Promise<ProductListHelper> {
    const baseAPI = await BaseAPI.create(`${process.env.BASE_URL}/api`);
    return Object.assign(new ProductListHelper(), baseAPI);
  }

  public async getAllProducts(): Promise<APIResponse> {
    return this.get('productsList');
  }
}

export default ProductListHelper;
