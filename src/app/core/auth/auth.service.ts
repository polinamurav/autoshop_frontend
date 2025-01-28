import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, Subject} from "rxjs";
import {SignupResponseType} from "../../../types/signup-response.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import {LoginResponseType} from "../../../types/login-response.type";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public accessTokenKey: string = 'Token';
  public isLogged$: Subject<boolean> = new Subject<boolean>();
  private isLogged: boolean = false;

  constructor(private http: HttpClient) {
    this.isLogged = !!localStorage.getItem(this.accessTokenKey)
  }


  login(username: string, password: string): Observable<LoginResponseType | DefaultResponseType> {
    return this.http.post<LoginResponseType | DefaultResponseType>(environment.api + 'auth', {
      username, password
    })
  }

  signup(username: string, email: string, password: string, name: string, phone: string): Observable<SignupResponseType | DefaultResponseType> {
    return this.http.post<SignupResponseType | DefaultResponseType>(environment.api + 'registration', {
      username, email, password, name, phone
    })
  }

  public getIsLoggedIn() {
    return this.isLogged;
  }

  public setToken(accessToken: string): void {
    localStorage.setItem(this.accessTokenKey, accessToken);
    this.isLogged = true;
    this.isLogged$.next(true);
  }

  public removeToken(): void {
    localStorage.removeItem(this.accessTokenKey);
    this.isLogged = false;
    this.isLogged$.next(false);
  }

  // logout(): void {
  //   this.removeToken();
  // }

  public getToken(): {accessToken: string | null} {
    return {
      accessToken: localStorage.getItem(this.accessTokenKey),
    }
  }


}
