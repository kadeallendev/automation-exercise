import { type Page, expect } from '@playwright/test';
import type { ProductData } from 'page-object-model/data/product-data';

export class ViewCartPage {
  private page: Page;
  private pageTitleMatch: RegExp;
  private baseURL: string;

  constructor(page: Page) {
    this.page = page;
    this.pageTitleMatch = /.*Automation Exercise - Checkout/i;
    this.baseURL = 'https://automationexercise.com/view_cart';
  }
  async navigateTo(): Promise<void> {
    await this.page.goto(this.baseURL, { waitUntil: 'domcontentloaded', timeout: 20_000 });
    await this.landedOn();
  }
  async landedOn(): Promise<void> {
    await expect(this.page).toHaveURL(this.baseURL);
    await expect(this.page).toHaveTitle(this.pageTitleMatch);
  }
  async clickHome(): Promise<void> {
    await this.page.getByRole('link', { name: ' Home' }).click();
  }
  async clickProducts(): Promise<void> {
    await this.page.getByRole('link', { name: ' Products' }).click();
  }
  async checkFooterForSubscription(): Promise<void> {
    await expect(this.page.getByRole('heading')).toContainText('Subscription');
  }
  async fillEmailForSubscription(email: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Your email address' }).fill(email);
  }
  async submitSubscription(): Promise<void> {
    await this.page.getByRole('button', { name: '' }).click();
  }
  async checkSubscriptionSuccess(): Promise<void> {
    await expect(this.page.locator('#footer')).toContainText('You have been successfully subscribed!');
  }
  async checkProductDetailInCart(testProduct: ProductData.ProductData): Promise<void> {
    await expect(this.page.locator(`#product-${testProduct.product.id}`)).toContainText(testProduct.product.name);
    await expect(this.page.locator(`#product-${testProduct.product.id}`)).toContainText(testProduct.product.category);
    await expect(this.page.locator(`#product-${testProduct.product.id}`)).toContainText(testProduct.priceDisplayText);
    await expect(this.page.locator(`#product-${testProduct.product.id}`)).toContainText(testProduct.product.quantity.toString());
    await expect(this.page.locator(`#product-${testProduct.product.id}`)).toContainText(testProduct.totalDisplayText);
  }
  async clickProceedToCheckout(): Promise<void> {
    await this.page.getByText('Proceed To Checkout').click();
  }
  async clickRegisterLogin(): Promise<void> {
    await this.page.getByRole('link', { name: 'Register / Login' }).click();
  }
}
export default { ViewCartPage };
