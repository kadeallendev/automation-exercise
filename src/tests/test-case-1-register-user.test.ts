import { UserData } from 'page-object-model/data/user-data';
import { AccountWorkflow } from 'page-object-model/workflows/account-workflow';
import { test } from '../fixtures/base-pom';

let testUser: UserData.User;

test.describe('Test Case 1: Register User', () => {
  test.beforeEach(async () => {
    await test.step('Setup Test Data', async () => {
      testUser = UserData.createUser();
    });
  });
  test('Register User Then Delete', async ({ homePage, loginPage, signUpPage, accountCreatePage, deleteAccountPage }) => {
    await test.step('Execute Register User Workflow', async () => {
      await AccountWorkflow.RegisterUser(homePage, loginPage, signUpPage, accountCreatePage, testUser);
    });
    await test.step('Execute Delete Logged In User Workflow', async () => {
      await AccountWorkflow.DeleteLoggedInUser(homePage, deleteAccountPage);
    });
    await test.step('Cleanup Test Data', async () => {
      await homePage.getPage().close();
    });
  });
});
