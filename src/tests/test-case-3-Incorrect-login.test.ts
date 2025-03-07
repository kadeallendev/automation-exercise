import { UserData } from 'page-object-model/data/user-data';
import { AccountWorkflow } from 'page-object-model/workflows/account-workflow';
import { test } from '../fixtures/base-pom';

let testUser: UserData.User;

test.describe('Test Case 3: Login User with incorrect email', () => {
  test.beforeEach(async () => {
    await test.step('Setup Test Data', async () => {
      testUser = UserData.createUser();
    });
  });
  test('Attempt to Login with Unregistered User', async ({ homePage, loginPage }) => {
    await test.step('Execute Incorrect Log In User Workflow', async () => {
      await AccountWorkflow.IncorrectLogIn(homePage, loginPage, testUser);
    });
    await test.step('Cleanup Test Data', async () => {
      await homePage.getPage().close();
    });
  });
});
