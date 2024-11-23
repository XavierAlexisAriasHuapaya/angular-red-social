import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatMenuModule } from '@angular/material/menu';
import { faBell, faGear, faHome, faMessage, faPeopleGroup, faRightFromBracket, faShop, faUser, faUserGroup, faVideo } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from '../../../authentication/services/authentication.service';
import { ChatNotificationLayoutComponent } from '../chat-notification-layout/chat-notification-layout.component';
import { FullscreenOverlayContainer, Overlay, OverlayContainer } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-header-layout',
  imports: [FontAwesomeModule, MatMenuModule],
  templateUrl: './header-layout.component.html',
  styleUrl: './header-layout.component.css',
  providers: [{ provide: OverlayContainer, useClass: FullscreenOverlayContainer }],
})
export class HeaderLayoutComponent {

  private _router = inject(Router);
  private _authenticationService = inject(AuthenticationService);
  private _overlay = inject(Overlay);

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
  public notificationsVisible: boolean = true;

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
          document.removeEventListener('keydown', keydownListener); // Limpieza
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
