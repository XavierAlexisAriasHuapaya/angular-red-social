import { inject, Injectable } from '@angular/core';
import { env } from '../../../environments/env';
import { HttpClient } from '@angular/common/http';
import { registerRequest } from '../interfaces/register-request.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private readonly baseUrl: string = env.baseUrl;
  private httpClient = inject(HttpClient);

  constructor() { }

  register(request: registerRequest): Observable<boolean> {
    const url = `${this.baseUrl}/user`;
    return this.httpClient.post<any>(url, request);
  }

}
