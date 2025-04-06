import type { UserData } from 'page-object-model/data/user-data';
import { AccountWorkflow } from 'page-object-model/workflows/account-workflow';
import type { CreateAccountHelper } from '../../api/create-account-helper';
import type { DeleteAccountHelper } from '../../api/delete-account-helper';
import type { VerifyLoginHelper } from '../../api/verify-login-helper';
import { test as baseTest } from '../../fixtures/base-pom-fixture';
import { setupUser, teardownUser, userFixtures } from '../../fixtures/user-management-fixture';

// Extend the base test with user management fixture
const test = baseTest.extend<{
  testUser: UserData.User;
  verifyLoginHelper: VerifyLoginHelper;
  createAccountHelper: CreateAccountHelper;
  deleteAccountHelper: DeleteAccountHelper;
}>(userFixtures);

test.describe('Test Case 2: Login User with correct email and password', { tag: ['@e2e', '@TC-02'] }, () => {
  test.beforeEach(async ({ verifyLoginHelper, createAccountHelper, testUser }) => {
    await test.step('Register User via API', async () => {
      await setupUser(verifyLoginHelper, createAccountHelper, testUser);
    });
  });
  test('Log In User', async ({ homePage, loginPage, testUser }) => {
    await test.step('Execute Log In User Workflow', async () => {
      await AccountWorkflow.LogIn(homePage, loginPage, testUser);
    });
  });
  test.afterEach(async ({ verifyLoginHelper, deleteAccountHelper, testUser, homePage }) => {
    await test.step('Delete User via API if exists', async () => {
      await teardownUser(verifyLoginHelper, deleteAccountHelper, testUser);
    });
    await test.step('Close Page', async () => {
      await homePage.getPage().close();
    });
  });
});
