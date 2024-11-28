import { inject, Injectable } from '@angular/core';
import { env } from '../../../environments/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { ChatOne } from '../interfaces/chat-one.interface';
import { AuthenticationService } from '../../authentication/services/authentication.service';
import { ChatCreate } from '../interfaces/chat-create.interfaces';
import { ResponseData } from '../interfaces/response-data.interface';
import { ChatAllUser } from '../interfaces/chat-all-user.interface';
import { MessageService } from './message.service';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { ChatModel } from '../models/chat.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private _stompClient: any;
  private _baseUrl = env.baseUrl;
  private httpClient = inject(HttpClient);
  private authenticationService = inject(AuthenticationService);
  private _messageService = inject(MessageService);
  private _chatNotificationSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private _currentSubscription: any;

  constructor() {
    this.initConnectionSocket();
  }

  public initConnectionSocket() {
    if (this._stompClient && this._stompClient.connected) {
      return;
    }
    const urlSocket = `${this._baseUrl.replace(/^https?:/, '')}/chat-socket`;
    const socket = new SockJS(urlSocket);
    this._stompClient = Stomp.over(socket);
    this._stompClient.connect({}, () => {
    }, (error: any) => {
    });
  }

  private subscribeToNotificationByUser(userId: number) {
    if (this._currentSubscription) {
      this._currentSubscription.unsubscribe();
    }
    this._currentSubscription = this._stompClient.subscribe(`/topic/notification/${userId}`, (message: any) => {
      const messageContent = JSON.parse(message.body);
      this._chatNotificationSubject.next(messageContent);
    });
  }

  public joinUser(userId: number) {
    if (!this._stompClient.connected) {
      this._stompClient.connect({}, () => {
        this.subscribeToNotificationByUser(userId);
      }, (error: any) => {
      });
    } else {
      this.subscribeToNotificationByUser(userId);
    }
  }

  public getNotificationSubject() {
    return this._chatNotificationSubject.asObservable();
  }

  public sendMessage(userIdReceiver: number) {
    this._stompClient.send(`/app/chat/notification/${userIdReceiver}`, {}, {});
  }

  public saveChat(chat: ChatCreate): Observable<ResponseData> {
    const url = `${this._baseUrl}/chat`;
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
    const url = `${this._baseUrl}/chat/users/one/${userIdOne}/two/${userIdTwo}`;
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
    const url = `${this._baseUrl}/chat/user/${userId}`;
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

  public getChatOneByUserAll(chatId: number, userId: number): Observable<ChatAllUser> {
    const userIdOne = this.authenticationService.currentUserId();
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    const url = `${this._baseUrl}/chat/${chatId}/user/${userId}`;
    return this.httpClient.get<ChatAllUser>(url, { headers });
  }

  public getChatOneByUser(chatId: number, userId: number): Observable<ChatAllUser> {
    const userIdOne = this.authenticationService.currentUserId();
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    const url = `${this._baseUrl}/chat/${chatId}/user/${userId}`;
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

  public getAllChatNotificationsByUser(userId: number): Observable<ChatModel[]> {
    const userIdOne = this.authenticationService.currentUserId();
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    const url = `${this._baseUrl}/chat/notifications/user/${userId}`;
    return this.httpClient.get<ChatModel[]>(url, { headers });
  }

}
