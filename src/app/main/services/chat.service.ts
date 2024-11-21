import { inject, Injectable } from '@angular/core';
import { env } from '../../../environments/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { ChatOne } from '../interfaces/chat-one.interface';
import { AuthenticationService } from '../../authentication/services/authentication.service';
import { ChatCreate } from '../interfaces/chat-create.interfaces';
import { ResponseData } from '../interfaces/response-data.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private baseUrl = env.baseUrl;
  private httpClient = inject(HttpClient);
  private authenticationService = inject(AuthenticationService);

  constructor() { }

  saveChat(chat: ChatCreate): Observable<ResponseData> {
    const url = `${this.baseUrl}/chat`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post<ResponseData>(url, chat, { headers });
  }

  getChatByUsers(userIdTwo: number): Observable<ChatOne | null> {
    const userIdOne = this.authenticationService.currentUserId();
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    const url = `${this.baseUrl}/chat/users/one/${userIdOne}/two/${userIdTwo}`;
    return this.httpClient.get<any>(url, { headers: headers })
      .pipe(
        map(chat => {
          if (chat.message == 'Record Empty') {
            return null;
          }
          return chat;
        })
      );
  }

}
