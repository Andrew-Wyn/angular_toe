import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { MessageService } from './message.service'

import { OAuthService } from 'angular-oauth2-oidc';

import { googleAuthConfig } from './auth-google.config'
import { authPasswordFlowConfig } from './auth-password-flow.config'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean;
  redirectUrl: string;

  userName: string ;
  password: string;

  constructor (
    private messageService: MessageService,
    public router: Router,
    private oauthService: OAuthService
  ) {
    this.isLoggedIn = false;
    this.redirectUrl = "";
    this.userName = "max";
    this.password = "geheim";
  }

  oauthGoogleConfig() {
    this.oauthService.configure(googleAuthConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
    sessionStorage.setItem('flow', 'google');
  }

  oauthPasswordFlowConfig() {
    this.oauthService.configure(authPasswordFlowConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  loginPersonal(): void { // la logica di autenticazione va qua
    /* return of(true).pipe(
      delay(1000),
      tap(val => {
        this.isLoggedIn = true;
        this.messageService.add("logged In ...");
        this.router.navigate([this.redirectUrl]);
      })
    );*/

    console.log(this.userName, this.password)
    this.oauthService
      .fetchTokenUsingPasswordFlowAndLoadUserProfile(
        this.userName,
        this.password
      )
      .then(() => {
        console.debug('successfully logged in');
        this.isLoggedIn = true;
        this.router.navigate([this.redirectUrl]);
      })
      .catch(err => {
        console.error('error logging in', err);
        this.isLoggedIn = false;
      });
  }

  public login() {
    this.oauthGoogleConfig();
    this.oauthService.initImplicitFlow();
  }


  logout(): void {
    this.oauthService.logOut(true);
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

}
