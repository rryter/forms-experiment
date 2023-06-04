import { Directive, inject, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { ZodAny, ZodObject, ZodRawShape, ZodUnknown } from 'zod';

/**
 * Fundamental building block for TDRF (Template Driven Reactive Forms).
 */
@Directive({
  selector: 'form[formData][validations]',
  standalone: true,
})
export class FormDirective<T> {
  @Input() public formData!: T;
  @Input() public validations!: ZodObject<ZodRawShape>;

  // How does this work?
  public readonly ngForm = inject(NgForm, { self: true });
}
