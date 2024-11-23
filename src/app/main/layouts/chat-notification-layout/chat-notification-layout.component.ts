import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEllipsis, faMaximize, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-chat-notification-layout',
    imports: [FontAwesomeModule],
    templateUrl: './chat-notification-layout.component.html',
    styleUrl: './chat-notification-layout.component.css'
})
export class ChatNotificationLayoutComponent {

  public faMaximize = faMaximize;
  public faEllipsis = faEllipsis;
  public faPenToSquare = faPenToSquare;

  constructor() { }

}