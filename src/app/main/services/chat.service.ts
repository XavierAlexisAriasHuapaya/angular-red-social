import { inject, Injectable } from '@angular/core';
import { env } from '../../../environments/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { ChatOne } from '../interfaces/chat-one.interface';
import { AuthenticationService } from '../../authentication/services/authentication.service';
import { ChatCreate } from '../interfaces/chat-create.interfaces';
import { ResponseData } from '../interfaces/response-data.interface';
import { ChatAllUser } from '../interfaces/chat-all-user.interface';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private baseUrl = env.baseUrl;
  private httpClient = inject(HttpClient);
  private authenticationService = inject(AuthenticationService);
  private _messageService = inject(MessageService);

  constructor() { }

  public saveChat(chat: ChatCreate): Observable<ResponseData> {
    const url = `${this.baseUrl}/chat`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post<ResponseData>(url, chat, { headers });
  }

  public getChatByUsers(userIdTwo: number): Observable<ChatOne | null> {
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

  public getChatAllByUser(userId: number): Observable<ChatAllUser[]> {
    const userIdOne = this.authenticationService.currentUserId();
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    const url = `${this.baseUrl}/chat/user/${userId}`;
    return this.httpClient.get<ChatAllUser[]>(url, { headers }).pipe(
      map(data => {
        data.forEach(chat => {
          chat.chat.chatMembers = chat.chat.chatMembers.filter(member => member.user.id !== userId);
          chat.chat.name = chat.chat.chatMembers.length == 1 ? chat.chat.chatMembers[0].user.name : 'Group';
          chat.message.seen = userId === chat.message.user.id ? true : chat.message.seen;
        });
        return data;
      })
    )
  }

  public getChatOneByUser(chatId: number, userId: number): Observable<ChatAllUser> {
    const userIdOne = this.authenticationService.currentUserId();
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    const url = `${this.baseUrl}/chat/${chatId}/user/${userId}`;
    return this.httpClient.get<ChatAllUser>(url, { headers }).pipe(
      map(data => {
        data.chat.chatMembers = data.chat.chatMembers.filter(member => member.user.id !== userId);
        data.chat.name = data.chat.chatMembers.length == 1 ? data.chat.chatMembers[0].user.name : 'Group';
        data.message.seen = userId === data.message.user.id ? true : data.message.seen;
        if (!data.message.seen) {
          if (userId !== data.message.user.id) {
            this._messageService.updateSeen(data.message.id).subscribe();
          }
        }
        return data;
      })
    )
  }

}
