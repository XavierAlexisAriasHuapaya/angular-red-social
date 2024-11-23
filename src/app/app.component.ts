import { Component, computed, effect, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthenticationService } from './authentication/services/authentication.service';
import { AuthenticationStatus } from './authentication/interfaces/authentication-status.enum';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'red-social';

  private authenticationService = inject(AuthenticationService);
  private router = inject(Router);

  public authStatusChangedEffect = effect(() => {
    switch (this.authenticationService.authStatus()) {
      case AuthenticationStatus.checking:
        return;
      case AuthenticationStatus.authenticated:
        return;
      case AuthenticationStatus.notAuthenticated:
        return;
    }
  });

}
