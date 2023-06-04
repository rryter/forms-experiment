import { ContentChild, Directive, inject, OnDestroy } from '@angular/core';
import { NgModel, NgModelGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { FormDirective } from './form.directive';
import { createValidator, getGroupInPath } from './utils';

@Directive({
  selector: '[ngModelGroup]',
  standalone: true,
})
export class FormModelGroupDirective<T> implements OnDestroy {
  private readonly destroy$$ = new Subject<void>();
  private readonly formDirective = inject(FormDirective);
  private readonly ngModelGroup = inject(NgModelGroup, { self: true });
  @ContentChild(NgModel) child!: NgModel;

  constructor() {
    this.formDirective.formChanges$
      .pipe(takeUntil(this.destroy$$))
      .subscribe(() => {
        const { name } = this.ngModelGroup;
        if (name && this.child) {
          const formGroup = this.child.control.parent;

          if (!formGroup) {
            throw Error('Formgroup');
          }

          const { validations, ngForm, formData } = this.formDirective;
          const field = getGroupInPath(ngForm.control, name, formGroup);
          const validatorFn = createValidator(field, formData, validations);
          if (formGroup) {
            formGroup.clearValidators();
            formGroup.addValidators(validatorFn);
            formGroup.updateValueAndValidity();
          }
        }
      });
  }

  public ngOnDestroy(): void {
    this.destroy$$.next();
  }
}
