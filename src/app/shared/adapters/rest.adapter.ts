import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AdapterSignature } from './adapter';
import { Http, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';

export interface ResourceResponse {
  headers: Headers;
  data: any;
}

@Injectable()
export class RestAdapter implements AdapterSignature {
  constructor(private _http: Http) { }

  protected _toResponse(response: Response): ResourceResponse {
    return { headers: response.headers, data: response.json() };
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<any> {
      return this._http.request(url, options).map(this._toResponse);
  }

  get(path: string, params: any): Observable<ResourceResponse> {
    return this._http.get(path).map(this._toResponse);
  }

  post(path: string, params: any): Observable<ResourceResponse> {
    return this._http.post(path, params).map(this._toResponse);
  }

  put(path: string, params: any): Observable<ResourceResponse> {
    return this._http.put(path, params).map(this._toResponse);
  }

  delete(path: string, params: any): Observable<ResourceResponse> {
    return this._http.delete(path, params).map(this._toResponse);
  }
}
