import type { APIResponse } from '@playwright/test';
import type { UserData } from 'page-object-model/data/user-data';
import BaseAPI from './base-api';

class CreateAccountHelper extends BaseAPI {
  public static async create(): Promise<CreateAccountHelper> {
    const baseAPI = await BaseAPI.create(`${process.env.BASE_URL}/api`);
    return Object.assign(new CreateAccountHelper(), baseAPI);
  }

  public async register(user: UserData.User): Promise<APIResponse> {
    const data = [
      `name=${encodeURIComponent(`${user.firstName} ${user.lastName}`)}`,
      `email=${encodeURIComponent(user.email)}`,
      `password=${encodeURIComponent(user.password)}`,
      `title=${encodeURIComponent(user.gender === 'male' ? 'Mr' : 'Mrs')}`,
      `birth_date=${encodeURIComponent(user.birthDate.getDate().toString())}`,
      `birth_month=${encodeURIComponent((user.birthDate.getMonth() + 1).toString())}`,
      `birth_year=${encodeURIComponent(user.birthDate.getFullYear().toString())}`,
      `firstname=${encodeURIComponent(user.firstName)}`,
      `lastname=${encodeURIComponent(user.lastName)}`,
      `company=${encodeURIComponent(user.company)}`,
      `address1=${encodeURIComponent(user.address)}`,
      `address2=${encodeURIComponent(user.address2)}`,
      `country=${encodeURIComponent(user.location.country)}`,
      `zipcode=${encodeURIComponent(user.location.zip)}`,
      `state=${encodeURIComponent(user.location.state)}`,
      `city=${encodeURIComponent(user.location.city)}`,
      `mobile_number=${encodeURIComponent(user.mobileNumber)}`
    ].join('&');

    const response = await this.post('createAccount', {
      data: data,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    return response;
  }
}

export default CreateAccountHelper;
