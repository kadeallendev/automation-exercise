import { type Locator, type Page, expect } from '@playwright/test';
import { BasePage } from './base-page';

export class AccountCreatePage extends BasePage {
  private pageTitleMatch: RegExp;
  private baseURL: string;
  private accountCreatedText: Locator;
  private continueButton: Locator;
  private accountCreatedMessage: string;

  constructor(page: Page) {
    super(page);
    this.pageTitleMatch = /.*Automation Exercise - Account Created/i; // FIXME: Update the title once title is updated
    this.baseURL = `${process.env.BASE_URL}account_created`;
    this.accountCreatedText = this.page.locator('b');
    this.continueButton = this.page.getByRole('link', { name: 'Continue' });
    this.accountCreatedMessage = 'Account Created!';
  }

  async navigateTo(): Promise<void> {
    await this.page.goto(this.baseURL, { waitUntil: 'domcontentloaded', timeout: 20_000 });
    await this.landedOn();
  }

  async landedOn(): Promise<void> {
    await expect(this.page).toHaveURL(this.baseURL);
    await expect(this.page).toHaveTitle(this.pageTitleMatch);
  }

  async checkAccountCreated(): Promise<void> {
    await expect(this.accountCreatedText).toContainText(this.accountCreatedMessage);
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }
}

export default { AccountCreatePage };
