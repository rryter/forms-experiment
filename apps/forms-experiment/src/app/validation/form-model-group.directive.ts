import { ContentChild, Directive, inject, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  NgModel,
  NgModelGroup,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { FormDirective } from './form.directive';
import { createValidator, getGroupInPath } from './utils';

@Directive({
  selector: '[ngModelGroup]',
  standalone: true,
})
export class FormModelGroupDirective<T> implements Validator {
  private readonly formDirective = inject(FormDirective);
  @ContentChild(NgModel) child!: NgModel;

  // constructor() {
  //   this.formDirective.formChanges$
  //     .pipe(takeUntil(this.destroy$$))
  //     .subscribe(() => {
  //       const { name } = this.ngModelGroup;
  //       if (name && this.child) {
  //         const formGroup = this.child.control.parent;

  //         if (!formGroup) {
  //           throw Error('Formgroup');
  //         }

  //         const { validations, ngForm, formData } = this.formDirective;
  //         const field = getGroupInPath(ngForm.control, name, formGroup);
  //         const validatorFn = createValidator(field, formData, validations);
  //         if (formGroup) {
  //           formGroup.clearValidators();
  //           formGroup.addValidators(validatorFn);
  //           formGroup.updateValueAndValidity();
  //         }
  //       }
  //     });
  // }

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
