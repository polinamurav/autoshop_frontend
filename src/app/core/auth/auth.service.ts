import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, ReplaySubject, Subject} from "rxjs";
import {SignupResponseType} from "../../../types/signup-response.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import {LoginResponseType} from "../../../types/login-response.type";
import {RoleTypeType} from "../../../types/role-type.type";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public accessTokenKey: string = 'Token';
  public userRoleKey: string = 'roles';
  public isLogged$: Subject<boolean> = new Subject<boolean>();
  private isLogged: boolean = false;

  public isAdmin$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  private isAdmin: boolean = false;

  constructor(private http: HttpClient) {
    this.isLogged = !!localStorage.getItem(this.accessTokenKey);

    const storedRole = localStorage.getItem(this.userRoleKey);
    this.isAdmin = storedRole ? JSON.parse(storedRole).includes('ROLE_ADMIN') : false;

    this.isLogged$.next(this.isLogged);
    this.isAdmin$.next(this.isAdmin);
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
    return this.isLogged
  }

  public getIsAdminIn() {
    return this.isAdmin
  }

  public setToken(accessToken: string, userRole: string[]): void {
    localStorage.setItem(this.accessTokenKey, accessToken);
    localStorage.setItem(this.userRoleKey, JSON.stringify(userRole));

    this.isLogged = true;
    this.isAdmin = userRole.includes('ROLE_ADMIN');

    this.isLogged$.next(true);
    this.isAdmin$.next(this.isAdmin);
  }

  public updateUserRole(userRole: string): void {
    localStorage.setItem(this.userRoleKey, userRole);
    this.isAdmin = userRole === 'ROLE_ADMIN';
    this.isAdmin$.next(this.isAdmin);
  }

  public removeToken(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.userRoleKey);
    this.isLogged = false;
    this.isLogged$.next(false);

    this.isAdmin = false;
    this.isAdmin$.next(false);
  }

  public getUserRole(): { roles: RoleTypeType | null } {
    return {
      roles: localStorage.getItem(this.userRoleKey) as RoleTypeType | null
    }
  }

  public getToken(): { accessToken: string | null } {
    return {
      accessToken: localStorage.getItem(this.accessTokenKey),
    }
  }


}
