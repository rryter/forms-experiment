import { NgFor, NgIf } from '@angular/common';
import { AfterViewInit, Component, Input } from '@angular/core';
import { ControlContainer, FormsModule, NgForm } from '@angular/forms';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Address } from '../types/address';
import { FormFieldErrorComponent } from '../validation/form-field-error/form-field-error.component';
import { FormModelGroupDirective } from '../validation/form-model-group.directive';
import { FormModelDirective } from '../validation/form-model.directive';
import { FormDirective } from '../validation/form.directive';
import { AddressForm } from '../validations/addresss.validations';

@Component({
  selector: 'fe-address-form',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    FormsModule,
    FormModelDirective,
    FormModelGroupDirective,
    FormFieldErrorComponent,
    NgbTypeahead,
  ],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressFormComponent implements AfterViewInit {
  @Input() public address = new Address();
  @Input() public name = 'address';

  constructor(private formDirective: FormDirective<any>) {}

  ngAfterViewInit(): void {
    this.formDirective.validations = this.formDirective.validations.extend({
      [this.name]: AddressForm,
    });
  }
}
