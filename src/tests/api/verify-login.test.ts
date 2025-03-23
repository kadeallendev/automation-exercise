import { expect, request, test } from '@playwright/test';
import CreateAccountHelper from 'api/create-account-helper';
import DeleteAccountHelper from 'api/delete-account-helper';
import VerifyLoginHelper from 'api/verify-login-helper';
import { UserData } from 'page-object-model/data/user-data';

test.describe('Update Account API', { tag: ['@api'] }, () => {
  let createAccountHelper: CreateAccountHelper;
  let verifyLoginHelper: VerifyLoginHelper;
  let deleteAccountHelper: DeleteAccountHelper;
  let testUser: UserData.User;

  test.beforeAll(async () => {
    createAccountHelper = await CreateAccountHelper.create();
    verifyLoginHelper = await VerifyLoginHelper.create();
    deleteAccountHelper = await DeleteAccountHelper.create();
  });
  test.beforeEach(async () => {
    testUser = UserData.createUser();
    const response = await createAccountHelper.register(testUser);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.responseCode).toBe(201);
    expect(responseBody.message).toBe('User created!');
  });

  test('should verify login with status 200', { tag: '@API-07' }, async () => {
    const response = await verifyLoginHelper.verify(testUser);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.responseCode).toBe(200);
    expect(responseBody.message).toBe('User exists!');
  });
  test('should verify login without email with status 400', { tag: '@API-08' }, async () => {
    let baseURL = `${process.env.BASE_URL}/api`;
    baseURL = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL;
    const requestContext = await request.newContext({
      baseURL: baseURL,
      extraHTTPHeaders: test.info().project.use.extraHTTPHeaders || {}
    });
    const data = [`password=${encodeURIComponent(testUser.password)}`].join('&');
    const url = 'verifyLogin';
    const fullURL = `${baseURL}${url.startsWith('/') ? '' : '/'}${url}`;
    const response = await requestContext.post(fullURL, {
      data: data,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.responseCode).toBe(400);
    expect(responseBody.message).toBe('Bad request, email or password parameter is missing in POST request.');
  });
  test('should verify login with delete with status 405', { tag: '@API-09' }, async () => {
    let baseURL = `${process.env.BASE_URL}/api`;
    baseURL = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL;
    const requestContext = await request.newContext({
      baseURL: baseURL,
      extraHTTPHeaders: test.info().project.use.extraHTTPHeaders || {}
    });
    const data = [`email=${encodeURIComponent(testUser.email)}`, `password=${encodeURIComponent(testUser.password)}`].join('&');
    const url = 'verifyLogin';
    const fullURL = `${baseURL}${url.startsWith('/') ? '' : '/'}${url}`;
    const response = await requestContext.delete(fullURL, {
      data: data,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.responseCode).toBe(405);
    expect(responseBody.message).toBe('This request method is not supported.');
  });
  test('should verify login with invalid with status 404', { tag: '@API-10' }, async () => {
    const modifiedUser = { ...testUser, password: '123' };
    const response = await verifyLoginHelper.verify(modifiedUser);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.responseCode).toBe(404);
    expect(responseBody.message).toBe('User not found!');
  });
  test.afterEach(async () => {
    const response = await deleteAccountHelper.deleteAccount(testUser);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.responseCode).toBe(200);
    expect(responseBody.message).toBe('Account deleted!');
  });
});
