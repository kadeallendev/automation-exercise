import { type Locator, type Page, expect } from '@playwright/test';
import { BasePage } from './base-page';

export class SignUpPage extends BasePage {
  private pageTitleMatch: RegExp;
  private baseURL: string;
  private form: Locator;
  private passwordInput: Locator;
  private daySelect: Locator;
  private monthSelect: Locator;
  private yearSelect: Locator;
  private newsletterCheckbox: Locator;
  private specialOffersCheckbox: Locator;
  private firstNameInput: Locator;
  private lastNameInput: Locator;
  private companyInput: Locator;
  private addressInput: Locator;
  private address2Input: Locator;
  private countrySelect: Locator;
  private stateInput: Locator;
  private cityInput: Locator;
  private zipInput: Locator;
  private mobileNumberInput: Locator;
  private createAccountButton: Locator;
  private loginErrorText: Locator;
  private signUpErrorText: Locator;
  private maleRadio: Locator;
  private femaleRadio: Locator;
  private enterAccountInformationText: string;

  constructor(page: Page) {
    super(page);
    this.pageTitleMatch = /.*Automation Exercise - Signup/i;
    this.baseURL = 'https://automationexercise.com/signup';
    this.form = this.page.locator('#form');
    this.passwordInput = this.page.getByRole('textbox', { name: 'Password *' });
    this.daySelect = this.page.locator('#days');
    this.monthSelect = this.page.locator('#months');
    this.yearSelect = this.page.locator('#years');
    this.newsletterCheckbox = this.page.getByRole('checkbox', { name: 'Sign up for our newsletter!' });
    this.specialOffersCheckbox = this.page.getByRole('checkbox', { name: 'Receive special offers from' });
    this.firstNameInput = this.page.getByRole('textbox', { name: 'First name *' });
    this.lastNameInput = this.page.getByRole('textbox', { name: 'Last name *' });
    this.companyInput = this.page.getByRole('textbox', { name: 'Company', exact: true });
    this.addressInput = this.page.getByRole('textbox', { name: 'Address * (Street address, P.' });
    this.address2Input = this.page.getByRole('textbox', { name: 'Address 2' });
    this.countrySelect = this.page.getByLabel('Country *');
    this.stateInput = this.page.getByRole('textbox', { name: 'State *' });
    this.cityInput = this.page.getByRole('textbox', { name: 'City * Zipcode *' });
    this.zipInput = this.page.locator('#zipcode');
    this.mobileNumberInput = this.page.getByRole('textbox', { name: 'Mobile Number *' });
    this.createAccountButton = this.page.getByRole('button', { name: 'Create Account' });
    this.loginErrorText = this.page.locator('form').filter({ hasText: 'Login' }).locator('text=Your email or password is incorrect!');
    this.signUpErrorText = this.page.locator('form').filter({ hasText: 'Signup' }).locator('text=Email Address already exist!');
    this.maleRadio = this.page.getByRole('radio', { name: 'Mr.' });
    this.femaleRadio = this.page.getByRole('radio', { name: 'Mrs.' });
    this.enterAccountInformationText = 'Enter Account Information';
  }

  async navigateTo(): Promise<void> {
    await this.page.goto(this.baseURL, { waitUntil: 'domcontentloaded', timeout: 20_000 });
    await this.landedOn();
  }

  async landedOn(): Promise<void> {
    await expect(this.page).toHaveURL(this.baseURL);
    await expect(this.page).toHaveTitle(this.pageTitleMatch);
  }

  async checkEnterAccountInformation(): Promise<void> {
    await expect(this.form).toContainText(this.enterAccountInformationText);
  }

  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async selectBirthDate(birthDate: Date): Promise<void> {
    const dayValue = birthDate.getDate().toString();
    const monthValue = (birthDate.getMonth() + 1).toString();
    const yearValue = birthDate.getFullYear().toString();
    await this.daySelect.selectOption(dayValue);
    await this.monthSelect.selectOption(monthValue);
    await this.yearSelect.selectOption(yearValue);
  }

  async checkNewsletter(): Promise<void> {
    await this.newsletterCheckbox.check();
  }

  async checkSpecialOffers(): Promise<void> {
    await this.specialOffersCheckbox.check();
  }

  async enterFirstName(firstName: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
  }

  async enterLastName(lastName: string): Promise<void> {
    await this.lastNameInput.fill(lastName);
  }

  async enterCompany(company: string): Promise<void> {
    await this.companyInput.fill(company);
  }

  async enterAddress(address: string): Promise<void> {
    await this.addressInput.fill(address);
  }

  async enterAddress2(address2: string): Promise<void> {
    await this.address2Input.fill(address2);
  }

  async selectCountry(country: string): Promise<void> {
    await this.countrySelect.selectOption(country);
  }

  async enterState(state: string): Promise<void> {
    await this.stateInput.fill(state);
  }

  async enterCity(city: string): Promise<void> {
    await this.cityInput.fill(city);
  }

  async enterZip(zip: string): Promise<void> {
    await this.zipInput.fill(zip);
  }

  async enterMobileNumber(mobileNumber: string): Promise<void> {
    await this.mobileNumberInput.fill(mobileNumber);
  }

  async clickCreateAccount(): Promise<void> {
    await this.createAccountButton.click();
  }

  async checkLogInError(): Promise<void> {
    await expect(this.loginErrorText).toBeVisible();
  }

  async checkSignUpError(): Promise<void> {
    await expect(this.signUpErrorText).toBeVisible();
  }

  async checkTitle(gender: string): Promise<void> {
    if (gender === 'male') {
      await this.maleRadio.check();
    } else {
      await this.femaleRadio.check();
    }
  }
}

export default { SignUpPage };
