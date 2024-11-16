import { inject, Injectable } from '@angular/core';
import { env } from '../../../environments/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AuthenticationService } from '../../authentication/services/authentication.service';
import { UserPagination } from '../interfaces/user-pagination.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = env.baseUrl;
  private httpClient = inject(HttpClient);
  private authenticationService = inject(AuthenticationService);

  constructor() { }

  getUsersExcludeId(id: number): Observable<UserPagination[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    const url = `${this.baseUrl}/user/exclude/${id}`;
    return this.httpClient.get<any>(url, { headers })
      .pipe(
        map(data => {
          return data.content;
        })
      );
  }

}
