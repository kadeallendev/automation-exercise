import { UserData } from 'page-object-model/data/user-data';
import { AccountWorkflow } from 'page-object-model/workflows/account-workflow';
import { test } from '../../fixtures/base-pom';

let testUser: UserData.User;

test.describe('Test Case 3: Login User with incorrect email', { tag: ['@e2e', '@TC-03'] }, () => {
  test.beforeEach(async () => {
    await test.step('Setup Test Data', async () => {
      testUser = UserData.createUser();
    });
  });
  test('Attempt to Login with Unregistered User', async ({ homePage, loginPage }) => {
    await test.step('Execute Incorrect Log In User Workflow', async () => {
      await AccountWorkflow.IncorrectLogIn(homePage, loginPage, testUser);
    });
  });
  test.afterEach(async ({ homePage }) => {
    await test.step('Delete User if Logged In', async () => {
      if (await homePage.isUserLoggedIn()) {
        await homePage.clickDeleteAccount();
      }
    });
    await test.step('Close Page', async () => {
      await homePage.getPage().close();
    });
  });
});
