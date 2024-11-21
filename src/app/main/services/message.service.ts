import { inject, Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import SockJS from 'sockjs-client';
import { MessageCreate } from '../interfaces/message-create.interface';
import { env } from '../../../environments/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../../authentication/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private _baseUrl = env.baseUrl;
  private _httpClient = inject(HttpClient);
  private _authenticationService = inject(AuthenticationService);
  private _stompClient: any;
  private _messageSubject: BehaviorSubject<MessageCreate[]> = new BehaviorSubject<MessageCreate[]>([]);
  private _currentSubscription: any;

  constructor() {
    this.initConnectionSocket();
  }

  private subscribeToRoom(roomCode: string) {
    if (this._currentSubscription) {
      this._currentSubscription.unsubscribe();
    }
    this._currentSubscription = this._stompClient.subscribe(`/topic/${roomCode}`, (message: any) => {
      const messageContent = JSON.parse(message.body);
      const currentMessages = this._messageSubject.getValue();
      const formattedMessage = {
        ...messageContent,
        messageSide: messageContent.user.id === this._authenticationService.currentUserId() ? 'sender' : 'receiver',
      };
      this._messageSubject.next([...currentMessages, formattedMessage]);
    });
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

  public joinRoom(roomCode: string) {
    if (!this._stompClient.connected) {
      this._stompClient.connect({}, () => {
        this.subscribeToRoom(roomCode);
      }, (error: any) => {
      });
    } else {
      this.subscribeToRoom(roomCode);
    }
  }

  public sendMessage(roomCode: string, message: MessageCreate) {
    this._stompClient.send(`/app/chat/${roomCode}`, {}, JSON.stringify(message))
  }

  public getMessageSubject() {
    return this._messageSubject.asObservable();
  }

  public getAllMessage(chatId: number, userId: number): Observable<any[]> {
    this._messageSubject.next([]);
    const url = `${this._baseUrl}/message/chat/${chatId}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this._httpClient.get<any[]>(url, { headers }).pipe(
      tap((messages) => {
        const processedMessages = messages.map(message => ({
          ...message,
          messageSide: message.user.id === userId ? 'sender' : 'receiver'
        }));
        const currentMessages = this._messageSubject.getValue();
        this._messageSubject.next([...currentMessages, ...processedMessages]);
      })
    );
  }

  public destroy() {
    if (this._currentSubscription) {
      this._currentSubscription.unsubscribe();
      this._currentSubscription = null;
    }
  }


}
