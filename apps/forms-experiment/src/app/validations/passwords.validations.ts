import { enforce, omitWhen, test } from 'vest';
export function passwordValidations(
  model: { password: string; confirmPassword: string },
  field: string
): void {
  omitWhen(!model.password, () => {
    test(`${field}.password`, 'Password is required', () => {
      enforce(model.password).isNotBlank();
    });

    test(`${field}.password`, 'Should be more than 5 characters', () => {
      enforce(model.password).longerThan(5);
    });
  });
  test(`${field}.password`, 'Passwords should match', () => {
    enforce(model.password).equals(model.confirmPassword);
  });
}
