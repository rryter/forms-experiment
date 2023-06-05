import { CommonModule, NgForOf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ControlContainer, FormsModule, NgForm } from '@angular/forms';
import { FormFieldErrorComponent } from '../validation/form-field-error/form-field-error.component';
import { FormModelGroupDirective } from '../validation/form-model-group.directive';
import { FormModelDirective } from '../validation/form-model.directive';

@Component({
  selector: 'fe-select',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgForOf,
    FormFieldErrorComponent,
    FormModelDirective,
    FormModelGroupDirective,
  ],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
  template: `
    <div formFieldError>
      <label class="form-group">
        <span class="form-group__label">Country22</span>
        <input type="text" [ngModel]="selectedValue" name="country22" />
      </label>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class SelectComponent {
  countries = [
    { id: 1, name: 'United States' },
    { id: 2, name: 'Australia' },
    { id: 3, name: 'Canada' },
    { id: 4, name: 'Brazil' },
    { id: 5, name: 'England' },
  ];
  @Input() selectedValue: any;
}
