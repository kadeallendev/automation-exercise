import { test } from '@playwright/test';
import { ProductData } from 'page-object-model/data/product-data';
import { blockAds } from 'page-object-model/pages/common';
import { HomePage } from 'page-object-model/pages/home';
import { ProductDetailsPage } from 'page-object-model/pages/product-details';
import { ProductsPage } from 'page-object-model/pages/products';
import { ViewCartPage } from 'page-object-model/pages/view-cart';

let testProduct: ProductData.ProductData;

test.describe('Test Case 13: Verify Product Quantity correct in Cart page', () => {
  test.beforeEach(async () => {
    await test.step('Setup Test Data', async () => {
      const product = ProductData.getProductByName(ProductData.ProductName.StylishDress);
      testProduct = new ProductData.ProductContext(product);
      testProduct.product.quantity = 4;
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
    await test.step('View Product Details', async () => {
      const productsPage = new ProductsPage(page);
      await productsPage.clickViewProductOnAllProducts(testProduct.product.id);
      const productDetailsPage = new ProductDetailsPage(page);
      await productDetailsPage.landedOn();
      await productDetailsPage.checkProductDetailsForProduct(testProduct);
    });
    await test.step('Increase Quantity', async () => {
      const productDetailsPage = new ProductDetailsPage(page);
      await productDetailsPage.landedOn();
      await productDetailsPage.setQuantity(testProduct);
    });
    await test.step('Add to Cart', async () => {
      const productDetailsPage = new ProductDetailsPage(page);
      await productDetailsPage.landedOn();
      await productDetailsPage.addToCart();
    });
    await test.step('View Cart ', async () => {
      const productDetailsPage = new ProductDetailsPage(page);
      await productDetailsPage.landedOn();
      await productDetailsPage.clickViewCart();
    });
    await test.step('Verify Products in Cart', async () => {
      const viewCartPage = new ViewCartPage(page);
      await viewCartPage.landedOn();
      await viewCartPage.checkProductDetailInCart(testProduct);
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
