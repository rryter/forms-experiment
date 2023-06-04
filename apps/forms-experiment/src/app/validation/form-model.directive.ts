import { Directive, inject, OnDestroy } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { FormDirective } from './form.directive';
import { createValidator, getControlPath } from './utils';

/**
 * For each input with [ngModel], everytime the form changes,
 * update and execute the validations
 */
@Directive({
  selector: '[ngModel]',
  standalone: true,
})
export class FormModelDirective<T> implements OnDestroy {
  private readonly destroy$$ = new Subject<void>();

  private readonly ngModel = inject(NgModel, { self: true });
  private readonly formDirective = inject(FormDirective);

  constructor() {
    this.formDirective.formChanges$
      .pipe(takeUntil(this.destroy$$))
      .subscribe(() => {
        // get the needed objects from the form tag
        const { validations, ngForm, formData } = this.formDirective;

        const { name, control } = this.ngModel;
        // determine the path to the field, eg: user.name
        const fieldPath = getControlPath(ngForm.control, name, control);

        const validatorFn = createValidator(fieldPath, formData, validations);

        control.clearValidators();
        control.addValidators(validatorFn);
        control.updateValueAndValidity();
      });
  }

  public ngOnDestroy(): void {
    this.destroy$$.next();
  }
}
