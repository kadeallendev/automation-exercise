import { test } from '@playwright/test';
import { ProductData } from 'page-object-model/data/product-data';
import { blockAds } from 'page-object-model/pages/common';
import { HomePage } from 'page-object-model/pages/home';
import { ProductsPage } from 'page-object-model/pages/products';
import { ViewCartPage } from 'page-object-model/pages/view-cart';

const testProducts: ProductData.ProductData[] = [];

test.describe('Test Case 8: Verify All Products and product detail page', () => {
  test.beforeEach(async () => {
    await test.step('Setup Test Data', async () => {
      let product = ProductData.getProductByName(ProductData.ProductName.BlueTop);
      testProducts.push(new ProductData.ProductContext(product));
      product = ProductData.getProductByName(ProductData.ProductName.MenTshirt);
      testProducts.push(new ProductData.ProductContext(product));
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
      await productsPage.checkAllProductsForProduct(testProducts[0] as ProductData.ProductData);
    });
    await test.step('Add Products to Cart', async () => {
      const productsPage = new ProductsPage(page);
      await productsPage.landedOn();
      await productsPage.addToCart(0);
      await productsPage.clickContinueShopping();
      await productsPage.addToCart(1);
      await productsPage.clickViewCart();
    });
    await test.step('Verify Products in Cart', async () => {
      const viewCartPage = new ViewCartPage(page);
      await viewCartPage.landedOn();
      await viewCartPage.checkProductDetailInCart(testProducts[0] as ProductData.ProductData);
      await viewCartPage.checkProductDetailInCart(testProducts[1] as ProductData.ProductData);
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
