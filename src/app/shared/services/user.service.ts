import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SignupResponseType} from "../../../types/signup-response.type";
import {environment} from "../../../environments/environment";
import {DefaultResponseType} from "../../../types/default-response.type";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<SignupResponseType[]> {
    return this.http.get<SignupResponseType[]>(environment.api + 'users');
  }

  updateUser(user: SignupResponseType): Observable<SignupResponseType | DefaultResponseType> {
    return this.http.put<SignupResponseType | DefaultResponseType>(
      `${environment.api}users/editRole/${user.id}?roleName=${user.roles}`,
      {}
    );
  }

  deleteUser(id: string): Observable<SignupResponseType | DefaultResponseType> {
    return this.http.delete<SignupResponseType | DefaultResponseType>(environment.api + 'users/delete/' + id);
  }
}
