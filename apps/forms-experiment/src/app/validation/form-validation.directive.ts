import { Directive, Input } from '@angular/core';
import { SuiteResult } from 'vest';

@Directive({
  selector: '[formValidation]',
  standalone: true,
})
export class FormValidationDirective<T> {
  @Input() public model!: T;
  @Input() public formValidation!: (model: T, field: string) => SuiteResult;
}
