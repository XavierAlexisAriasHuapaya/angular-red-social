import { Component, inject, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEllipsis, faMaximize, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { ChatService } from '../../services/chat.service';
import { ChatAllUser } from '../../interfaces/chat-all-user.interface';
import { AuthenticationService } from '../../../authentication/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-notification-layout',
  imports: [FontAwesomeModule],
  templateUrl: './chat-notification-layout.component.html',
  styleUrl: './chat-notification-layout.component.css'
})
export class ChatNotificationLayoutComponent implements OnInit {

  private _chatService = inject(ChatService);
  private _authenticationService = inject(AuthenticationService);
  private _router = inject(Router);

  public faMaximize = faMaximize;
  public faEllipsis = faEllipsis;
  public faPenToSquare = faPenToSquare;
  public chats: ChatAllUser[] = [];

  constructor() { }
  ngOnInit(): void {
    this._chatService.getChatAllByUser(this._authenticationService.currentUserId()).subscribe({
      next: (data) => {
        this.chats = data;
      }
    });
  }

  public openChat(userId: number) {
    this._router.navigate(['/main/chat', userId])
    const escapeEvent = new KeyboardEvent('keydown', {
      key: 'Escape',
      code: 'Escape',
      bubbles: true,
      cancelable: true,
    });
    document.addEventListener('keydown', (event) => {
    });
    document.dispatchEvent(escapeEvent);
  }

}