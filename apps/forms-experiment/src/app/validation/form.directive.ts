import { Directive, inject, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ZodObject, ZodRawShape } from 'zod';

/**
 * Fundamental building block for TDRF (Template Driven Reactive Forms).
 */
@Directive({
  selector: 'form[formData][validations]',
  standalone: true,
})
export class FormDirective<T = unknown> {
  @Input() public formData!: T;
  @Input() public validations!: ZodObject<ZodRawShape>;

  // How does this work?
  public readonly ngForm = inject(NgForm, { self: true });
}
