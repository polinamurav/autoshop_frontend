import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AutomobileResponseType} from "../../../types/automobile-response.type";
import {environment} from "../../../environments/environment";
import {AutomobileType} from "../../../types/automobile.type";
import {DefaultResponseType} from "../../../types/default-response.type";

@Injectable({
  providedIn: 'root'
})
export class AutomobilesService {

  constructor(private http: HttpClient) { }

  getAutomobiles(): Observable<AutomobileResponseType[]> {
    return this.http.get<AutomobileResponseType[]>(environment.api + 'automobiles');
  }

  getAutomobile(url: string): Observable<AutomobileResponseType> {
    return this.http.get<AutomobileResponseType>(environment.api + 'automobiles/' + url);
  }

  addAutomobile(params: AutomobileType): Observable<AutomobileResponseType | DefaultResponseType> {
    return this.http.post<AutomobileResponseType | DefaultResponseType>(environment.api + 'orders', params)
  }
}
