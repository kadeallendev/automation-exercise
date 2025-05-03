import { AccountWorkflow } from 'page-object-model/workflows/account-workflow';
import { test } from '../../fixtures/extended-test';
import { setupUser, teardownUser } from '../../fixtures/user-management-fixture';

test.describe('Test Case 05: Register User with existing email', { tag: ['@e2e', '@TC-05'] }, () => {
  test.beforeEach(async ({ verifyLoginHelper, createAccountHelper, testUser }) => {
    await test.step('Register User via API', async () => {
      await setupUser(verifyLoginHelper, createAccountHelper, testUser);
    });
  });
  test('Register User, Log Out, Re-Register User Then Log In User to Delete', async ({ homePage, loginPage, signUpPage, testUser }) => {
    await test.step('Execute Register Existing User Workflow', async () => {
      await AccountWorkflow.RegisterExistingUser(homePage, loginPage, signUpPage, testUser);
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
