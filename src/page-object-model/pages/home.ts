import { type Page, expect } from '@playwright/test';

export class HomePage {
  private page: Page;
  private pageTitleMatch: RegExp;
  private baseURL: string;

  constructor(page: Page) {
    this.page = page;
    this.pageTitleMatch = /.*Automation Exercise/i;
    this.baseURL = 'https://automationexercise.com/';
  }
  async navigateTo(): Promise<void> {
    await this.page.goto(this.baseURL, { waitUntil: 'domcontentloaded', timeout: 30_000 });
    await this.landedOn();
  }
  async landedOn(): Promise<void> {
    await expect(this.page).toHaveURL(this.baseURL);
    await expect(this.page).toHaveTitle(this.pageTitleMatch);
  }
  async clickSignupLogin(): Promise<void> {
    await this.page.getByRole('link', { name: ' Signup / Login' }).click();
  }
  async checkUserLoggedIn(userName: string): Promise<void> {
    await expect(this.page.getByRole('link', { name: ' Logout' })).toBeVisible();
    await expect(this.page.locator('#header')).toContainText(`Logged in as ${userName}`);
  }
  async checkUserLoggedOut(): Promise<void> {
    await expect(this.page.locator('#header')).not.toContainText('Logged in as ');
  }
  async clickDeleteAccount(): Promise<void> {
    await this.page.getByRole('link', { name: ' Delete Account' }).click();
  }
  async clickLogout(): Promise<void> {
    await this.page.getByRole('link', { name: ' Logout' }).click();
  }
  async clickContactUs(): Promise<void> {
    await this.page.getByRole('link', { name: ' Contact us' }).click();
  }
  async clickTestCases(): Promise<void> {
    await this.page.getByRole('link', { name: ' Test Cases' }).click();
  }
}
export default { HomePage };
