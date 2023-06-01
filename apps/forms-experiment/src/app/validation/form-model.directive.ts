import { Directive, inject, OnDestroy } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { FormDirective } from './form.directive';
import { createValidator, getControlPath } from './utils';

@Directive({
  selector: '[ngModel]',
  standalone: true,
})
export class FormModelDirective<T> implements OnDestroy {
  private readonly destroy$$ = new Subject<void>();
  private readonly ngModel = inject(NgModel, { self: true });

  constructor(private formDirective: FormDirective<any>) {
    this.formDirective.formChanges$
      .pipe(takeUntil(this.destroy$$))
      .subscribe(() => {
        const { suite } = this.formDirective;
        const field = getControlPath(
          this.formDirective.ngForm.control,
          this.ngModel.name,
          this.ngModel.control
        );
        const validatorFn = createValidator(
          field,
          this.formDirective.model,
          suite
        );
        this.ngModel.control.clearValidators();
        this.ngModel.control.addValidators(validatorFn);
        this.ngModel.control.updateValueAndValidity();
      });
  }

  public ngOnDestroy(): void {
    this.destroy$$.next();
  }
}
