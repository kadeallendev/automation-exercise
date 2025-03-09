import { ProductData } from 'page-object-model/data/product-data';
import { test } from '../../fixtures/base-pom';

const testProducts: ProductData.ProductData[] = [];

test.describe('Test Case 12: Add Products in Cart', () => {
  test.beforeEach(async () => {
    await test.step('Setup Test Data', async () => {
      let product = ProductData.getProductByName(ProductData.ProductName.BlueTop);
      testProducts.push(new ProductData.ProductContext(product));
      product = ProductData.getProductByName(ProductData.ProductName.MenTshirt);
      testProducts.push(new ProductData.ProductContext(product));
    });
  });

  test('Add Products to the Cart and verify the Cart', async ({ homePage, productsPage, viewCartPage }) => {
    await test.step('Navigate to All Products', async () => {
      await homePage.landedOn();
      await homePage.clickProducts();
      await productsPage.landedOn();
      await productsPage.checkAllProductsForProduct(testProducts[0] as ProductData.ProductData);
    });
    await test.step('Add Products to Cart', async () => {
      await productsPage.landedOn();
      await productsPage.addToCart(0);
      await productsPage.clickContinueShopping();
      await productsPage.addToCart(1);
      await productsPage.clickViewCart();
    });
    await test.step('Verify Products in Cart', async () => {
      await viewCartPage.landedOn();
      await viewCartPage.checkProductDetailInCart(testProducts[0] as ProductData.ProductData);
      await viewCartPage.checkProductDetailInCart(testProducts[1] as ProductData.ProductData);
    });
    await test.step('Navigate to Home', async () => {
      await viewCartPage.landedOn();
      await viewCartPage.clickHome();
      await homePage.landedOn();
    });
    await test.step('Cleanup Test Data', async () => {
      await homePage.getPage().close();
    });
  });
});
