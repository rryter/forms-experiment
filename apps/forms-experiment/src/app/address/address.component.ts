import { NgFor, NgIf } from '@angular/common';
import { AfterViewInit, Component, Input } from '@angular/core';
import { ControlContainer, FormsModule, NgForm } from '@angular/forms';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';

import {
  FormDirective,
  FormFieldErrorComponent,
  FormModelDirective,
  FormModelGroupDirective,
} from '../form-validation';
import { Address } from '../types/address';
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
