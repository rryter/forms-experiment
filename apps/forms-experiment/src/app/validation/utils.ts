import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { set } from 'lodash';
import { ZodAny, ZodObject, ZodRawShape } from 'zod';

export function getControlPath(
  formGroup: FormGroup,
  controlName: string,
  control: AbstractControl
): string {
  for (const key in formGroup.controls) {
    if (formGroup.controls.hasOwnProperty(key)) {
      const ctrl = formGroup.get(key);
      if (ctrl instanceof FormGroup) {
        const path = getControlPath(ctrl, controlName, control);
        if (path) {
          return key + '.' + path;
        }
      } else if (ctrl === control) {
        return key;
      }
    }
  }
  return '';
}

export function getGroupInPath(
  formGroup: FormGroup,
  controlName: string,
  control: AbstractControl
): string {
  for (const key in formGroup.controls) {
    if (formGroup.controls.hasOwnProperty(key)) {
      const ctrl = formGroup.get(key);
      if (ctrl instanceof FormGroup) {
        const path = getControlPath(ctrl, controlName, control);
        if (path) {
          return key + '.' + path;
        }
      }
      if (ctrl === control) {
        return key;
      }
    }
  }
  return '';
}

export function createValidator<T>(
  field: string,
  model: T,
  validations: ZodObject<ZodRawShape>
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const mod: T = { ...model };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    set<any>(mod, field, control.value); // Update the property with path

    const result = validations.safeParse(mod);
    if (result.success === true) {
      return null;
    }

    const errors = result.error.issues
      .filter((issue: any) => {
        return issue.path.join('.') === field;
      })
      .map((issue: any) => issue.message);
    return errors?.length > 0 ? { error: errors[0], errors } : null;
  };
}
