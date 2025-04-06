import { UserData } from 'page-object-model/data/user-data';
import { test } from '../../fixtures/base-pom-fixture';

let testUser: UserData.User;

test.describe('Test Case 11: Verify Subscription on Cart Page', { tag: ['@e2e', '@TC-11'] }, () => {
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
