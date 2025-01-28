import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductType} from "../../../types/product.type";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AutomobilesService {

  constructor(private http: HttpClient) { }

  getAutomobiles(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(environment.api + 'automobiles');
  }

  getAutomobile(url: string): Observable<ProductType> {
    return this.http.get<ProductType>(environment.api + 'automobiles/' + url);
  }
}
