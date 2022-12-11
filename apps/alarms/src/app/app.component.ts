import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginFacade } from '@auth-domain';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  imports: [RouterModule, AsyncPipe],
  selector: 'alarms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'alarms';

  loggedIn$: Observable<boolean> = this.authFacade.loggedIn$;
  constructor(private authFacade: LoginFacade) {}
}
