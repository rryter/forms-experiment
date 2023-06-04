import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { BehaviorSubject, delay, map, of, switchMap } from 'rxjs';
import 'zone.js/dist/zone';
import { AddressComponent } from './address/address.component';
import { ObservableState } from './observable-state';
import { PasswordFormComponent } from './password-form/password-form.component';
import { SelectComponent } from './select/select.component';
import { User } from './types/user';
import { FormModelGroupDirective } from './validation/form-model-group.directive';
import { FormModelDirective } from './validation/form-model.directive';
import { FormDirective } from './validation/form.directive';
import { InputWrapperComponent } from './validation/input-wrapper/input-wrapper.component';
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
  selector: 'forms-experiment-app',
  standalone: true,
  imports: [
    CommonModule,
    FormModelDirective,
    FormModelGroupDirective,
    FormDirective,
    InputWrapperComponent,
    AddressComponent,
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
    console.log(UserForm);
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
