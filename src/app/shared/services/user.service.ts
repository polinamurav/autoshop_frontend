import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SignupResponseType} from "../../../types/signup-response.type";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<SignupResponseType[]> {
    return this.http.get<SignupResponseType[]>(environment.api + 'users');
  }
}
