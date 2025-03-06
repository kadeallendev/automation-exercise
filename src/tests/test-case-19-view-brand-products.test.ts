import { test } from '@playwright/test';
import { ProductData } from 'page-object-model/data/product-data';
import { BrandProductsPage } from 'page-object-model/pages/brand_products';
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
      await homePage.filterBrand(ProductData.ProductBrand.Polo);
      const brandProductsPage = new BrandProductsPage(page);
      await brandProductsPage.landedOn(ProductData.ProductBrand.Polo);
      await brandProductsPage.checkBrandBanner(ProductData.ProductBrand.Polo);
      await brandProductsPage.clickHome();
      await homePage.filterBrand(ProductData.ProductBrand.Madame);
      await brandProductsPage.landedOn(ProductData.ProductBrand.Madame);
      await brandProductsPage.checkBrandBanner(ProductData.ProductBrand.Madame);
      await brandProductsPage.clickHome();
    });
    await test.step('Cleanup Test Data', async () => {
      await page.close();
    });
  });
});
