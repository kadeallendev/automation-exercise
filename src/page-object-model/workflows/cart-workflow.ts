import type { ProductData } from 'page-object-model/data/product-data';
import type { ProductsPage } from 'page-object-model/pages/products';
import type { ViewCartPage } from 'page-object-model/pages/view-cart';

export namespace CartWorkflow {
  export async function addTwoProductsToCart(page: ProductsPage, testProduct1: ProductData.ProductData, testProduct2: ProductData.ProductData): Promise<void> {
    await page.landedOn();
    await page.addToCart(testProduct1.product.id - 1);
    await page.clickContinueShopping();
    await page.addToCart(testProduct2.product.id - 1);
    await page.clickViewCart();
  }
  export async function verifyProductsInCart(page: ViewCartPage, testProduct1: ProductData.ProductData, testProduct2: ProductData.ProductData): Promise<void> {
    await page.landedOn();
    await page.checkProductDetailInCart(testProduct1);
    await page.checkProductDetailInCart(testProduct2);
  }
  export async function verifyProductInCart(page: ViewCartPage, testProduct: ProductData.ProductData): Promise<void> {
    await page.landedOn();
    await page.checkProductDetailInCart(testProduct);
  }
}
export default { CartWorkflow };
