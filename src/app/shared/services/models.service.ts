import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {DefaultResponseType} from "../../../types/default-response.type";
import {environment} from "../../../environments/environment";
import {ModelType} from "../../../types/model.type";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ModelsService {

  constructor(private http: HttpClient) { }

  getModels(): Observable<ModelType[]> {
    return this.http.get<ModelType[]>(environment.api + 'models');
  }

  addModel(value: { name: string }): Observable<ModelType | DefaultResponseType> {
    return this.http.post<ModelType | DefaultResponseType>(environment.api + 'models/add', value);
  }

  updateModel(value: ModelType): Observable<ModelType | DefaultResponseType> {
    return this.http.put<ModelType | DefaultResponseType>(environment.api + 'models/' + value.id + '/edit', value);
  }

  deleteModel(value: ModelType): Observable<ModelType | DefaultResponseType> {
    return this.http.delete<ModelType | DefaultResponseType>(environment.api + 'models/' + value.id + '/delete');
  }
}
