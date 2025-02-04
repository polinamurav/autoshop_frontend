import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ModelType} from "../../../types/model.type";
import {environment} from "../../../environments/environment";
import {ApplicationResponseType} from "../../../types/application-response.type";

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http: HttpClient) { }

  getApplications(): Observable<ApplicationResponseType[]> {
    return this.http.get<ApplicationResponseType[]>(environment.api + 'application');
  }

  doneApplications(id: string): Observable<ApplicationResponseType> {
    return this.http.post<ApplicationResponseType>(environment.api + 'application/' + id + '/done', {});
  }

  rejectApplications(id: string): Observable<ApplicationResponseType> {
    return this.http.post<ApplicationResponseType>(environment.api + 'application/' + id + '/reject', {});
  }

  deleteApplications(id: string): Observable<ApplicationResponseType> {
    return this.http.post<ApplicationResponseType>(environment.api + 'application/' + id + '/delete', {});
  }

  getUserApplication(id: string): Observable<ApplicationResponseType> {
    return this.http.post<ApplicationResponseType>(environment.api + 'automobiles/' + id + '/application', {});
  }

}
