import { ProductData } from 'page-object-model/data/product-data';
import { test } from '../fixtures/base-pom';

let testProduct: ProductData.ProductData;

test.describe('Test Case 13: Verify Product Quantity correct in Cart page', () => {
  test.beforeEach(async () => {
    await test.step('Setup Test Data', async () => {
      const product = ProductData.getProductByName(ProductData.ProductName.StylishDress);
      testProduct = new ProductData.ProductContext(product);
      testProduct.product.quantity = 4;
    });
  });

  test('Add Products to Cart and Verify Quantity is Correct', async ({ homePage, productsPage, productDetailsPage, viewCartPage }) => {
    await test.step('Navigate to All Products', async () => {
      await homePage.landedOn();
      await homePage.clickProducts();
      await productsPage.landedOn();
      await productsPage.checkAllProductsForProduct(testProduct);
    });
    await test.step('View Product Details', async () => {
      await productsPage.clickViewProductOnAllProducts(testProduct.product.id);
      await productDetailsPage.landedOn();
      await productDetailsPage.checkProductDetailsForProduct(testProduct);
    });
    await test.step('Increase Quantity', async () => {
      await productDetailsPage.landedOn();
      await productDetailsPage.setQuantity(testProduct);
    });
    await test.step('Add to Cart', async () => {
      await productDetailsPage.landedOn();
      await productDetailsPage.addToCart();
    });
    await test.step('View Cart ', async () => {
      await productDetailsPage.landedOn();
      await productDetailsPage.clickViewCart();
    });
    await test.step('Verify Products in Cart', async () => {
      await viewCartPage.landedOn();
      await viewCartPage.checkProductDetailInCart(testProduct);
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
