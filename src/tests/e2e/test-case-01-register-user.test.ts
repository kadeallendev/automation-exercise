import { UserWorkflow } from 'api/workflows/user-workflow';
import { UserData } from 'page-object-model/data/user-data';
import { AccountWorkflow } from 'page-object-model/workflows/account-workflow';
import { DeleteAccountHelper } from '../../api/delete-account-helper';
import { VerifyLoginHelper } from '../../api/verify-login-helper';
import { test } from '../../fixtures/base-pom-fixture';

let testUser: UserData.User;
let verifyLoginHelper: VerifyLoginHelper;
let deleteAccountHelper: DeleteAccountHelper;

test.describe('Test Case 01: Register User', { tag: ['@e2e', '@TC-01'] }, () => {
  test.beforeAll(async () => {
    verifyLoginHelper = await VerifyLoginHelper.create();
    deleteAccountHelper = await DeleteAccountHelper.create();
  });
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
  });
  test.afterEach(async ({ homePage }) => {
    await test.step('Delete User via API if exists', async () => {
      await UserWorkflow.DeleteUserIfExists(verifyLoginHelper, deleteAccountHelper, testUser);
    });
    await test.step('Close Page', async () => {
      await homePage.getPage().close();
    });
  });
});
