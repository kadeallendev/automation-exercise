import test from '@playwright/test';
import { UserData } from 'page-object-model/data/user-data';
import type { AccountCreatePage } from 'page-object-model/pages/account-created';
import type { DeleteAccountPage } from 'page-object-model/pages/delete-account';
import type { HomePage } from 'page-object-model/pages/home';
import type { LoginPage } from 'page-object-model/pages/login';
import type { SignUpPage } from 'page-object-model/pages/signup';

export namespace AccountWorkflow {
  export async function RegisterUser(homePage: HomePage, loginPage: LoginPage, signupPage: SignUpPage, accountCreated: AccountCreatePage, testUser: UserData.User) {
    await test.step('New User Sign Up', async () => {
      await homePage.landedOn();
      await homePage.clickSignupLogin();
      await loginPage.landedOn();
      await loginPage.checkNewUserSignup();
      await loginPage.enterNewUserName(testUser.userName);
      await loginPage.enterNewUserEmail(testUser.email);
      await loginPage.clickSignup();
    });
    await test.step('Enter Account Information', async () => {
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
      await accountCreated.landedOn();
      await accountCreated.checkAccountCreated();
      await accountCreated.clickContinue();
      await homePage.landedOn();
      await homePage.checkUserLoggedIn(testUser.userName);
    });
  }

  export async function RegisterExistingUser(homePage: HomePage, loginPage: LoginPage, signupPage: SignUpPage, testUser: UserData.User) {
    await test.step('Existing User Sign Up', async () => {
      await homePage.landedOn();
      await homePage.clickSignupLogin();
      await loginPage.landedOn();
      await loginPage.checkNewUserSignup();
      await loginPage.enterNewUserName(testUser.userName);
      await loginPage.enterNewUserEmail(testUser.email);
      await loginPage.clickSignup();
      await signupPage.landedOn();
      await signupPage.checkSignUpError();
      await signupPage.clickHome();
    });
  }

  export async function DeleteLoggedInUser(homePage: HomePage, deleteAccount: DeleteAccountPage) {
    await test.step('Delete Account', async () => {
      await homePage.landedOn();
      await homePage.clickDeleteAccount();
      await deleteAccount.landedOn();
      await deleteAccount.checkAccountDeleted();
      await deleteAccount.clickContinue();
      await homePage.landedOn();
      await homePage.checkUserLoggedOut();
    });
  }

  export async function LogOut(homePage: HomePage, loginPage: LoginPage, testUser: UserData.User) {
    await test.step('Log Out User', async () => {
      await homePage.landedOn();
      await homePage.checkUserLoggedIn(testUser.userName);
      await homePage.clickLogout();
      await loginPage.landedOn();
      await loginPage.clickHome();
      await homePage.landedOn();
      await homePage.checkUserLoggedOut();
    });
  }
  export async function LogIn(homePage: HomePage, loginPage: LoginPage, testUser: UserData.User) {
    await test.step('Log In User', async () => {
      await homePage.landedOn();
      await homePage.clickSignupLogin();
      await loginPage.landedOn();
      await loginPage.checkLogin();
      await loginPage.enterEmail(testUser.email);
      await loginPage.enterPassword(testUser.password);
      await loginPage.clickLogin();
      await homePage.landedOn();
      await homePage.checkUserLoggedIn(testUser.displayName);
    });
  }
  export async function IncorrectLogIn(homePage: HomePage, loginPage: LoginPage, testUser: UserData.User) {
    await test.step('Incorrectly Log In User', async () => {
      await homePage.landedOn();
      await homePage.clickSignupLogin();
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
