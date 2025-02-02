import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SignupResponseType} from "../../../types/signup-response.type";
import {environment} from "../../../environments/environment";
import {StatResponseType} from "../../../types/stat-response.type";

@Injectable({
  providedIn: 'root'
})
export class StatService {

  constructor(private http: HttpClient) { }

  getStats(): Observable<StatResponseType> {
    return this.http.get<StatResponseType>(environment.api + 'stats');
  }
}
