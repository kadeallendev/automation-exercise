import type { APIResponse } from '@playwright/test';
import BaseAPI from './base-api';

export class GetUserDetailHelper extends BaseAPI {
  public static async create(): Promise<GetUserDetailHelper> {
    const baseAPI = await BaseAPI.create(`${process.env.BASE_URL}/api`);
    return Object.assign(new GetUserDetailHelper(), baseAPI);
  }

  public async getUserAccountDetailByEmail(accountEmail: string): Promise<APIResponse> {
    const url = `getUserDetailByEmail?email=${encodeURIComponent(accountEmail)}`;
    const response = await this.get(url, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    return response;
  }
}

export default GetUserDetailHelper;
