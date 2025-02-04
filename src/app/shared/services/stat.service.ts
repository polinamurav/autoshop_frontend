import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {StatResponseType} from "../../../types/stat-response.type";
import {StatAllResponseType} from "../../../types/stat-all-response.type";
import {AutomobileResponseType} from "../../../types/automobile-response.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import {StatModelResponseType} from "../../../types/stat-model-response.type";

@Injectable({
  providedIn: 'root'
})
export class StatService {

  constructor(private http: HttpClient) { }

  getStats(): Observable<StatResponseType> {
    return this.http.get<StatResponseType>(environment.api + 'stats');
  }

  getStatAll(): Observable<StatAllResponseType> {
    return this.http.get<StatAllResponseType>(environment.api + 'stats/all');
  }

  getStatIncome(): Observable<AutomobileResponseType[]> {
    return this.http.get<AutomobileResponseType[]>(environment.api + 'stats/income');
  }

  getStatCount(): Observable<AutomobileResponseType[]> {
    return this.http.get<AutomobileResponseType[]>(environment.api + 'stats/count');
  }

  getStatModel(): Observable<StatModelResponseType[]> {
    return this.http.get<StatModelResponseType[]>(environment.api + 'stats/model');
  }

  deleteStat(): Observable<DefaultResponseType> {
    return this.http.delete<DefaultResponseType>(environment.api + 'stats/reset');
  }
}
