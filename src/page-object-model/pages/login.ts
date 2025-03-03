import { type Page, expect } from '@playwright/test';

export class LoginPage {
  private page: Page;
  private baseURL: string;
  private pageTitleMatch: RegExp;

  constructor(page: Page) {
    this.page = page;
    this.pageTitleMatch = /.*Automation Exercise - Signup \/ Login/i;
    this.baseURL = 'https://automationexercise.com/login';
  }
  async navigateTo(): Promise<void> {
    await this.page.goto(this.baseURL, { waitUntil: 'domcontentloaded', timeout: 20_000 });
    await this.landedOn();
  }
  async landedOn(): Promise<void> {
    await expect(this.page).toHaveURL(this.baseURL);
    await expect(this.page).toHaveTitle(this.pageTitleMatch);
  }
  async checkNewUserSignup(): Promise<void> {
    await expect(this.page.locator('#form')).toContainText('New User Signup!');
  }
  async checkLogin(): Promise<void> {
    await expect(this.page.locator('#form')).toContainText('Login to your account');
  }
  async enterNewUserName(userName: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Name' }).fill(userName);
  }
  async enterNewUserEmail(email: string): Promise<void> {
    await this.page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(email);
  }
  async clickSignup(): Promise<void> {
    await this.page.getByRole('button', { name: 'Signup' }).click();
  }
  async enterEmail(email: string): Promise<void> {
    await this.page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill(email);
  }
  async enterPassword(password: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
  }
  async clickLogin(): Promise<void> {
    await this.page.getByRole('button', { name: 'Login' }).click();
  }
  async clickHome(): Promise<void> {
    await this.page.getByRole('link', { name: ' Home' }).click();
  }
  async checkLogInError(): Promise<void> {
    await expect(this.page.locator('form').filter({ hasText: 'Login' })).toContainText('Your email or password is incorrect!');
  }
}
export default { LoginPage };
