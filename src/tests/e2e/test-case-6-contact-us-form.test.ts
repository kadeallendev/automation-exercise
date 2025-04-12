import { FeedbackWorkflow } from 'page-object-model/workflows/feedback-workflow';
import { test } from '../../fixtures/extended-test';
import { setupUser, teardownUser } from '../../fixtures/user-management-fixture';

test.describe('Test Case 6: Contact Us Form', { tag: ['@e2e', '@TC-06'] }, () => {
  test.beforeEach(async ({ verifyLoginHelper, createAccountHelper, testUser }) => {
    await test.step('Register User via API', async () => {
      await setupUser(verifyLoginHelper, createAccountHelper, testUser);
    });
  });
  test('Fill out Contact Us page and submit', async ({ homePage, contactUsPage, testUser }) => {
    await test.step('Execute Contact Us Workflow', async () => {
      await FeedbackWorkflow.SubmitFeedback(homePage, contactUsPage, testUser);
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
