import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService
    ) { }

  ngOnInit(): void {
  }

  login_personal() {
    this.authService.loginPersonal();
  }

  login() {
    this.authService.login();
  }


}
