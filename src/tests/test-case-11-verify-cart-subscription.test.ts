import { UserData } from 'page-object-model/data/user-data';
import { test } from '../fixtures/base-pom';

let testUser: UserData.User;

test.describe('Test Case 11: Verify Subscription on Cart Page', () => {
  test.beforeEach(async () => {
    await test.step('Setup Test Data', async () => {
      testUser = UserData.createUser();
    });
  });
  test('Submit Subscription from Cart Page', async ({ homePage, viewCartPage }) => {
    await test.step('Navigate to User Cart', async () => {
      await homePage.landedOn();
      await homePage.clickCart();
      await viewCartPage.landedOn();
    });
    await test.step('Submit Subscription', async () => {
      await viewCartPage.landedOn();
      await viewCartPage.checkFooterForSubscription();
      await viewCartPage.fillEmailForSubscription(testUser.email);
      await viewCartPage.submitSubscription();
      await viewCartPage.checkSubscriptionSuccess();
    });
    await test.step('Navigate to Home', async () => {
      await viewCartPage.landedOn();
      await viewCartPage.clickHome();
      await homePage.landedOn();
    });
    await test.step('Cleanup Test Data', async () => {
      await homePage.getPage().close();
    });
  });
});
