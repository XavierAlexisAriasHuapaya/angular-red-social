import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEllipsis, faSearch } from '@fortawesome/free-solid-svg-icons';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-aside-layout',
  standalone: true,
  imports: [FontAwesomeModule, MatBadgeModule],
  templateUrl: './aside-layout.component.html',
  styleUrl: './aside-layout.component.css'
})
export class AsideLayoutComponent {
  faSearch = faSearch;
  faEllipsis = faEllipsis;
}
