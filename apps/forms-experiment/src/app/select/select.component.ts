import { CommonModule, NgForOf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ControlContainer, FormsModule, NgForm } from '@angular/forms';
import {
  FormFieldErrorComponent,
  FormModelDirective,
  FormModelGroupDirective,
} from '../form-validation';

@Component({
  selector: 'fe-select',
  standalone: true,
  imports: [
    CommonModule,
    FormFieldErrorComponent,
    FormModelDirective,
    FormModelGroupDirective,
    FormsModule,
    NgForOf,
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
