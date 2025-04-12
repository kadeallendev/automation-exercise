import { ProductData } from 'page-object-model/data/product-data';
import { test } from '../../fixtures/extended-test';

test.use({ productNames: [ProductData.ProductName.BlueTop] });

test.describe('Test Case 22: Add to Cart from Recommended Items', { tag: ['@e2e', '@TC-22'] }, () => {
  test('Add Recommended Item to the Cart', async ({ homePage, viewCartPage, testProducts }) => {
    const testProduct = testProducts[0] as ProductData.ProductData;
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
  });
  test.afterEach(async ({ homePage }) => {
    await test.step('Close Page', async () => {
      await homePage.getPage().close();
    });
  });
});
