import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatMenuModule } from '@angular/material/menu';
import { faBell, faCode, faGear, faHome, faMessage, faPeopleGroup, faRightFromBracket, faShop, faUser, faUserGroup, faVideo } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from '../../../authentication/services/authentication.service';
import { ChatNotificationLayoutComponent } from '../chat-notification-layout/chat-notification-layout.component';
import { FullscreenOverlayContainer, Overlay, OverlayContainer } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ChatService } from '../../services/chat.service';
import { ChatModel } from '../../models/chat.model';

@Component({
  selector: 'app-header-layout',
  imports: [FontAwesomeModule, MatMenuModule],
  templateUrl: './header-layout.component.html',
  styleUrl: './header-layout.component.css',
  providers: [{ provide: OverlayContainer, useClass: FullscreenOverlayContainer }],
})
export class HeaderLayoutComponent implements OnInit {

  private _router = inject(Router);
  private _authenticationService = inject(AuthenticationService);
  private _overlay = inject(Overlay);
  private _chatService = inject(ChatService);

  public faHome = faHome;
  public faUserGroup = faUserGroup;
  public faVideo = faVideo;
  public faShop = faShop;
  public faPeopleGroup = faPeopleGroup;
  public faConfig = faGear;
  public faMessage = faMessage;
  public faBell = faBell;
  public faUser = faUser;
  public faClose = faRightFromBracket;
  public faCode = faCode;
  public notificationsVisible: boolean = true;
  public countNotification: number = 0;

  constructor() {
    this._chatService.initConnectionSocket();
  }
  ngOnInit(): void {
    this.getAllChatNotificationsByUser();
    this.listenerNotification();
  }

  private getAllChatNotificationsByUser() {
    const userId = this._authenticationService.currentUserId();
    this._chatService.getAllChatNotificationsByUser(userId).subscribe({
      next: (data: ChatModel[]) => {
        this.countNotification = data.length;
      }
    })
  }

  public listenerNotification() {
    this._chatService.joinUser(this._authenticationService.currentUserId());
    this._chatService.getNotificationSubject().subscribe((data: any) => {
      this.getAllChatNotificationsByUser();
    });
  }

  public openChat() {
    const overlayRef = this._overlay.create({
      hasBackdrop: true,
      panelClass: 'overlay-panel',
      positionStrategy: this._overlay
        .position()
        .global()
        .top('-100%')
    });
    setTimeout(() => {
      const dialogPortal = new ComponentPortal(ChatNotificationLayoutComponent);
      overlayRef.attach(dialogPortal);
      overlayRef.backdropClick().subscribe(() => overlayRef.detach());
      const keydownListener = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          overlayRef.detach();
          document.removeEventListener('keydown', keydownListener);
        }
      };
      document.addEventListener('keydown', keydownListener);
    }, 200);
  }

  public openHome() {
    this._router.navigateByUrl('/home');
  }

  public logOut() {
    this._authenticationService.logout();
    this._router.navigateByUrl('');
  }

}
