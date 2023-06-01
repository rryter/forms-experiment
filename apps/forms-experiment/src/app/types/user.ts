import { Address } from './address';

export class User {
  public firstName = '';
  public lastName = '';
  public passwords = {
    password: '',
    confirmPassword: '',
  };

  public address: Address = {
    street: '',
    number: '',
    city: '',
    zipcode: '',
    country: '',
  };

  constructor(user?: Partial<User>) {
    if (user) {
      Object.assign(this, { ...user });
    }
  }
}
