import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormComponent } from '@auth-login-form';

@Component({
  standalone: true,
  imports: [CommonModule, FormComponent],
  selector: 'auth-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  // constructor(private loginFacade: LoginFacade) {}
}
