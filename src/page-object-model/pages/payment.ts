import { type Locator, type Page, expect } from '@playwright/test';
import { BasePage } from './base-page';

export class PaymentPage extends BasePage {
  private pageTitleMatch: RegExp;
  private baseURL: string;
  private cardOwnerInput: Locator;
  private cardNumberInput: Locator;
  private cardCvcInput: Locator;
  private cardExpiryMonthInput: Locator;
  private cardExpiryYearInput: Locator;
  private payAndConfirmOrderButton: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitleMatch = /.*Automation Exercise - Payment/i;
    this.baseURL = 'https://automationexercise.com/payment';
    this.cardOwnerInput = this.page.locator('input[name="name_on_card"]');
    this.cardNumberInput = this.page.locator('input[name="card_number"]');
    this.cardCvcInput = this.page.getByRole('textbox', { name: 'ex.' });
    this.cardExpiryMonthInput = this.page.getByRole('textbox', { name: 'MM' });
    this.cardExpiryYearInput = this.page.getByRole('textbox', { name: 'YYYY' });
    this.payAndConfirmOrderButton = this.page.getByRole('button', { name: 'Pay and Confirm Order' });
  }

  async navigateTo(): Promise<void> {
    await this.page.goto(this.baseURL, { waitUntil: 'domcontentloaded', timeout: 20_000 });
    await this.landedOn();
  }

  async landedOn(): Promise<void> {
    await expect(this.page).toHaveURL(this.baseURL);
    await expect(this.page).toHaveTitle(this.pageTitleMatch);
  }

  async enterCardOwner(cardOwner: string): Promise<void> {
    await this.cardOwnerInput.fill(cardOwner);
  }

  async enterCardNumber(cardNumber: string): Promise<void> {
    await this.cardNumberInput.fill(cardNumber);
  }

  async enterCardCvc(cardCvc: string): Promise<void> {
    await this.cardCvcInput.fill(cardCvc);
  }

  async enterCardExpiryMonth(expiryMonth: string): Promise<void> {
    await this.cardExpiryMonthInput.fill(expiryMonth);
  }

  async enterCardExpiryYear(expiryYear: string): Promise<void> {
    await this.cardExpiryYearInput.fill(expiryYear);
  }

  async clickPayAndConfirmOrder(): Promise<void> {
    await this.payAndConfirmOrderButton.click();
  }
}

export default { PaymentPage };
