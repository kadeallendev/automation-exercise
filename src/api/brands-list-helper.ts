import type { APIResponse } from '@playwright/test';
import BaseAPI from './base-api';

class BrandsListHelper extends BaseAPI {
  public static async create(): Promise<BrandsListHelper> {
    const baseAPI = await BaseAPI.create(`${process.env.BASE_URL}/api`);
    return Object.assign(new BrandsListHelper(), baseAPI);
  }

  public async getAllBrands(): Promise<APIResponse> {
    return this.get('brandsList', {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
  }
}

export default BrandsListHelper;
