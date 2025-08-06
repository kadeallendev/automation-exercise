import { type Page, expect } from '@playwright/test';
import { BasePage } from './base-page';

export class TestCasesPage extends BasePage {
  private pageTitleMatch: RegExp;
  private baseURL: string;

  constructor(page: Page) {
    super(page);
    this.pageTitleMatch = /.*Automation Practice Website for UI Testing - Test Cases/i;
    this.baseURL = `${process.env.BASE_URL}test_cases`;
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
}

export default { TestCasesPage };
