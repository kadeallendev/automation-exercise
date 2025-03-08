import { ProductData } from 'page-object-model/data/product-data';
import { test } from '../fixtures/base-pom';

let testProduct: ProductData.ProductData;

test.describe('Test Case 22: Add to Cart from Recommended Items', () => {
  test.beforeEach(async () => {
    await test.step('Setup Test Data', async () => {
      const product = ProductData.getProductByName(ProductData.ProductName.BlueTop);
      testProduct = new ProductData.ProductContext(product);
    });
  });
  test('Add Recommended Item to the Cart', async ({ homePage, viewCartPage }) => {
    await test.step('Select Recommended Item', async () => {
      await homePage.landedOn();
      await homePage.checkForRecommendedItems();
      await homePage.selectFirstRecommendedItemAddToCart();
      await homePage.clickContinueShopping();
    });
    await test.step('View Cart ', async () => {
      await homePage.landedOn();
      await homePage.clickCart();
    });
    await test.step('Verify Products in Cart', async () => {
      await viewCartPage.landedOn();
      await viewCartPage.checkProductDetailInCart(testProduct);
    });
    await test.step('Cleanup Test Data', async () => {
      await homePage.getPage().close();
    });
  });
});
