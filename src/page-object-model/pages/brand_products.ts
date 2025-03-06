import { type Page, expect } from '@playwright/test';

export class BrandProductsPage {
  private page: Page;
  private baseURL: string;

  constructor(page: Page) {
    this.page = page;
    this.baseURL = 'https://automationexercise.com/brand_products';
  }
  async navigateTo(brand: string): Promise<void> {
    const url = `${this.baseURL}/${brand}`;
    await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20_000 });
    await this.landedOn(brand);
  }
  async landedOn(brand: string): Promise<void> {
    const url = `${this.baseURL}/${brand}`;
    const pageTitleMatch = new RegExp(`.*Automation Exercise - ${brand} Products`, 'i');
    await expect(this.page).toHaveURL(url);
    await expect(this.page).toHaveTitle(pageTitleMatch);
  }
  async clickProducts(): Promise<void> {
    await this.page.getByRole('link', { name: ' Products' }).click();
  }
  async clickHome(): Promise<void> {
    await this.page.getByRole('link', { name: ' Home' }).click();
  }
  async checkBrandBanner(brand: string): Promise<void> {
    await expect(this.page.locator('section')).toContainText(`Brand - ${brand} Products`);
  }
}
export default { BrandProductsPage };
