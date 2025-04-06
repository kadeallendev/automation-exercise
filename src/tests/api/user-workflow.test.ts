import { test } from '@playwright/test';
import { UserData } from 'page-object-model/data/user-data';
import { CreateAccountHelper } from '../../api/create-account-helper';
import { DeleteAccountHelper } from '../../api/delete-account-helper';
import { VerifyLoginHelper } from '../../api/verify-login-helper';
import { UserWorkflow } from '../../api/workflows/user-workflow';

test.describe('User API Tests', () => {
  let verifyLoginHelper: VerifyLoginHelper;
  let createAccountHelper: CreateAccountHelper;
  let deleteAccountHelper: DeleteAccountHelper;
  let testUser: UserData.User;

  test.beforeAll(async () => {
    verifyLoginHelper = await VerifyLoginHelper.create();
    createAccountHelper = await CreateAccountHelper.create();
    deleteAccountHelper = await DeleteAccountHelper.create();
  });

  test.beforeEach(async () => {
    testUser = UserData.createUser();
  });

  test('should create user and verify login with status 200', async () => {
    // Ensure the user is created if it doesn't exist
    await UserWorkflow.CreateUserIfNotExists(verifyLoginHelper, createAccountHelper, testUser);

    // Verify the user exists
    await UserWorkflow.VerifyUserExists(verifyLoginHelper, testUser);
  });
  test.afterEach(async () => {
    await UserWorkflow.DeleteUserIfExists(verifyLoginHelper, deleteAccountHelper, testUser);
  });
});
