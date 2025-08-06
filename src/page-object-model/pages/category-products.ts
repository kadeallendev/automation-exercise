import { type Locator, type Page, expect } from '@playwright/test';
import type { ProductData } from 'page-object-model/data/product-data';
import { BasePage } from './base-page';

export class CategoryProductsPage extends BasePage {
  private baseURL: string;
  private categoryBanner: Locator;

  constructor(page: Page) {
    super(page);
    this.baseURL = `${process.env.BASE_URL}category_products`;
    this.categoryBanner = this.page.locator('section');
  }

  private categoryBannerMessage(filter: ProductData.ProductCategoryFilter): string {
    return `${filter.category} - ${filter.subCategory} Products`;
  }

  async navigateTo(filter: ProductData.ProductCategoryFilter): Promise<void> {
    const url = `${this.baseURL}/${filter.id}`;
    await this.page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: 20_000
    });
    await this.landedOn(filter);
  }

  async landedOn(filter: ProductData.ProductCategoryFilter): Promise<void> {
    const url = `${this.baseURL}/${filter.id}`;
    const pageTitleMatch = new RegExp(`.*Automation Exercise - ${filter.subCategory} Products`, 'i');
    await expect(this.page).toHaveURL(url);
    await expect(this.page).toHaveTitle(pageTitleMatch);
  }

  async checkBrandBanner(filter: ProductData.ProductCategoryFilter): Promise<void> {
    await expect(this.categoryBanner).toContainText(this.categoryBannerMessage(filter));
  }

  async checkProductVisible(productName: string): Promise<void> {
    // Use first() to avoid strict mode violation if multiple elements match
    const productSelector = `text=${productName}`;
    const locator = this.page.locator(productSelector).first();
    await locator.scrollIntoViewIfNeeded();
    await expect(locator).toBeVisible();
  }
}

export default { CategoryProductsPage };
