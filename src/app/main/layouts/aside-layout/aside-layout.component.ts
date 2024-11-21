import { Component, inject, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEllipsis, faSearch } from '@fortawesome/free-solid-svg-icons';
import { MatBadgeModule } from '@angular/material/badge';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserPagination } from '../../interfaces/user-pagination.interface';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../../authentication/services/authentication.service';

@Component({
  selector: 'app-aside-layout',
  standalone: true,
  imports: [FontAwesomeModule, MatBadgeModule, CommonModule],
  templateUrl: './aside-layout.component.html',
  styleUrl: './aside-layout.component.css'
})
export class AsideLayoutComponent implements OnInit {

  private router = inject(Router);
  private userService = inject(UserService);
  private authenticationService = inject(AuthenticationService);

  public userPage!: UserPagination[];
  public faSearch = faSearch;
  public faEllipsis = faEllipsis;

  ngOnInit(): void {
    this.getUsersExcludeId();
  }

  openChat(userId: number) {
    this.router.navigate(['/main/chat', userId]);
    // this.router.navigateByUrl('/main/chat');
  }

  getUsersExcludeId() {
    const userId = this.authenticationService.currentUserId();
    this.userService.getUsersExcludeId(userId).subscribe({
      next: (data) => {
        this.userPage = data;
      }
    })
  }

}
