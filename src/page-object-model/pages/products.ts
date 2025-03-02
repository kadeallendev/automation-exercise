import { type Page, expect } from '@playwright/test';
import type { ProductData } from 'page-object-model/data/product-data';

export class ProductsPage {
  private page: Page;
  private pageTitleMatch: RegExp;
  private baseURL: string;

  constructor(page: Page) {
    this.page = page;
    this.pageTitleMatch = /.*Automation Exercise - All Products/i;
    this.baseURL = 'https://automationexercise.com/products';
  }
  async navigateTo(): Promise<void> {
    await this.page.goto(this.baseURL, { waitUntil: 'domcontentloaded', timeout: 30_000 });
    await this.landedOn();
  }
  async landedOn(): Promise<void> {
    await expect(this.page).toHaveURL(this.baseURL);
    await expect(this.page).toHaveTitle(this.pageTitleMatch);
  }
  async checkAllProductsForProduct(testProduct: ProductData.ProductData): Promise<void> {
    await expect(this.page.locator('body')).toContainText('All Products');
    await expect(this.page.locator('body')).toContainText(testProduct.product.name);
  }
  async clickFirstProductOnAllProducts(): Promise<void> {
    await this.page.locator('.choose > .nav > li > a').first().click();
  }
  async searchForProduct(productName: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Search Product' }).fill(productName);
    await this.page.getByRole('button', { name: '' }).click();
    await expect(this.page.locator('body')).toContainText('Searched Products');
    await expect(this.page.getByText(productName).nth(1)).toBeVisible();
  }
  async clickFirstProductOnSearchedProducts(): Promise<void> {
    await this.page.locator('.choose > .nav > li > a').first().click();
  }
  async clickContinueShopping(): Promise<void> {
    await this.page.getByRole('button', { name: 'Continue Shopping' }).click();
  }
  async clickViewCart(): Promise<void> {
    await this.page.getByRole('link', { name: 'View Cart' }).click();
  }
  async addToCart(index = 0): Promise<void> {
    await this.page.locator('.productinfo > img').nth(index).hover();
    await this.page.locator('.overlay-content > .btn').nth(index).waitFor({ state: 'visible' });
    await this.page.locator('.overlay-content > .btn').nth(index).click();
  }
}
export default { ProductsPage };
