import { Component, Inject, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatMenuModule } from '@angular/material/menu';
import { faBell, faGear, faHome, faMessage, faPeopleGroup, faRightFromBracket, faShop, faUser, faUserGroup, faVideo } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from '../../../authentication/services/authentication.service';
import { ChatNotificationLayoutComponent } from "../chat-notification-layout/chat-notification-layout.component";
import { ChatNotificationDirective } from '../../directives/chat-notification.directive';

@Component({
    selector: 'app-header-layout',
    imports: [FontAwesomeModule, MatMenuModule, ChatNotificationLayoutComponent, ChatNotificationDirective],
    templateUrl: './header-layout.component.html',
    styleUrl: './header-layout.component.css'
})
export class HeaderLayoutComponent {

  @ViewChild(ChatNotificationLayoutComponent) chatNofitication!: ChatNotificationLayoutComponent;

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

  private router = inject(Router);
  private authenticationService = inject(AuthenticationService);

  public notificationsVisible: boolean = true;

  public openChat() {
    this.chatNofitication.enabledChat(this.notificationsVisible);
    this.notificationsVisible = !this.notificationsVisible;
  }

  public clickOutside() {
    this.chatNofitication.clickOutside();
    this.notificationsVisible = true;
  }

  openHome() {
    this.router.navigateByUrl('/home');
  }

  logOut() {
    this.authenticationService.logout();
    this.router.navigateByUrl('');
  }

}
