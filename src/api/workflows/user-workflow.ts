import test from '@playwright/test';
import type { UserData } from 'page-object-model/data/user-data';
import type { CreateAccountHelper } from '../create-account-helper';
import type { DeleteAccountHelper } from '../delete-account-helper';
import type { VerifyLoginHelper } from '../verify-login-helper';

export namespace UserWorkflow {
  export async function VerifyUserExists(verifyLoginHelper: VerifyLoginHelper, testUser: UserData.User) {
    await test.step('Verify User Exists via API', async () => {
      const response = await verifyLoginHelper.verify(testUser);
      test.expect(response.status()).toBe(200);
      const responseBody = await response.json();
      test.expect(responseBody.responseCode).toBe(200);
      test.expect(responseBody.message).toBe('User exists!');
    });
  }

  export async function DeleteUserIfExists(verifyLoginHelper: VerifyLoginHelper, deleteAccountHelper: DeleteAccountHelper, testUser: UserData.User) {
    await test.step('Delete User via API if exists', async () => {
      const verifyResponse = await verifyLoginHelper.verify(testUser);
      test.expect(verifyResponse.status()).toBe(200);
      const verifyResponseBody = await verifyResponse.json();

      if (verifyResponseBody.responseCode === 200 && verifyResponseBody.message === 'User exists!') {
        console.log('User exists. Proceeding to delete the account.');

        const deleteResponse = await deleteAccountHelper.deleteAccount(testUser);
        test.expect(deleteResponse.status()).toBe(200);
        const deleteResponseBody = await deleteResponse.json();
        test.expect(deleteResponseBody.responseCode).toBe(200);
        test.expect(deleteResponseBody.message).toBe('Account deleted!');
      } else {
        console.log('User does not exist. Skipping account deletion.');
      }
    });
  }
  export async function CreateUserIfNotExists(verifyLoginHelper: VerifyLoginHelper, createAccountHelper: CreateAccountHelper, testUser: UserData.User) {
    await test.step('Create User via API if not exists', async () => {
      const verifyResponse = await verifyLoginHelper.verify(testUser);
      test.expect(verifyResponse.status()).toBe(200);
      const verifyResponseBody = await verifyResponse.json();

      if (verifyResponseBody.responseCode === 404 || verifyResponseBody.message === 'User not found!') {
        console.log('User does not exist. Proceeding to create the account.');

        const createResponse = await createAccountHelper.register(testUser);
        test.expect(createResponse.status()).toBe(200);
        const createResponseBody = await createResponse.json();
        test.expect(createResponseBody.responseCode).toBe(201);
        test.expect(createResponseBody.message).toBe('User created!');
      } else {
        console.log('User already exists. Skipping account creation.');
      }
    });
  }
}
