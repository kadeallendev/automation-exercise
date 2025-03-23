import { UserData } from 'page-object-model/data/user-data';
import { FeedbackWorkflow } from 'page-object-model/workflows/feedback-workflow';
import { test } from '../../fixtures/base-pom';

let testUser: UserData.User;

test.describe('Test Case 6: Contact Us Form', { tag: ['@e2e', '@TC-06'] }, () => {
  test.beforeEach(async () => {
    await test.step('Setup Test Data', async () => {
      testUser = UserData.createUser();
    });
  });
  test('Fill out Contact Us page and submit', async ({ homePage, contactUsPage }) => {
    await test.step('Execute Contact Us Workflow', async () => {
      await FeedbackWorkflow.SubmitFeedback(homePage, contactUsPage, testUser);
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
