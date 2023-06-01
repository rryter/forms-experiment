import { enforce, test } from 'vest';
import { Address } from '../types/address';

export function addressValidations(model: Address, field: string): void {
  test(`${field}.street`, 'Street is required', () => {
    enforce(model.street).isNotBlank();
  });

  test(`${field}.zipcode`, 'ZipCode is required', () => {
    enforce(model.zipcode).isNotBlank();
  });

  test(`${field}.zipcode`, 'ZipCode is 4 digits long', () => {
    enforce(model.zipcode).lengthEquals(4);
  });
}
