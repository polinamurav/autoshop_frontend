import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ModelType} from "../../../types/model.type";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http: HttpClient) { }

  getApplications(): Observable<ModelType[]> {
    return this.http.get<ModelType[]>(environment.api + 'models');
  }

}
