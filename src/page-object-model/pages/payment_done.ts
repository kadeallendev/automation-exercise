import { type Locator, type Page, expect } from '@playwright/test';
import { BasePage } from './base-page';

export class PaymentDonePage extends BasePage {
  private pageTitleMatch: RegExp;
  private baseURLPattern: RegExp;
  private baseURL: string;
  private orderPlacedText: Locator;
  private congratulationsText: Locator;
  private continueButton: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitleMatch = /.*Automation Exercise - Order Placed/i;
    this.baseURLPattern = /https:\/\/automationexercise\.com\/payment_done\/\d+/i;
    this.baseURL = 'https://automationexercise.com/payment_done';
    this.orderPlacedText = this.page.getByText('Order Placed!');
    this.congratulationsText = this.page.getByText('Congratulations! Your order');
    this.continueButton = this.page.getByRole('link', { name: 'Continue' });
  }

  async navigateTo(index: number): Promise<void> {
    const url = `${this.baseURL}/${index}`;
    await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20_000 });
    await this.landedOn();
  }

  async landedOn(): Promise<void> {
    await expect(this.page).toHaveURL(this.baseURLPattern);
    await expect(this.page).toHaveTitle(this.pageTitleMatch);
  }

  async checkOrderPlaced(): Promise<void> {
    await expect(this.orderPlacedText).toBeVisible();
    await expect(this.congratulationsText).toBeVisible();
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }
}

export default { PaymentDonePage };
