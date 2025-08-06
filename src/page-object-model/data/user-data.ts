import {
  randBetweenDate,
  randCompanyName,
  randCreditCard,
  randEmail,
  randFirstName,
  randGender,
  randLastName,
  randNumber,
  randPhoneNumber,
  randStreetAddress
} from '@ngneat/falso';
import zipcodes from 'zipcodes';

export namespace UserData {
  export type User = {
    gender: string;
    firstName: string;
    lastName: string;
    displayName: string;
    userName: string;
    email: string;
    password: string;
    birthDate: Date;
    newsletter: boolean;
    offers: boolean;
    company: string;
    address: string;
    address2: string;
    location: {
      zip: string;
      city: string;
      state: string;
      country: string;
    };
    mobileNumber: string;
    creditCard: {
      number: string;
      expiryMonth: string;
      expiryYear: string;
      ccv: string;
    };
  };
  export function randomizeBirthday() {
    const today = new Date();
    const maxDate = new Date(today.getFullYear() - 18, 0, 1); // 18 years ago, January 1st
    const minDate = new Date(today.getFullYear() - 70, 0, 1); // 70 years ago, January 1st
    return randBetweenDate({ from: minDate, to: maxDate });
  }
  export function getRandomZipcode() {
    const randomZipcode = zipcodes.random();
    return {
      zip: randomZipcode.zip,
      city: randomZipcode.city,
      state: randomZipcode.state,
      country: randomZipcode.country
    };
  }
  export function getCountryFromCode(code: string): string {
    if (code === 'US') {
      return 'United States';
    }
    if (code === 'Canada') {
      return 'Canada';
    }
    throw new Error(`Country code ${code} not found`);
  }
  export function createUser(): User {
    const testUser: UserData.User = {
      gender: '',
      firstName: '',
      lastName: '',
      displayName: '',
      userName: '',
      email: '',
      password: '',
      birthDate: new Date(),
      newsletter: true,
      offers: true,
      company: '',
      address: '',
      address2: '',
      location: {
        zip: '',
        city: '',
        state: '',
        country: ''
      },
      mobileNumber: '',
      creditCard: {
        number: '',
        expiryMonth: '',
        expiryYear: '',
        ccv: ''
      }
    };
    let gender = randGender().toLowerCase();
    if (gender !== 'male' && gender !== 'female') {
      gender = 'female';
    }
    testUser.gender = gender;
    testUser.firstName = randFirstName({
      gender: gender as 'male' | 'female' | undefined,
      withAccents: false
    });
    testUser.lastName = randLastName({ withAccents: false });
    testUser.displayName = `${testUser.firstName} ${testUser.lastName}`;
    testUser.userName = `${testUser.firstName}.${testUser.lastName}`.toLowerCase();
    testUser.email = randEmail({
      firstName: testUser.firstName,
      lastName: testUser.lastName,
      nameSeparator: '.',
      provider: 'test-email',
      suffix: 'com'
    });
    testUser.password = process.env.GLOBAL_PASSWORD as string;
    testUser.birthDate = randomizeBirthday();
    testUser.company = randCompanyName();
    testUser.address = randStreetAddress();
    testUser.address2 = `Suite ${randNumber({ min: 1, max: 9999 })}`;
    testUser.location = getRandomZipcode();
    testUser.mobileNumber = randPhoneNumber();
    const creditCard = randCreditCard();
    const [expiryMonth, expiryYear] = creditCard.untilEnd.split('/');
    if (expiryMonth && expiryYear) {
      testUser.creditCard = {
        number: creditCard.number,
        expiryMonth: expiryMonth.trim(),
        expiryYear: `20${expiryYear.trim()}`,
        ccv: creditCard.ccv
      };
    }
    return testUser;
  }
  export function createStaticUser(): User {
    const testUser: UserData.User = {
      gender: 'male',
      firstName: 'Joe',
      lastName: 'Snuffy',
      displayName: 'Joe Snuffy',
      userName: 'joe.snuffy',
      email: 'joe.snuffy@mail.com',
      password: '@ut0m@t3d',
      birthDate: new Date('1990-04-29'),
      newsletter: true,
      offers: true,
      company: 'Snuffy Industries',
      address: '123 Main St',
      address2: 'Suite 123',
      location: {
        zip: '19047',
        city: 'Langhorne',
        state: 'PA',
        country: 'US'
      },
      mobileNumber: '2155551212',
      creditCard: {
        number: '1234567890123456',
        expiryMonth: '11',
        expiryYear: '27',
        ccv: '123'
      }
    };
    return testUser;
  }
}
export default { UserData };
