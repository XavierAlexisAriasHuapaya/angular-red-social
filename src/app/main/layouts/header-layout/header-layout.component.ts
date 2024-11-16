import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBell, faGear, faHome, faMessage, faPeopleGroup, faShop, faUser, faUserGroup, faVideo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header-layout',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './header-layout.component.html',
  styleUrl: './header-layout.component.css'
})
export class HeaderLayoutComponent {
  faHome = faHome;
  faUserGroup = faUserGroup;
  faVideo = faVideo;
  faShop = faShop;
  faPeopleGroup = faPeopleGroup;
  faConfig = faGear;
  faMessage = faMessage;
  faBell = faBell;
  faUser = faUser;

  private router = inject(Router);

  openHome() {
    this.router.navigateByUrl('/home');
  }

}
