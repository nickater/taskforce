import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const baseUrl = environment.host;

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  private loggedIn = false;
  private token: string;

  constructor(private http: HttpClient) {}

  setLoggedIn(loggedIn: boolean, token?: string) {
    this.loggedIn = loggedIn;
    this.token = token;
  }

  request<T>(
    method: HttpMethods,
    route: string,
    body?: any,
    queryParams?: HttpParams
  ) {
    const header = this.loggedIn
      ? { Authorization: `Bearer ${this.token}` }
      : undefined;
    const headers = new HttpHeaders(header);

    if (method === 'GET') {
      return this.get<T>(route, headers, queryParams);
    }

    if (method === 'POST') {
      return this.post<T>(route, headers, body, queryParams);
    }

    if (method === 'PUT') {
      return this.put<T>(route, headers, body, queryParams);
    }
  }

  private get<T>(
    route: string,
    headers: HttpHeaders,
    params?: HttpParams
  ): Observable<T> {
    return this.http.get<T>(`${baseUrl}${route}`, { headers, params });
  }

  private post<T>(
    route: string,
    headers: HttpHeaders,
    body?: any,
    params?: HttpParams
  ): Observable<T> {
    return this.http.post<T>(baseUrl + route, body, {
      headers,
      params,
    });
  }

  private put<T>(
    route: string,
    headers: HttpHeaders,
    body?: any,
    params?: HttpParams
  ): Observable<T> {
    return this.http.put<T>(baseUrl + route, body, {
      headers,
      params,
    });
  }
}

export type HttpMethods = 'GET' | 'POST' | 'PUT' | 'DELETE';
