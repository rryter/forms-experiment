import { ContentChild, Directive, inject } from '@angular/core';
import {
  AbstractControl,
  NgModel,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { FormDirective } from './form.directive';
import { createValidator, getGroupInPath } from './form.utils';

@Directive({
  selector: '[ngModelGroup]',
  standalone: true,
})
export class FormModelGroupDirective<T> implements Validator {
  private readonly formDirective = inject(FormDirective);
  @ContentChild(NgModel) child!: NgModel;

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
    const field = getGroupInPath(ngForm.control, controlName, control);
    const validatorFn = createValidator(field, formData, validations);

    return validatorFn(control);
  }
}
