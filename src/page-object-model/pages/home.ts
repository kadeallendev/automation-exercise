import { type Locator, type Page, expect } from '@playwright/test';
import { BasePage } from './base-page';

export class HomePage extends BasePage {
  private automationLink: Locator;
  private baseURL: string;
  private footerText: Locator;
  private headerText: Locator;
  private pageTitleMatch: RegExp;
  private recommendedItemsAddToCartButton: Locator;
  private recommendedItemsHeading: Locator;
  private subscriptionHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.baseURL = `${process.env.BASE_URL}`;
    this.pageTitleMatch = /.*Automation Exercise/i;
    this.automationLink = this.page.getByRole('link', {
      name: 'Website for automation'
    });
    this.footerText = this.page.getByText('Copyright © 2021 All rights');
    this.headerText = this.page.getByRole('heading', {
      name: 'Full-Fledged practice website'
    });
    this.recommendedItemsAddToCartButton = this.page.locator('.item > div > .product-image-wrapper > .single-products > .productinfo > .btn');
    this.recommendedItemsHeading = this.page.getByRole('heading', {
      name: 'recommended items'
    });
    this.subscriptionHeading = this.page.getByRole('heading', {
      name: 'Subscription'
    });
  }

  async navigateTo(): Promise<void> {
    await this.page.goto(this.baseURL, {
      waitUntil: 'domcontentloaded',
      timeout: 20_000
    });
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

  async scrollDownToFooter(): Promise<void> {
    await this.footerText.scrollIntoViewIfNeeded();
    await expect(this.subscriptionHeading).toBeInViewport();
  }

  async scrollUpToHeader(): Promise<void> {
    await this.headerText.scrollIntoViewIfNeeded();
    await expect(this.automationLink).toBeInViewport();
  }
}

export default { HomePage };
