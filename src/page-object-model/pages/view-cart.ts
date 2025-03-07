import { type Locator, type Page, expect } from '@playwright/test';
import type { ProductData } from 'page-object-model/data/product-data';
import { BasePage } from './base-page';

export class ViewCartPage extends BasePage {
  private pageTitleMatch: RegExp;
  private baseURL: string;
  private proceedToCheckoutButton: Locator;
  private registerLoginLink: Locator;
  private cartEmptyText: Locator;
  private returnToProductsLink: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitleMatch = /.*Automation Exercise - Checkout/i;
    this.baseURL = 'https://automationexercise.com/view_cart';
    this.proceedToCheckoutButton = this.page.getByText('Proceed To Checkout');
    this.registerLoginLink = this.page.getByRole('link', { name: 'Register / Login' });
    this.cartEmptyText = this.page.locator('b').locator('text=Cart is empty!');
    this.returnToProductsLink = this.page.getByRole('link', { name: 'here' });
  }

  private productLocator(productId: number): Locator {
    return this.page.locator(`#product-${productId}`);
  }

  async navigateTo(): Promise<void> {
    await this.page.goto(this.baseURL, { waitUntil: 'domcontentloaded', timeout: 20_000 });
    await this.landedOn();
  }

  async landedOn(): Promise<void> {
    await expect(this.page).toHaveURL(this.baseURL);
    await expect(this.page).toHaveTitle(this.pageTitleMatch);
  }

  async checkProductDetailInCart(testProduct: ProductData.ProductData): Promise<void> {
    const productLocator = this.productLocator(testProduct.product.id);
    await expect(productLocator).toContainText(testProduct.product.name);
    await expect(productLocator).toContainText(testProduct.product.category);
    await expect(productLocator).toContainText(testProduct.priceDisplayText);
    await expect(productLocator).toContainText(testProduct.product.quantity.toString());
    await expect(productLocator).toContainText(testProduct.totalDisplayText);
  }

  async clickProceedToCheckout(): Promise<void> {
    await this.proceedToCheckoutButton.click();
  }

  async clickRegisterLogin(): Promise<void> {
    await this.registerLoginLink.click();
  }

  async removeProductFromCart(index: number): Promise<void> {
    await this.productLocator(index).getByRole('cell', { name: '' }).locator('a').click();
  }

  async checkCartIsEmpty(): Promise<void> {
    await expect(this.cartEmptyText).toBeVisible();
  }

  async clickHereToReturnToProducts(): Promise<void> {
    await this.returnToProductsLink.click();
  }
}

export default { ViewCartPage };
