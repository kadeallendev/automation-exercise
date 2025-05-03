import { AccountWorkflow } from 'page-object-model/workflows/account-workflow';
import { test } from '../../fixtures/extended-test';
import { setupUser, teardownUser } from '../../fixtures/user-management-fixture';

test.describe('Test Case 03: Login User with incorrect email', { tag: ['@e2e', '@TC-03'] }, () => {
  test.beforeEach(async ({ verifyLoginHelper, createAccountHelper, testUser }) => {
    await test.step('Register User via API', async () => {
      await setupUser(verifyLoginHelper, createAccountHelper, testUser);
    });
  });
  test('Attempt to Login with Unregistered User', async ({ homePage, loginPage, testUser }) => {
    await test.step('Execute Incorrect Log In User Workflow', async () => {
      await AccountWorkflow.IncorrectLogIn(homePage, loginPage, testUser);
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
