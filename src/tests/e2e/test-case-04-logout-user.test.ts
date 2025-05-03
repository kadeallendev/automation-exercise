import { AccountWorkflow } from 'page-object-model/workflows/account-workflow';
import { test } from '../../fixtures/extended-test';
import { setupUser, teardownUser } from '../../fixtures/user-management-fixture';

test.describe('Test Case 04: Logout User', { tag: ['@e2e', '@TC-04'] }, () => {
  test.beforeEach(async ({ verifyLoginHelper, createAccountHelper, testUser }) => {
    await test.step('Register User via API', async () => {
      await setupUser(verifyLoginHelper, createAccountHelper, testUser);
    });
  });
  test('Register User, Log Out Then Log In User to Delete', async ({ homePage, loginPage, testUser }) => {
    await test.step('Execute Log In User Workflow', async () => {
      await AccountWorkflow.LogIn(homePage, loginPage, testUser);
    });
    await test.step('Execute Log Out User Workflow', async () => {
      await AccountWorkflow.LogOut(homePage, loginPage, testUser);
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
