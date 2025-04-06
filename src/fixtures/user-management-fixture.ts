import { UserData } from 'page-object-model/data/user-data';
import { CreateAccountHelper } from '../api/create-account-helper';
import { DeleteAccountHelper } from '../api/delete-account-helper';
import { VerifyLoginHelper } from '../api/verify-login-helper';
import { UserWorkflow } from '../api/workflows/user-workflow';

export const userFixtures = {
  // biome-ignore lint/correctness/noEmptyPattern: <explanation>
  testUser: async ({}, use: (user: UserData.User) => Promise<void>) => {
    const testUser = UserData.createUser();
    await use(testUser);
  },
  // biome-ignore lint/correctness/noEmptyPattern: <explanation>
  verifyLoginHelper: async ({}, use: (helper: VerifyLoginHelper) => Promise<void>) => {
    const verifyLoginHelper = await VerifyLoginHelper.create();
    await use(verifyLoginHelper);
  },
  // biome-ignore lint/correctness/noEmptyPattern: <explanation>
  createAccountHelper: async ({}, use: (helper: CreateAccountHelper) => Promise<void>) => {
    const createAccountHelper = await CreateAccountHelper.create();
    await use(createAccountHelper);
  },
  // biome-ignore lint/correctness/noEmptyPattern: <explanation>
  deleteAccountHelper: async ({}, use: (helper: DeleteAccountHelper) => Promise<void>) => {
    const deleteAccountHelper = await DeleteAccountHelper.create();
    await use(deleteAccountHelper);
  }
};
export async function setupUser(verifyLoginHelper: VerifyLoginHelper, createAccountHelper: CreateAccountHelper, testUser: UserData.User) {
  await UserWorkflow.CreateUserIfNotExists(verifyLoginHelper, createAccountHelper, testUser);
}

export async function teardownUser(verifyLoginHelper: VerifyLoginHelper, deleteAccountHelper: DeleteAccountHelper, testUser: UserData.User) {
  await UserWorkflow.DeleteUserIfExists(verifyLoginHelper, deleteAccountHelper, testUser);
}
