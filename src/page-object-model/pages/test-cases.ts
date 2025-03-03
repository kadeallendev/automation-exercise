import { type Page, expect } from '@playwright/test';

export class TestCasesPage {
  private page: Page;
  private pageTitleMatch: RegExp;
  private baseURL: string;

  constructor(page: Page) {
    this.page = page;
    this.pageTitleMatch = /.*Automation Practice Website for UI Testing - Test Cases/i;
    this.baseURL = 'https://automationexercise.com/test_cases';
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
}
export default { TestCasesPage };
