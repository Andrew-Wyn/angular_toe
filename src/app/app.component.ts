import { Component } from '@angular/core';

import { filter } from 'rxjs/operators';
import { OAuthService } from 'angular-oauth2-oidc';

import { AuthService } from './auth.service'

import { authPasswordFlowConfig } from './auth-password-flow.config'
import { googleAuthConfig } from './auth-google.config'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour Of Heroes';

  constructor(private authService: AuthService) {

    // Remember the selected configuration
    if (sessionStorage.getItem('flow') === 'google') {
      authService.oauthGoogleConfig();
    } else {
      authService.oauthPasswordFlowConfig();
    }
    
  }

}
