import { enforce, omitWhen, test } from 'vest';
import { Address } from '../types/address';

export function addressValidations(model: Address, field: string): void {
  test(`${field}.street`, 'Street is required', () => {
    enforce(model.street).isNotBlank();
  });

  test(`${field}.zipcode`, 'ZipCode is required', () => {
    enforce(model.zipcode).isNotBlank();
  });

  omitWhen(!model.zipcode, () => {
    test(
      `${field}.zipcode`,
      `ZipCode should be 4 digits long, currently ${model.zipcode?.length}`,
      () => {
        enforce(model.zipcode).lengthEquals(4);
      }
    );
  });
}
