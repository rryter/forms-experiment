import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { BehaviorSubject, delay, map, of, switchMap } from 'rxjs';
import 'zone.js/dist/zone';
import { AddressFormComponent } from './address/address.component';
import {
  FormDirective,
  FormFieldErrorComponent,
  FormModelDirective,
  FormModelGroupDirective,
} from './form-validation';
import { ObservableState } from './observable-state';
import { PasswordFormComponent } from './password-form/password-form.component';
import { SelectComponent } from './select/select.component';
import { User } from './types/user';
import { UserForm } from './validations/user.validations';

type State = {
  user: User;
  loadedUser: User;
  valid: boolean;
  dirty: boolean;
};

type ViewModel = Pick<State, 'user' | 'valid' | 'dirty'> & {
  passwordDisabled: boolean;
  showZipCode: boolean;
};

@Component({
  selector: 'fe-app',
  standalone: true,
  imports: [
    CommonModule,
    FormModelDirective,
    FormModelGroupDirective,
    FormDirective,
    FormFieldErrorComponent,
    AddressFormComponent,
    SelectComponent,
    PasswordFormComponent,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent
  extends ObservableState<State>
  implements AfterViewInit
{
  public readonly userValidations = UserForm;
  private readonly userId$ = new BehaviorSubject('1');

  @ViewChild('form') ngForm!: NgForm;

  public submit(): void {
    console.log(this.ngForm.form);
    if (this.ngForm.form.valid) {
      console.log(this.ngForm);
    }
  }

  public readonly vm$ = this.onlySelectWhen(['user', 'valid']).pipe(
    map((state) => {
      return {
        user: state.user,
        dirty: state.dirty,
        valid: state.valid,
        passwordDisabled: state.user.firstName === '',
        showZipCode: state.user.address.city !== '',
      };
    })
  );

  constructor() {
    super();
    this.initialize({
      user: new User(),
      loadedUser: new User(),
      dirty: false,
      valid: false,
    });
  }

  public loadUser() {
    this.connect({
      loadedUser: this.userId$.pipe(
        switchMap(() =>
          of(
            new User({
              firstName: 'Reto',
              lastName: 'Ryter',
              country22: 'Aasd',
              address: {
                country: 'Switzerland',
                city: 'Konolfingen',
                number: '',
                street: 'Schwalbenweg 3',
                zipcode: '1234',
              },
              companyAddress: {
                country: 'Switzerland2',
                city: 'Konolfingen2',
                number: '',
                street: 'Schwalbenweg 2',
                zipcode: '2222',
              },
              passwords: {
                password: '',
                confirmPassword: '',
              },
            })
          ).pipe(delay(1000))
        )
      ),
    });
  }

  public ngAfterViewInit(): void {
    this.select('loadedUser').subscribe((v) => this.ngForm.reset(v));
    this.connect({
      user: this.ngForm.valueChanges?.pipe(
        map((v) => new User({ ...this.snapshot.user, ...v }))
      ),
    });
  }

  public reset(): void {
    this.ngForm.resetForm(new User({ ...this.snapshot.loadedUser }));
  }

  public resetEmpty(): void {
    this.ngForm.resetForm(new User());
  }
}
