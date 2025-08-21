import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RestMethods } from '../models/master';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  static http: HttpClient = null;

  constructor(private injector: Injector) {
    RestService.http = injector.get<HttpClient>(HttpClient);
  }

  Api<T>(
    method: RestMethods | string,
    url: string,
    payload?: unknown,
    params?: HttpParams,
    headers?: HttpHeaders,
    responseType: string = 'json'
  ): Observable<T> {
    return RestService.http.request<T>(method, url, {
      body: payload,
      responseType: responseType as 'json',
      params,
      headers,
      withCredentials: true,
    });
  }
}
