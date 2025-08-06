import { type Locator, type Page, expect } from '@playwright/test';
import { BasePage } from './base-page';

export class DeleteAccountPage extends BasePage {
  private pageTitleMatch: RegExp;
  private baseURL: string;
  private accountDeletedMessage: string;
  private accountDeletedText: Locator;
  private continueButton: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitleMatch = /.*Automation Exercise - Account Created/i; // FIXME: Update the title once title is updated
    this.baseURL = `${process.env.BASE_URL}delete_account`;
    this.accountDeletedMessage = 'Account Deleted!';
    this.accountDeletedText = this.page.locator('b');
    this.continueButton = this.page.getByRole('link', { name: 'Continue' });
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

  async checkAccountDeleted(): Promise<void> {
    await expect(this.accountDeletedText).toContainText(this.accountDeletedMessage);
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }
}

export default { DeleteAccountPage };
