import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEllipsis, faMaximize, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { ChatNotificationDirective } from '../../directives/chat-notification.directive';

@Component({
  selector: 'app-chat-notification-layout',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './chat-notification-layout.component.html',
  styleUrl: './chat-notification-layout.component.css'
})
export class ChatNotificationLayoutComponent {

  @ViewChild('chatContainer') chatContainer!: ElementRef;

  public faMaximize = faMaximize;
  public faEllipsis = faEllipsis;
  public faPenToSquare = faPenToSquare;
  public notificationsVisible: boolean = false;

  constructor() { }

  public clickOutside() {
    this.notificationsVisible = false;
  }

  public enabledChat(visible: boolean) {
    // this.notificationsVisible = !this.notificationsVisible;
    this.notificationsVisible = visible;
  }

}