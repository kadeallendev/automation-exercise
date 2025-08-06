import { type Locator, type Page, expect } from '@playwright/test';
import { BasePage } from './base-page';

export class LoginPage extends BasePage {
  private baseURL: string;
  private pageTitleMatch: RegExp;
  private emailInput: Locator;
  private loginButton: Locator;
  private loginErrorText: Locator;
  private loginText: Locator;
  private newUserEmailInput: Locator;
  private newUserNameInput: Locator;
  private newUserSignupText: Locator;
  private passwordInput: Locator;
  private signupButton: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitleMatch = /.*Automation Exercise - Signup \/ Login/i;
    this.baseURL = `${process.env.BASE_URL}login`;
    this.emailInput = this.page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address');
    this.loginButton = this.page.getByRole('button', { name: 'Login' });
    this.loginErrorText = this.page.locator('form').filter({ hasText: 'Login' }).locator('text=Your email or password is incorrect!');
    this.loginText = this.page.locator('#form').locator('text=Login to your account');
    this.newUserEmailInput = this.page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address');
    this.newUserNameInput = this.page.getByRole('textbox', { name: 'Name' });
    this.newUserSignupText = this.page.locator('#form').locator('text=New User Signup!');
    this.passwordInput = this.page.getByRole('textbox', { name: 'Password' });
    this.signupButton = this.page.getByRole('button', { name: 'Signup' });
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

  async checkNewUserSignup(): Promise<void> {
    await expect(this.newUserSignupText).toBeVisible();
  }

  async checkLogin(): Promise<void> {
    await expect(this.loginText).toBeVisible();
  }

  async enterNewUserName(userName: string): Promise<void> {
    await this.newUserNameInput.fill(userName);
  }

  async enterNewUserEmail(email: string): Promise<void> {
    await this.newUserEmailInput.fill(email);
  }

  async clickSignup(): Promise<void> {
    await this.signupButton.click();
  }

  async enterEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  async checkLogInError(): Promise<void> {
    await expect(this.loginErrorText).toBeVisible();
  }
}

export default { LoginPage };
