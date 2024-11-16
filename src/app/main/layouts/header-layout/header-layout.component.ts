import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatMenuModule } from '@angular/material/menu';
import { faBell, faClose, faGear, faHome, faMessage, faPeopleGroup, faRightFromBracket, faRightToBracket, faShop, faUser, faUserGroup, faVideo } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from '../../../authentication/services/authentication.service';

@Component({
  selector: 'app-header-layout',
  standalone: true,
  imports: [FontAwesomeModule, MatMenuModule],
  templateUrl: './header-layout.component.html',
  styleUrl: './header-layout.component.css'
})
export class HeaderLayoutComponent {
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

  openHome() {
    this.router.navigateByUrl('/home');
  }

  logOut() {
    this.authenticationService.logout();
    this.router.navigateByUrl('');
  }

}
