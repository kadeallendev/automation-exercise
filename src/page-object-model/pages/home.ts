import { type Page, expect } from '@playwright/test';
import { BasePage } from './base-page';

export class HomePage extends BasePage {
  private pageTitleMatch: RegExp;
  private baseURL: string;

  constructor(page: Page) {
    super(page);
    this.pageTitleMatch = /.*Automation Exercise/i;
    this.baseURL = 'https://automationexercise.com/';
  }
  async navigateTo(): Promise<void> {
    await this.page.goto(this.baseURL, { waitUntil: 'domcontentloaded', timeout: 20_000 });
    await this.landedOn();
  }

  async landedOn(): Promise<void> {
    await expect(this.page).toHaveURL(this.baseURL);
    await expect(this.page).toHaveTitle(this.pageTitleMatch);
  }
}

export default { HomePage };
