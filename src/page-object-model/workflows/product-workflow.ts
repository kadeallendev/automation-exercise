import test from '@playwright/test';
import type { ProductData } from 'page-object-model/data/product-data';
import type { HomePage } from 'page-object-model/pages/home';
import type { ProductDetailsPage } from 'page-object-model/pages/product-details';
import type { ProductsPage } from 'page-object-model/pages/products';

export namespace ProductWorkflow {
  export async function navigateToAllProducts(homePage: HomePage, productsPage: ProductsPage, testProduct: ProductData.ProductData): Promise<void> {
    await homePage.landedOn();
    await homePage.clickProducts();
    await productsPage.landedOn();
    await productsPage.checkAllProductsForProduct(testProduct);
  }
  export async function viewFirstProductDetails(productsPage: ProductsPage, productDetailsPage: ProductDetailsPage, testProduct: ProductData.ProductData): Promise<void> {
    await productsPage.clickFirstViewProductOnAllProducts();
    await productDetailsPage.landedOn();
    await productDetailsPage.checkProductDetailsForProduct(testProduct);
  }
  export async function viewProductDetails(productsPage: ProductsPage, productDetailsPage: ProductDetailsPage, testProduct: ProductData.ProductData): Promise<void> {
    await productsPage.clickViewProductOnAllProducts(testProduct.product.id);
    await productDetailsPage.landedOn();
    await productDetailsPage.checkProductDetailsForProduct(testProduct);
  }
  export async function navigateBackToAllProducts(productDetailsPage: ProductDetailsPage, productsPage: ProductsPage, testProduct: ProductData.ProductData): Promise<void> {
    await productDetailsPage.clickProducts();
    await productsPage.landedOn();
    await productsPage.checkAllProductsForProduct(testProduct);
  }
  export async function increaseQuantityAddToCart(productDetailsPage: ProductDetailsPage, testProduct: ProductData.ProductData): Promise<void> {
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
  }
}
export default { ProductWorkflow };
