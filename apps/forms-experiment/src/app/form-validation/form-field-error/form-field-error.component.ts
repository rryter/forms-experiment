import { CommonModule } from '@angular/common';
import { Component, ContentChild, HostBinding, inject } from '@angular/core';
import { NgForm, NgModel, NgModelGroup } from '@angular/forms';
import { FormDirective } from '../form.directive';

/**
 * Provides the HTML and logic for displaying validation errors for each field.
 * TBD: find a way to show the validation errors for conditional validation:
 */
@Component({
  selector: '[formFieldError]',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-content></ng-content>
    <div
      class="alert alert-danger"
      role="alert"
      *ngIf="
        ngModel?.control?.errors &&
        (formDirective.ngForm.submitted || ngModel?.touched || ngModel?.dirty)
      "
    >
      <ul>
        <li *ngFor="let error of ngModel?.control?.errors?.['errors']">
          {{ error }}
        </li>
      </ul>
      <ng-container
        *ngIf="
          ngModelGroup &&
          (formDirective.ngForm.submitted ||
            ngModelGroup.touched ||
            ngModelGroup.dirty)
        "
      >
        <ul *ngIf="ngModelGroup.control.errors">
          <li *ngFor="let error of ngModelGroup.control.errors['errors']">
            {{ error }}
          </li>
        </ul>
      </ng-container>
    </div>
  `,
  styleUrls: ['./form-field-error.component.scss'],
})
export class FormFieldErrorComponent {
  @ContentChild(NgModel) ngModel: NgModel | null = null;

  readonly formDirective = inject(FormDirective);
  readonly ngModelGroup: NgModelGroup | null = inject(NgModelGroup, {
    optional: true,
    self: true,
  });

  @HostBinding('class.invalid') get invalid() {
    const { ngForm } = this.formDirective;
    const modelOrGroup = this.ngModel || this.ngModelGroup;

    if (modelOrGroup && modelOrGroup?.control?.errors) {
      return this.isInvalid(ngForm, modelOrGroup);
    }

    return false;
  }

  private isInvalid(ngForm: NgForm, modelOrGroup: NgModel | NgModelGroup) {
    return ngForm.submitted || modelOrGroup.touched || modelOrGroup.dirty;
  }
}
