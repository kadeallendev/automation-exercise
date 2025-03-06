import { test } from '@playwright/test';
import { ProductData } from 'page-object-model/data/product-data';
import { blockAds } from 'page-object-model/pages/common';
import { HomePage } from 'page-object-model/pages/home';
import { ProductDetailsPage } from 'page-object-model/pages/product-details';
import { ProductsPage } from 'page-object-model/pages/products';

let testProduct: ProductData.ProductData;

test.describe('Test Case 9: Search Product', () => {
  test.beforeEach(async () => {
    await test.step('Setup Test Data', async () => {
      const product = ProductData.getProductByName(ProductData.ProductName.SleevelessDress);
      testProduct = new ProductData.ProductContext(product);
    });
  });

  test('Navigation to the Test Cases Page', async ({ page }) => {
    await test.step('Block adds in website', async () => {
      await blockAds(page);
    });
    await test.step('Navigate to the website', async () => {
      const homePage = new HomePage(page);
      await homePage.navigateTo();
    });
    await test.step('Navigate to All Products', async () => {
      const homePage = new HomePage(page);
      await homePage.landedOn();
      await homePage.clickProducts();
      const productsPage = new ProductsPage(page);
      await productsPage.landedOn();
      await productsPage.checkAllProductsForProduct(testProduct);
    });
    await test.step('Search Product', async () => {
      const productsPage = new ProductsPage(page);
      await productsPage.searchForProduct(testProduct.product.name);
    });
    await test.step('View Product Details', async () => {
      const productsPage = new ProductsPage(page);
      await productsPage.clickFirstProductOnSearchedProducts();
      const productDetailsPage = new ProductDetailsPage(page);
      await productDetailsPage.landedOn();
      await productDetailsPage.checkProductDetailsForProduct(testProduct);
    });
    await test.step('Navigate to All Products', async () => {
      const productDetailsPage = new ProductDetailsPage(page);
      await productDetailsPage.clickProducts();
      const productsPage = new ProductsPage(page);
      await productsPage.landedOn();
      await productsPage.checkAllProductsForProduct(testProduct);
    });
    await test.step('Cleanup Test Data', async () => {
      await page.close();
    });
  });
});
