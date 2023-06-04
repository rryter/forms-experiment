import { Directive, inject } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { FormDirective } from './form.directive';
import { createValidator, getControlPath } from './utils';

/**
 * For each input with [ngModel], everytime the form changes,
 * update and execute the validations
 */
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: FormModelDirective, multi: true },
  ],
  standalone: true,
})
export class FormModelDirective implements Validator {
  private readonly formDirective = inject(FormDirective);

  public validate(control: AbstractControl): ValidationErrors | null {
    const formGroup = control.parent?.controls;
    if (!formGroup) {
      throw Error('formGroup is not set');
    }

    const { ngForm, validations, formData } = this.formDirective;
    const controlName =
      Object.keys(formGroup).find(
        (name: string) => control === control.parent?.get(name)
      ) || '';
    const fieldPath = getControlPath(ngForm.control, controlName, control);
    const validatorFn = createValidator(fieldPath, formData, validations);

    return validatorFn(control);
  }
}
