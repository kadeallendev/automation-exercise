import { UserData } from 'page-object-model/data/user-data';
import { FeedbackWorkflow } from 'page-object-model/workflows/feedback-workflow';
import { test } from '../../fixtures/base-pom';

let testUser: UserData.User;

test.describe('Test Case 6: Contact Us Form', () => {
  test.beforeEach(async () => {
    await test.step('Setup Test Data', async () => {
      testUser = UserData.createUser();
    });
  });
  test('Fill out Contact Us page and submit', async ({ homePage, contactUsPage }) => {
    await test.step('Execute Contact Us Workflow', async () => {
      await FeedbackWorkflow.SubmitFeedback(homePage, contactUsPage, testUser);
    });
    await test.step('Cleanup Test Data', async () => {
      await homePage.getPage().close();
    });
  });
});
