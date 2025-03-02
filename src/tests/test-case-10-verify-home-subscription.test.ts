import { test } from '@playwright/test';
import { UserData } from 'page-object-model/data/user-data';
import { blockAds } from 'page-object-model/pages/common';
import { HomePage } from 'page-object-model/pages/home';

let testUser: UserData.User;

test.describe('Test Case 10: Verify Subscription on Home Page', () => {
  test.beforeEach(async () => {
    await test.step('Setup Test Data', async () => {
      testUser = UserData.createUser();
    });
  });
  test('Submit Subscription from Home Page', async ({ page }) => {
    await test.step('Block adds in website', async () => {
      await blockAds(page);
    });
    await test.step('Navigate to the website', async () => {
      const homePage = new HomePage(page);
      await homePage.navigateTo();
    });
    await test.step('Submit Subscription', async () => {
      const homePage = new HomePage(page);
      await homePage.landedOn();
      await homePage.checkFooterForSubscription();
      await homePage.fillEmailForSubscription(testUser.email);
      await homePage.submitSubscription();
      await homePage.checkSubscriptionSuccess();
    });
    await test.step('Cleanup Test Data', async () => {
      page.close();
    });
  });
});
