import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Credentials } from '@auth-domain';
import {
  CdsButtonModule,
  CdsFormsModule,
  CdsInputModule,
  CdsPasswordModule,
} from '@cds/angular';
import { AppError } from '@error-util';
import { ControlsOf } from '@form-util';

@Component({
  selector: 'login-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CdsFormsModule,
    CdsInputModule,
    CdsButtonModule,
    CdsPasswordModule,
  ],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @Input() errorMessage: AppError = null;
  @Input() loggedIn: boolean | null = null;

  @Input()
  set pending(isPending: boolean) {
    isPending ? this.form.disable() : this.form.enable();
  }

  @ViewChild('passwordInput')
  passwordInput!: ElementRef<HTMLInputElement>;
  @Output()
  submitted = new EventEmitter<Credentials>();
  @Output() logout = new EventEmitter();
  // @ViewChild('logoutConfirmation') dialog!: ElementRef<HTMLDialogElement>;

  form = new FormGroup<ControlsOf<Credentials>>({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    password: new FormControl('', { nonNullable: true }),
  });

  submit() {
    if (this.form.valid) {
      this.submitted.emit(this.form.value);
    }
  }

  reset() {
    this.form.reset();
  }

  logOut() {
    // this.dialog.nativeElement.close();
    this.logout.emit();
  }

  workaroundSubmit() {
    if (this.form.valid) {
      this.submitted.emit(this.form.value);
    }
  }
  workaroundAutofill() {
    const matches =
      this.passwordInput.nativeElement.matches(':-webkit-autofill') ||
      this.passwordInput.nativeElement.matches(':autofill');
    console.log('workaround autoFill', matches);
    if (matches && this.form.valid) {
      this.submitted.emit(this.form.value);
    }
  }
}
