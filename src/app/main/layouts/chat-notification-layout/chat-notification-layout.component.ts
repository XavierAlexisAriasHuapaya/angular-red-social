import { Component, inject, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEllipsis, faMaximize, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { ChatService } from '../../services/chat.service';
import { ChatAllUser } from '../../interfaces/chat-all-user.interface';
import { AuthenticationService } from '../../../authentication/services/authentication.service';

@Component({
  selector: 'app-chat-notification-layout',
  imports: [FontAwesomeModule],
  templateUrl: './chat-notification-layout.component.html',
  styleUrl: './chat-notification-layout.component.css'
})
export class ChatNotificationLayoutComponent implements OnInit {

  private _chatService = inject(ChatService);
  private _authenticationService = inject(AuthenticationService);

  public faMaximize = faMaximize;
  public faEllipsis = faEllipsis;
  public faPenToSquare = faPenToSquare;
  public chats: ChatAllUser[] = [];

  constructor() { }
  ngOnInit(): void {
    this._chatService.getChatAllByUser(this._authenticationService.currentUserId()).subscribe({
      next: (data) => {
        console.log(data);
        this.chats = data;
      }
    });
  }



}