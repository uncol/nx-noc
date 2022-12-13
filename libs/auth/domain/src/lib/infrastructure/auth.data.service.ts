import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AUTH_API } from '@global-variable';
import { Observable, catchError, throwError } from 'rxjs';

import { Credentials, Tokens } from '../entities';

@Injectable({ providedIn: 'root' })
export class AuthDataService {
  constructor(
    private http: HttpClient,
    @Inject(AUTH_API) private authBaseUrl: string
  ) {}

  login(credentials: Credentials, visitorId: string): Observable<Tokens> {
    return this.http
      .post<Tokens>(`${this.authBaseUrl}/token`, {
        username: credentials.username,
        password: credentials.password,
        grant_type: 'password',
        visitorId: visitorId,
      })
      .pipe(catchError(this.handleError));
  }

  logout(visitorId: string) {
    return this.http
      .post(`${this.authBaseUrl}/revoke`, { visitorId })
      .pipe(catchError(this.handleError));
  }

  refresh(visitorId: string): Observable<Tokens> {
    return this.http
      .post<Tokens>(`${this.authBaseUrl}/token`, {
        grant_type: 'refresh_token',
        visitorId: visitorId,
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    const message = error?.error?.message ?? error.message;
    return throwError(() => ({
      message,
      status: error.status,
      statusText: error.statusText,
      url: error.url,
    }));
  }
}
