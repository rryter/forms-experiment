import { Directive, inject, Input, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { ZodObject } from 'zod';

/**
 * Fundamental building block for TDRF (Template Driven Reactive Forms).
 */
@Directive({
  selector: 'form[formData]',
  standalone: true,
})
export class FormDirective<T> implements OnChanges {
  private readonly formChanges$$ = new Subject<void>();
  public readonly formChanges$ = this.formChanges$$.asObservable();

  @Input() public formData!: T;
  @Input() public validations!: ZodObject<any>;

  // How does this work?
  public readonly ngForm = inject(NgForm, { self: true });

  public ngOnChanges(): void {
    this.formChanges$$.next();
  }
}
