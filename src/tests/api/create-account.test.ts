import { expect, test } from '@playwright/test';
import CreateAccountHelper from 'api/create-account-helper';
import DeleteAccountHelper from 'api/delete-account-helper';
import { UserData } from 'page-object-model/data/user-data';

test.describe('Create Account API', { tag: ['@api'] }, () => {
  let createAccountHelper: CreateAccountHelper;
  let deleteAccountHelper: DeleteAccountHelper;
  let testUser: UserData.User;

  test.beforeAll(async () => {
    createAccountHelper = await CreateAccountHelper.create();
    deleteAccountHelper = await DeleteAccountHelper.create();
  });
  test.beforeEach(async () => {
    testUser = UserData.createUser();
  });

  test('should create account with status 201', { tag: '@API-11' }, async () => {
    const response = await createAccountHelper.register(testUser);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.responseCode).toBe(201);
    expect(responseBody.message).toBe('User created!');
  });
  test.afterEach(async () => {
    const response = await deleteAccountHelper.deleteAccount(testUser);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.responseCode).toBe(200);
    expect(responseBody.message).toBe('Account deleted!');
  });
});
