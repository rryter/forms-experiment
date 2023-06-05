import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input } from '@angular/core';
import { ControlContainer, FormsModule, NgForm } from '@angular/forms';
import { ZodObject, ZodRawShape } from 'zod';
import { FormFieldErrorComponent } from '../validation/form-field-error/form-field-error.component';
import { FormModelGroupDirective } from '../validation/form-model-group.directive';
import { FormModelDirective } from '../validation/form-model.directive';
import { FormDirective } from '../validation/form.directive';
import {
  PasswordForm,
  PasswordFormType,
} from '../validations/passwords.validations';

@Component({
  selector: 'fe-password-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FormModelDirective,
    FormModelGroupDirective,
    FormFieldErrorComponent,
  ],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss'],
})
export class PasswordFormComponent implements AfterViewInit {
  /**
   * You can pass in custom validations as a way of overriding the default password validation
   */
  @Input() validations: ZodObject<ZodRawShape> | null = null;

  @Input({ required: true }) passwords: PasswordFormType = {
    password: '',
    confirmPassword: '',
  };

  constructor(private formDirective: FormDirective) {}

  ngAfterViewInit(): void {
    if (!this.validations) {
      const { validations } = this.formDirective;
      this.formDirective.validations = validations.extend({
        passwords: PasswordForm,
      });
    } else {
      console.warn(`Default Password Validations have been disabled. You can 
      define the customized validations yourself in the main validation object 
      that is passed into the form via form[validations]`);
    }
  }
}
