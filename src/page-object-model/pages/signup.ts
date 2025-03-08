import { type Locator, type Page, expect } from '@playwright/test';
import { BasePage } from './base-page';

export class SignUpPage extends BasePage {
  private pageTitleMatch: RegExp;
  private baseURL: string;
  private address2Input: Locator;
  private addressInput: Locator;
  private cityInput: Locator;
  private companyInput: Locator;
  private countrySelect: Locator;
  private createAccountButton: Locator;
  private daySelect: Locator;
  private enterAccountInformationText: string;
  private femaleRadio: Locator;
  private firstNameInput: Locator;
  private form: Locator;
  private lastNameInput: Locator;
  private loginErrorText: Locator;
  private maleRadio: Locator;
  private mobileNumberInput: Locator;
  private monthSelect: Locator;
  private newsletterCheckbox: Locator;
  private passwordInput: Locator;
  private signUpErrorText: Locator;
  private specialOffersCheckbox: Locator;
  private stateInput: Locator;
  private yearSelect: Locator;
  private zipInput: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitleMatch = /.*Automation Exercise - Signup/i;
    this.baseURL = `${process.env.BASE_URL}signup`;
    this.address2Input = this.page.getByRole('textbox', { name: 'Address 2' });
    this.addressInput = this.page.getByRole('textbox', { name: 'Address * (Street address, P.' });
    this.cityInput = this.page.getByRole('textbox', { name: 'City * Zipcode *' });
    this.companyInput = this.page.getByRole('textbox', { name: 'Company', exact: true });
    this.countrySelect = this.page.getByLabel('Country *');
    this.createAccountButton = this.page.getByRole('button', { name: 'Create Account' });
    this.daySelect = this.page.locator('#days');
    this.enterAccountInformationText = 'Enter Account Information';
    this.femaleRadio = this.page.getByRole('radio', { name: 'Mrs.' });
    this.firstNameInput = this.page.getByRole('textbox', { name: 'First name *' });
    this.form = this.page.locator('#form');
    this.lastNameInput = this.page.getByRole('textbox', { name: 'Last name *' });
    this.loginErrorText = this.page.locator('form').filter({ hasText: 'Login' }).locator('text=Your email or password is incorrect!');
    this.maleRadio = this.page.getByRole('radio', { name: 'Mr.' });
    this.mobileNumberInput = this.page.getByRole('textbox', { name: 'Mobile Number *' });
    this.monthSelect = this.page.locator('#months');
    this.newsletterCheckbox = this.page.getByRole('checkbox', { name: 'Sign up for our newsletter!' });
    this.passwordInput = this.page.getByRole('textbox', { name: 'Password *' });
    this.signUpErrorText = this.page.locator('form').filter({ hasText: 'Signup' }).locator('text=Email Address already exist!');
    this.specialOffersCheckbox = this.page.getByRole('checkbox', { name: 'Receive special offers from' });
    this.stateInput = this.page.getByRole('textbox', { name: 'State *' });
    this.yearSelect = this.page.locator('#years');
    this.zipInput = this.page.locator('#zipcode');
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
