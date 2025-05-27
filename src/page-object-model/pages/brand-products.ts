import { type Locator, type Page, expect } from '@playwright/test';
import { BasePage } from './base-page';

export class BrandProductsPage extends BasePage {
  private baseURL: string;
  private brandBanner: Locator;

  constructor(page: Page) {
    super(page);
    this.baseURL = `${process.env.BASE_URL}brand_products`;
    this.brandBanner = this.page.locator('section');
  }

  private brandBannerMessage(brand: string): string {
    return `Brand - ${brand} Products`;
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

  async checkBrandBanner(brand: string): Promise<void> {
    await expect(this.brandBanner).toContainText(this.brandBannerMessage(brand));
  }

  async checkProductVisible(productName: string): Promise<void> {
    // Use first() to avoid strict mode violation if multiple elements match
    const productSelector = `text=${productName}`;
    const locator = this.page.locator(productSelector).first();
    await locator.scrollIntoViewIfNeeded();
    await expect(locator).toBeVisible();
  }
}

export default { BrandProductsPage };
