import { type Page, expect } from '@playwright/test';

export class DeleteAccountPage {
  private page: Page;
  private pageTitleMatch: RegExp;
  private baseURL: string;

  constructor(page: Page) {
    this.page = page;
    this.pageTitleMatch = /.*Automation Exercise - Account Created/i; // FIXME: Update the title once title is updated
    this.baseURL = 'https://automationexercise.com/delete_account';
  }
  async navigateTo(): Promise<void> {
    await this.page.goto(this.baseURL, { waitUntil: 'domcontentloaded', timeout: 20_000 });
    await this.landedOn();
  }
  async landedOn(): Promise<void> {
    await expect(this.page).toHaveURL(this.baseURL);
    await expect(this.page).toHaveTitle(this.pageTitleMatch);
  }
  async checkAccountDeleted(): Promise<void> {
    await expect(this.page.locator('b')).toContainText('Account Deleted!');
  }
  async clickContinue(): Promise<void> {
    await this.page.getByRole('link', { name: 'Continue' }).click();
  }
}
export default { DeleteAccountPage };
