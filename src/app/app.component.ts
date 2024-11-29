import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, effect, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthenticationService } from './authentication/services/authentication.service';
import { AuthenticationStatus } from './authentication/interfaces/authentication-status.enum';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  title = 'red-social';

  private _authenticationService = inject(AuthenticationService);
  private _router = inject(Router);
  private _ngxSpinnerService = inject(NgxSpinnerService);

  /**
   *
   */
  constructor() {
    this._ngxSpinnerService.show();
  }

  public finishedAuthCheck = computed<boolean>(() => {
    console.log(this._authenticationService.authStatus())
    if (this._authenticationService.authStatus() === AuthenticationStatus.checking) {
      return false;
    }
    return true;
  });

  public authStatusChangedEffect = effect(() => {
    switch (this._authenticationService.authStatus()) {
      case AuthenticationStatus.checking:
        return;
      case AuthenticationStatus.authenticated:
        this._router.navigateByUrl('/main');
        return;
      case AuthenticationStatus.notAuthenticated:
        this._router.navigateByUrl('/auth/login');
        return;
    }
  });

}
