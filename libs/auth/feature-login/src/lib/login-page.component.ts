import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoginFormComponent } from '@auth-login-form';

@Component({
  standalone: true,
  imports: [CommonModule, LoginFormComponent],
  selector: 'auth-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  // constructor(private loginFacade: LoginFacade) {}
}
