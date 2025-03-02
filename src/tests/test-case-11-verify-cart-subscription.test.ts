import { test } from '@playwright/test';
import { UserData } from 'page-object-model/data/user-data';
import { blockAds } from 'page-object-model/pages/common';
import { HomePage } from 'page-object-model/pages/home';
import { ViewCartPage } from 'page-object-model/pages/view-cart';

let testUser: UserData.User;

test.describe('Test Case 11: Verify Subscription on Cart Page', () => {
  test.beforeEach(async () => {
    await test.step('Setup Test Data', async () => {
      testUser = UserData.createUser();
    });
  });
  test('Submit Subscription from Cart Page', async ({ page }) => {
    await test.step('Block adds in website', async () => {
      await blockAds(page);
    });
    await test.step('Navigate to the website', async () => {
      const homePage = new HomePage(page);
      await homePage.navigateTo();
    });
    await test.step('Navigate to User Cart', async () => {
      const homePage = new HomePage(page);
      await homePage.landedOn();
      await homePage.clickCart();
      const viewCartPage = new ViewCartPage(page);
      await viewCartPage.landedOn();
    });
    await test.step('Submit Subscription', async () => {
      const viewCartPage = new ViewCartPage(page);
      await viewCartPage.landedOn();
      await viewCartPage.checkFooterForSubscription();
      await viewCartPage.fillEmailForSubscription(testUser.email);
      await viewCartPage.submitSubscription();
      await viewCartPage.checkSubscriptionSuccess();
    });
    await test.step('Navigate to Home', async () => {
      const viewCartPage = new ViewCartPage(page);
      await viewCartPage.landedOn();
      await viewCartPage.clickHome();
      const homePage = new HomePage(page);
      await homePage.landedOn();
    });
    await test.step('Cleanup Test Data', async () => {
      page.close();
    });
  });
});
