import { type Locator, type Page, expect } from '@playwright/test';

export class BasePage {
  protected page: Page;
  private cartLink: Locator;
  private contactUsLink: Locator;
  private continueShoppingButton: Locator;
  private deleteAccountLink: Locator;
  private footer: Locator;
  private header: Locator;
  private homeLink: Locator;
  private loggedInMessage: string;
  private logoutLink: Locator;
  private productsLink: Locator;
  private signupLoginLink: Locator;
  private subscriptionButton: Locator;
  private subscriptionEmailInput: Locator;
  private subscriptionSuccessText: string;
  private subscriptionText: string;
  private testCasesLink: Locator;
  private viewCartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartLink = this.page.getByRole('link', { name: ' Cart' });
    this.contactUsLink = this.page.getByRole('link', { name: ' Contact us' });
    this.continueShoppingButton = this.page.getByRole('button', { name: 'Continue Shopping' });
    this.deleteAccountLink = this.page.getByRole('link', { name: ' Delete Account' });
    this.footer = this.page.locator('#footer');
    this.header = this.page.locator('#header');
    this.homeLink = this.page.getByRole('link', { name: ' Home' });
    this.loggedInMessage = 'Logged in as ';
    this.logoutLink = this.page.getByRole('link', { name: ' Logout' });
    this.productsLink = this.page.getByRole('link', { name: ' Products' });
    this.signupLoginLink = this.page.getByRole('link', { name: ' Signup / Login' });
    this.subscriptionButton = this.page.getByRole('button', { name: '' });
    this.subscriptionEmailInput = this.page.getByRole('textbox', { name: 'Your email address' });
    this.subscriptionSuccessText = 'You have been successfully subscribed!';
    this.subscriptionText = 'Subscription';
    this.testCasesLink = this.page.getByRole('link', { name: ' Test Cases' });
    this.viewCartLink = this.page.getByRole('link', { name: 'View Cart' });
  }

  getPage(): Page {
    return this.page;
  }

  async clickHome(): Promise<void> {
    await this.homeLink.click();
  }

  async clickSignupLogin(): Promise<void> {
    await this.signupLoginLink.click();
  }

  async checkUserLoggedIn(userName: string): Promise<void> {
    await expect(this.logoutLink).toBeVisible();
    await expect(this.header).toContainText(`${this.loggedInMessage}${userName}`);
  }

  async checkUserLoggedOut(): Promise<void> {
    await expect(this.header).not.toContainText(this.loggedInMessage);
  }

  async clickDeleteAccount(): Promise<void> {
    await this.deleteAccountLink.click();
  }

  async clickLogout(): Promise<void> {
    await this.logoutLink.click();
  }

  async clickContactUs(): Promise<void> {
    await this.contactUsLink.click();
  }

  async clickTestCases(): Promise<void> {
    await this.testCasesLink.click();
  }

  async clickProducts(): Promise<void> {
    await this.productsLink.click();
  }

  async clickCart(): Promise<void> {
    await this.cartLink.click();
  }

  async checkFooterForSubscription(): Promise<void> {
    await expect(this.footer).toContainText(this.subscriptionText);
  }

  async fillEmailForSubscription(email: string): Promise<void> {
    await this.subscriptionEmailInput.fill(email);
  }

  async submitSubscription(): Promise<void> {
    await this.subscriptionButton.click();
  }

  async checkSubscriptionSuccess(): Promise<void> {
    await expect(this.footer).toContainText(this.subscriptionSuccessText);
  }

  private categoryLocator(category: string): Locator {
    return this.page.getByRole('link', { name: ` ${category}` });
  }

  private subCategoryLocator(category: string): Locator {
    return this.page.locator(`#${category}`);
  }

  private brandLocator(brand: string): Locator {
    const brandRegex = new RegExp(` ${brand}`);
    return this.page.getByRole('link', { name: brandRegex });
  }

  async filterCategory(category: string, subCategory: string): Promise<void> {
    await this.page.getByRole('heading', { name: 'Category' }).click();
    await this.categoryLocator(category).click();
    await expect(this.subCategoryLocator(category)).toContainText(subCategory);
    await this.page.getByRole('link', { name: subCategory }).click();
    await expect(this.page.locator('section')).toContainText(`${category} - ${subCategory} Products`);
  }

  async filterBrand(brand: string): Promise<void> {
    await expect(this.page.locator('body')).toContainText('Brands');
    await this.brandLocator(brand).click();
  }

  async clickContinueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  async clickViewCart(): Promise<void> {
    await this.viewCartLink.click();
  }
}

export default { BasePage };
