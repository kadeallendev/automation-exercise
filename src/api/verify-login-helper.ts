import type { APIResponse } from '@playwright/test';
import type { UserData } from 'page-object-model/data/user-data';
import BaseAPI from './base-api';

class VerifyLoginHelper extends BaseAPI {
  public static async create(): Promise<VerifyLoginHelper> {
    const baseAPI = await BaseAPI.create(`${process.env.BASE_URL}/api`);
    return Object.assign(new VerifyLoginHelper(), baseAPI);
  }

  public async verify(user: UserData.User): Promise<APIResponse> {
    const data = [`email=${encodeURIComponent(user.email)}`, `password=${encodeURIComponent(user.password)}`].join('&');
    const response = await this.post('verifyLogin', {
      data: data,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    return response;
  }
}

export default VerifyLoginHelper;
