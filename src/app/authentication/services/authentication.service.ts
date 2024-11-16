import { computed, inject, Injectable, signal } from '@angular/core';
import { env } from '../../../environments/env';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LoginRequest } from '../interfaces/login-request.interface';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { LoginResponse } from '../interfaces/login-response.interface';
import { AuthenticationStatus } from '../interfaces/authentication-status.enum';
import * as jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly baseUrl: string = env.baseUrl;
  private httpClient = inject(HttpClient);

  private _currentUsername = signal<string | ''>('');
  private _currentUserId = signal<number | 0>(0);
  private _authStatus = signal<AuthenticationStatus>(AuthenticationStatus.checking);

  public currentUsername = computed(() => this._currentUsername());
  public currentUserId = computed(() => this._currentUserId());
  public authStatus = computed(() => this._authStatus());

  constructor() {
    this.checkAuthStatus().subscribe();
  }

  private setAuthentication(response: LoginResponse): boolean {
    const subject = this.getDecodeToken(response.jwt).sub ?? '';
    const userId = this.getDecodeToken(response.jwt).userId ?? 0;
    this._currentUsername.set(subject);
    this._currentUserId.set(userId);
    this._authStatus.set(AuthenticationStatus.authenticated);
    localStorage.setItem("token", response.jwt);
    return true;
  }

  login(request: LoginRequest): Observable<boolean> {
    const url = `${this.baseUrl}/auth/authenticate`;
    return this.httpClient.post<LoginResponse>(url, request)
      .pipe(
        map((response: LoginResponse) => this.setAuthentication(response)),
        catchError(err => throwError(() => err.error.message))
      );
  }

  checkAuthStatus(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/validate`;
    const token = localStorage.getItem('token');
    if (!token) {
      this.logout();
      return of(false);
    }
    const params = new HttpParams().set('token', token);
    return this.httpClient.post<{ message: string }>(url, null, { params })
      .pipe(
        map(({ message }) => {
          if (message === 'Invalid') {
            this.logout();
            return false;
          }
          const response: LoginResponse = { 'username': '', jwt: token };
          this.setAuthentication(response);
          return true;
        }),
        catchError(() => {
          this._authStatus.set(AuthenticationStatus.notAuthenticated);
          return of(false);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this._currentUsername.set('');
    this._authStatus.set(AuthenticationStatus.notAuthenticated);
  }

  private getDecodeToken(jwt: string): any {
    const payload: any = jwtDecode.jwtDecode(jwt);
    return payload;
  }


}
