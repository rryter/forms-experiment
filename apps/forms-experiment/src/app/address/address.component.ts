import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ControlContainer, FormsModule, NgForm } from '@angular/forms';
import { FormModelGroupDirective } from '../validation/form-model-group.directive';
import { FormModelDirective } from '../validation/form-model.directive';
import { InputWrapperComponent } from '../validation/input-wrapper/input-wrapper.component';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    FormsModule,
    FormModelDirective,
    FormModelGroupDirective,
    InputWrapperComponent,
  ],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent {
  @Input() public street = '';
  @Input() public number = '';
  @Input() public city = '';
  @Input() public zipcode = '';
  @Input() public country = '';
  @Input() public zipCodes: string[] = [];
  @Input() public showZipCode = true;
}
