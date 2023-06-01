import { create, enforce, only, test } from 'vest';
import { User } from '../types/user';
import { addressValidations } from './addresss.validations';
import { passwordValidations } from './passwords.validations';

export const userValidations = create((model: User, field: string) => {
  only(field);

  test('firstName', `First name is required`, () => {
    enforce(model.firstName).isNotBlank();
  });
  test('lastName', `Last name is required`, () => {
    enforce(model.lastName).isNotBlank();
  });
  passwordValidations(model.passwords, 'passwords');
  addressValidations(model.address, 'address');
});
