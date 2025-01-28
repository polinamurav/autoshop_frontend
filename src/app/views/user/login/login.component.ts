import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../core/auth/auth.service";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {LoginResponseType} from "../../../../types/login-response.type";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  // login() {
  //   this.authService.login(signupResponse.username, signupResponse.password)
  //     .subscribe({
  //       next: (dataLogin: DefaultResponseType | LoginResponseType) => {
  //         let error = null;
  //         if ((dataLogin as DefaultResponseType).status === 400) {
  //           error = (dataLogin as DefaultResponseType).message;
  //         }
  //
  //         const loginResponse = dataLogin as LoginResponseType;
  //         if (!loginResponse.token) {
  //           error = 'Ошибка авторизации';
  //         }
  //
  //         if (error) {
  //           // this._snackBar.open(error);
  //           throw new Error(error);
  //         }
  //
  //         this.authService.setToken(loginResponse.token);
  //         // this._snackBar.open('Вы успешно зарегистрировались');
  //         alert('Вы успешно зарегистрировались');
  //         this.router.navigate(['/']);
  //       },
  //       error: (errorResponse: HttpErrorResponse) => {
  //         if (errorResponse.error && errorResponse.error.message) {
  //           // this._snackBar.open(errorResponse.error.message);
  //           console.log(errorResponse.error.message);
  //         } else {
  //           // this._snackBar.open('Ошибка регистрации');
  //           console.log('Ошибка авторизации');
  //         }
  //       }
  //     })
  // }
}
