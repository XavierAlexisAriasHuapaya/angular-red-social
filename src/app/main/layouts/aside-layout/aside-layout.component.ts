import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEllipsis, faSearch } from '@fortawesome/free-solid-svg-icons';
import { MatBadgeModule } from '@angular/material/badge';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aside-layout',
  standalone: true,
  imports: [FontAwesomeModule, MatBadgeModule],
  templateUrl: './aside-layout.component.html',
  styleUrl: './aside-layout.component.css'
})
export class AsideLayoutComponent {

  private router = inject(Router);

  faSearch = faSearch;
  faEllipsis = faEllipsis;

  openChat() {
    this.router.navigateByUrl('/main/chat');
  }

}
