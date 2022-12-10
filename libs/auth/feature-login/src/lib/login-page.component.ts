import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Credentials, LoginFacade } from '@auth-domain';
import { LoginFormComponent } from '@auth-login-form';

@Component({
  standalone: true,
  imports: [CommonModule, LoginFormComponent],
  selector: 'auth-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  pending$ = this.loginFacade.loginPagePending$;
  pageError$ = this.loginFacade.loginPageError$;
  loggedIn$ = this.loginFacade.loggedIn$;
  constructor(private loginFacade: LoginFacade) {}

  onSubmit(credential: Credentials) {
    this.loginFacade.login(credential);
  }

  onLogout() {
    this.loginFacade.logout();
  }
}
