import { type Page, expect } from '@playwright/test';
import type { ProductData } from 'page-object-model/data/product-data';

export class ProductDetailsPage {
  private page: Page;
  private pageTitleMatch: RegExp;
  private baseURLPattern: RegExp;
  private baseURL: string;

  constructor(page: Page) {
    this.page = page;
    this.pageTitleMatch = /.*Automation Exercise - Product Details/i;
    this.baseURLPattern = /https:\/\/automationexercise\.com\/product_details\/\d+/i;
    this.baseURL = 'https://automationexercise.com/product_details/';
  }
  async navigateTo(index: number): Promise<void> {
    const url = `${this.baseURL}/${index}`;
    await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20_000 });
    await this.landedOn();
  }
  async landedOn(): Promise<void> {
    await expect(this.page).toHaveURL(this.baseURLPattern);
    await expect(this.page).toHaveTitle(this.pageTitleMatch);
  }
  async clickProducts(): Promise<void> {
    await this.page.getByRole('link', { name: ' Products' }).click();
  }
  async checkProductDetailsForProduct(testProduct: ProductData.ProductData): Promise<void> {
    await expect(this.page.locator('section')).toContainText(testProduct.product.name);
    await expect(this.page.locator('section')).toContainText(testProduct.categoryDisplayText);
    await expect(this.page.locator('section')).toContainText(testProduct.priceDisplayText);
    await expect(this.page.locator('section')).toContainText(testProduct.availabilityDisplayText);
    await expect(this.page.locator('section')).toContainText(testProduct.conditionDisplayText);
    await expect(this.page.locator('section')).toContainText(testProduct.brandDisplayText);
  }
  async setQuantity(testProduct: ProductData.ProductData): Promise<void> {
    const quantity = String(testProduct.product.quantity);
    await this.page.locator('#quantity').fill(quantity);
    await expect(this.page.locator('#quantity')).toHaveValue(quantity);
  }
  async clickContinueShopping(): Promise<void> {
    await this.page.getByRole('button', { name: 'Continue Shopping' }).click();
  }
  async clickViewCart(): Promise<void> {
    await this.page.getByRole('link', { name: 'View Cart' }).click();
  }
  async addToCart(): Promise<void> {
    await this.page.getByRole('button', { name: ' Add to cart' }).click();
  }
}
export default { ProductDetailsPage };
