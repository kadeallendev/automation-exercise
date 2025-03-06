import { test } from '@playwright/test';
import { blockAds } from 'page-object-model/pages/common';
import { HomePage } from 'page-object-model/pages/home';

test.describe('Test Case 18: View Category Products', () => {
  test('Filter Products based on Category', async ({ page }) => {
    await test.step('Block adds in website', async () => {
      await blockAds(page);
    });
    await test.step('Navigate to the website', async () => {
      const homePage = new HomePage(page);
      await homePage.navigateTo();
    });
    await test.step('Navigate the Test Cases Page', async () => {
      const homePage = new HomePage(page);
      await homePage.landedOn();
      await homePage.filterCategory('Women', 'Dress');
      await homePage.filterCategory('Men', 'Jeans');
      await homePage.filterCategory('Women', 'Tops');
    });
    await test.step('Cleanup Test Data', async () => {
      await page.close();
    });
  });
});
