import { type Locator, type Page, expect } from '@playwright/test';
import { BasePage } from './base-page';

export class HomePage extends BasePage {
  private pageTitleMatch: RegExp;
  private baseURL: string;
  private recommendedItemsAddToCartButton: Locator;
  private recommendedItemsHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitleMatch = /.*Automation Exercise/i;
    this.baseURL = `${process.env.BASE_URL}`;
    this.recommendedItemsAddToCartButton = this.page.locator('.item > div > .product-image-wrapper > .single-products > .productinfo > .btn');
    this.recommendedItemsHeading = this.page.getByRole('heading', { name: 'recommended items' });
  }
  async navigateTo(): Promise<void> {
    await this.page.goto(this.baseURL, { waitUntil: 'domcontentloaded', timeout: 20_000 });
    await this.landedOn();
  }

  async landedOn(): Promise<void> {
    await expect(this.page).toHaveURL(this.baseURL);
    await expect(this.page).toHaveTitle(this.pageTitleMatch);
  }
  async checkForRecommendedItems(): Promise<void> {
    await expect(this.recommendedItemsHeading).toBeVisible();
  }
  async selectFirstRecommendedItemAddToCart(): Promise<void> {
    await this.recommendedItemsAddToCartButton.first().click();
  }
}

export default { HomePage };
