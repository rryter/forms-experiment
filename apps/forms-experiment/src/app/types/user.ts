import { Address } from './address';

export class User {
  firstName = '';
  lastName = '';
  passwords = {
    password: '',
    confirmPassword: '',
  };

  country22 = '';

  address: Address = {
    street: '',
    number: '',
    city: '',
    zipcode: '',
    country: '',
  };

  companyAddress: Address = {
    street: '',
    number: '',
    city: '',
    zipcode: '',
    country: '',
  };

  isCompany = false;

  constructor(user?: Partial<User>) {
    if (user) {
      Object.assign(this, { ...user });
    }
  }
}
