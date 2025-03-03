import test, { type Page } from '@playwright/test';
import { UserData } from 'page-object-model/data/user-data';
import { AccountCreatePage } from 'page-object-model/pages/account-created';
import { DeleteAccountPage } from 'page-object-model/pages/delete-account';
import { HomePage } from 'page-object-model/pages/home';
import { LoginPage } from 'page-object-model/pages/login';
import { SignUpPage } from 'page-object-model/pages/signup';

export namespace AccountWorkflow {
  export async function RegisterUser(page: Page, testUser: UserData.User) {
    let homePage: HomePage;
    let loginPage: LoginPage;
    let signupPage: SignUpPage;
    let accountCreated: AccountCreatePage;

    await test.step('New User Sign Up', async () => {
      homePage = new HomePage(page);
      await homePage.landedOn();
      await homePage.clickSignupLogin();
      loginPage = new LoginPage(page);
      await loginPage.landedOn();
      await loginPage.checkNewUserSignup();
      await loginPage.enterNewUserName(testUser.userName);
      await loginPage.enterNewUserEmail(testUser.email);
      await loginPage.clickSignup();
    });
    await test.step('Enter Account Information', async () => {
      signupPage = new SignUpPage(page);
      await signupPage.landedOn();
      await signupPage.checkEnterAccountInformation();
      await signupPage.enterPassword(testUser.password);
      await signupPage.selectBirthDate(testUser.birthDate);
      if (testUser.newsletter) {
        await signupPage.checkNewsletter();
      }
      if (testUser.offers) {
        await signupPage.checkSpecialOffers();
      }
      await signupPage.checkTitle(testUser.gender);
      await signupPage.enterFirstName(testUser.firstName);
      await signupPage.enterLastName(testUser.lastName);
      await signupPage.enterCompany(testUser.company);
      await signupPage.enterAddress(testUser.address);
      await signupPage.enterAddress2(testUser.address2);
      await signupPage.selectCountry(UserData.getCountryFromCode(testUser.location.country));
      await signupPage.enterState(testUser.location.state);
      await signupPage.enterCity(testUser.location.city);
      await signupPage.enterZip(testUser.location.zip);
      await signupPage.enterMobileNumber(testUser.mobileNumber);
      await signupPage.clickCreateAccount();
      accountCreated = new AccountCreatePage(page);
      await accountCreated.landedOn();
      await accountCreated.checkAccountCreated();
      await accountCreated.clickContinue();
      await homePage.landedOn();
      await homePage.checkUserLoggedIn(testUser.userName);
    });
  }

  export async function RegisterExistingUser(page: Page, testUser: UserData.User) {
    let homePage: HomePage;
    let loginPage: LoginPage;
    let signupPage: SignUpPage;

    await test.step('Existing User Sign Up', async () => {
      homePage = new HomePage(page);
      await homePage.landedOn();
      await homePage.clickSignupLogin();
      loginPage = new LoginPage(page);
      await loginPage.landedOn();
      await loginPage.checkNewUserSignup();
      await loginPage.enterNewUserName(testUser.userName);
      await loginPage.enterNewUserEmail(testUser.email);
      await loginPage.clickSignup();
      signupPage = new SignUpPage(page);
      await signupPage.landedOn();
      await signupPage.checkSignUpError();
      await signupPage.clickHome();
    });
  }

  export async function DeleteLoggedInUser(page: Page) {
    let homePage: HomePage;
    let deleteAccount: DeleteAccountPage;

    await test.step('Delete Account', async () => {
      homePage = new HomePage(page);
      await homePage.landedOn();
      await homePage.clickDeleteAccount();
      deleteAccount = new DeleteAccountPage(page);
      await deleteAccount.landedOn();
      await deleteAccount.checkAccountDeleted();
      await deleteAccount.clickContinue();
      await homePage.landedOn();
      await homePage.checkUserLoggedOut();
    });
  }

  export async function LogOut(page: Page, testUser: UserData.User) {
    let homePage: HomePage;
    let loginPage: LoginPage;

    await test.step('Log Out User', async () => {
      homePage = new HomePage(page);
      await homePage.landedOn();
      await homePage.checkUserLoggedIn(testUser.userName);
      await homePage.clickLogout();
      loginPage = new LoginPage(page);
      await loginPage.landedOn();
      await loginPage.clickHome();
      await homePage.landedOn();
      await homePage.checkUserLoggedOut();
    });
  }
  export async function LogIn(page: Page, testUser: UserData.User) {
    let homePage: HomePage;
    let loginPage: LoginPage;

    await test.step('Log In User', async () => {
      homePage = new HomePage(page);
      await homePage.landedOn();
      await homePage.clickSignupLogin();
      loginPage = new LoginPage(page);
      await loginPage.landedOn();
      await loginPage.checkLogin();
      await loginPage.enterEmail(testUser.email);
      await loginPage.enterPassword(testUser.password);
      await loginPage.clickLogin();
      await homePage.landedOn();
      await homePage.checkUserLoggedIn(testUser.userName);
    });
  }
  export async function IncorrectLogIn(page: Page, testUser: UserData.User) {
    let homePage: HomePage;
    let loginPage: LoginPage;

    await test.step('Incorrectly Log In User', async () => {
      homePage = new HomePage(page);
      await homePage.landedOn();
      await homePage.clickSignupLogin();
      loginPage = new LoginPage(page);
      await loginPage.landedOn();
      await loginPage.checkLogin();
      await loginPage.enterEmail(testUser.email);
      await loginPage.enterPassword(testUser.password);
      await loginPage.clickLogin();
      await loginPage.landedOn();
      await loginPage.checkLogInError();
    });
  }
}
export default { AccountWorkflow };
