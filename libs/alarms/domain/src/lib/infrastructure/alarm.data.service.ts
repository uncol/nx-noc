import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { DATA_API } from '@global-variable';
import { parseResponse } from '@util-data';
import { Observable, retry, tap, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Alarm } from '../entities';

@Injectable({ providedIn: 'root' })
export class AlarmDataService {
  constructor(
    private http: HttpClient,
    @Inject(DATA_API) private endpoints: string[]
  ) {}

  getAll(): Observable<Alarm[]> {
    return this.http
      .get<Alarm[]>(`${this.endpoints[0]}/alarms?_limit=20`, {
        observe: 'response',
      })
      .pipe(
        tap((response: HttpResponse<Alarm[]>) =>
          console.log(response.headers.get('x-total-count'))
        ),
        map((response: HttpResponse<Alarm[]>) => response.body || []),
        catchError(this.handleError)
      );
  }

  getById(id: string): Observable<Alarm> {
    return this.http
      .get<Alarm>(`${this.endpoints[0]}/alarms/${id}`)
      .pipe(parseResponse({}), retry(2), catchError(this.handleError));
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
