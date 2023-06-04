import { CommonModule } from '@angular/common';
import { Component, ContentChild, HostBinding, inject } from '@angular/core';
import { NgModel, NgModelGroup } from '@angular/forms';
import { FormDirective } from '../form.directive';

/**
 * Provides the HTML and logic for displaying validation errors for each field.
 * TBD: find a way to show the validation errors for conditional validation:
 */
@Component({
  selector: '[inputWrapper]',
  standalone: true,
  imports: [CommonModule],
  template: `
    <small class="">
      <ng-container *ngIf="ngModel.valid; else invalid">
        <span class="badge text-bg-success">Valid</span>&nbsp;
      </ng-container>
      <ng-template #invalid>
        <span class="badge text-bg-danger">Invalid</span>&nbsp;
      </ng-template>
      <ng-container *ngIf="ngModel.dirty; else clean">
        <span class="badge text-bg-warning">dirty</span>&nbsp;
      </ng-container>
      <ng-template #clean>
        <span class="badge text-bg-info">clean</span>&nbsp;
      </ng-template>
    </small>
    <ng-content></ng-content>
    <div
      class="alert alert-danger"
      role="alert"
      *ngIf="
        ngModel.control.errors &&
        (formDirective.ngForm.submitted || ngModel.touched || ngModel.dirty)
      "
    >
      <ul>
        <li *ngFor="let error of ngModel.control.errors['errors']">
          {{ error }}
        </li>
      </ul>
      <ng-container
        *ngIf="
          ngModelGroup &&
          (formDirective.ngForm.submitted ||
            ngModelGroup.touched ||
            ngModel.dirty)
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
  styleUrls: ['./input-wrapper.component.scss'],
})
export class InputWrapperComponent {
  @ContentChild(NgModel) public ngModel!: NgModel;

  public readonly formDirective = inject(FormDirective);
  public readonly ngModelGroup: NgModelGroup | null = inject(NgModelGroup, {
    optional: true,
    self: true,
  });

  @HostBinding('class.invalid') public get invalid() {
    if (
      this.ngModel?.control?.errors &&
      (this.formDirective.ngForm.submitted ||
        this.ngModel.touched ||
        this.ngModel.dirty)
    ) {
      return true;
    }

    if (
      this.ngModelGroup?.control?.errors &&
      (this.formDirective.ngForm.submitted ||
        this.ngModelGroup.touched ||
        this.ngModel.dirty)
    ) {
      return true;
    }

    return false;
  }
}
