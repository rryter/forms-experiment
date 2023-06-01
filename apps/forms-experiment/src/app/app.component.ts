import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { BehaviorSubject, delay, filter, map, of, switchMap } from 'rxjs';
import 'zone.js/dist/zone';
import { AddressComponent } from './address/address.component';
import { ObservableState } from './observable-state';
import { User } from './types/user';
import { FormModelGroupDirective } from './validation/form-model-group.directive';
import { FormModelDirective } from './validation/form-model.directive';
import { FormDirective } from './validation/form.directive';
import { InputWrapperComponent } from './validation/input-wrapper/input-wrapper.component';
import { userValidations } from './validations/user.validations';

type State = {
  user: User;
  loadedUser: User;
  valid: boolean;
  dirty: boolean;
  country: string;
  zipCodes: string[];
};

type ViewModel = Pick<State, 'user' | 'valid' | 'dirty' | 'zipCodes'> & {
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
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent
  extends ObservableState<State>
  implements AfterViewInit
{
  public readonly suite = userValidations;
  private readonly userId$ = new BehaviorSubject('1');

  @ViewChild('form') ngForm!: NgForm;

  public submit(): void {
    console.log(this.ngForm.form.errors);
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
        zipCodes: state.zipCodes,
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
      country: '',
      zipCodes: [],
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
      country: this.select('user').pipe(map((user) => user.address.country)),
      zipCodes: this.select('country').pipe(
        filter(Boolean),
        switchMap(() => of(['9000', '9270']))
      ),
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
