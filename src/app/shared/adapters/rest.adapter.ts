import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AdapterRestSignature } from './adapter';
import { Http, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';

/**
 * Rest response resource signature
 *
 * @export
 * @interface ResourceResponse
 */
export interface ResourceResponse {
  headers: Headers;
  data: any;
}

/**
 * Defines Rest adapter driver to comunicate
 * with REST API services.
 *
 * @export
 * @class RestAdapter
 * @implements {AdapterSignature}
 */
@Injectable()
export class RestAdapter implements AdapterRestSignature {
  constructor(private _http: Http) { }

  /**
   * Transform Rest resources on the signature
   * of ResourceResponse.
   *
   * @protected
   * @param {Response} response
   * @returns {ResourceResponse}
   */
  protected _toResponse(response: Response): ResourceResponse {
    return { headers: response.headers, data: response.json() };
  }

  /**
   * Generic method to make Http requests.
   *
   * @param {(string | Request)} url
   * @param {RequestOptionsArgs} [options]
   * @returns {Observable<any>}
   */
  request(url: string | Request, options?: RequestOptionsArgs): Observable<any> {
      return this._http.request(url, options).map(this._toResponse);
  }

  /**
   * Http get method.
   *
   * @param {string} path
   * @param {RequestOptionsArgs} params
   * @returns {Observable<ResourceResponse>}
   */
  get(path: string, params: RequestOptionsArgs): Observable<ResourceResponse> {
    return this._http.get(path, params).map(this._toResponse);
  }

  /**
   * Http post method.
   *
   * @param {string} path
   * @param {*} params
   * @param {RequestOptionsArgs} options
   * @returns {Observable<ResourceResponse>}
   */
  post(path: string, params: any, options: RequestOptionsArgs): Observable<ResourceResponse> {
    return this._http.post(path, params, options).map(this._toResponse);
  }

  /**
   * Http put method.
   *
   * @param {string} path
   * @param {*} params
   * @param {RequestOptionsArgs} options
   * @returns {Observable<ResourceResponse>}
   */
  put(path: string, params: any, options: RequestOptionsArgs): Observable<ResourceResponse> {
    return this._http.put(path, params).map(this._toResponse);
  }

  /**
   * Http delete method.
   *
   * @param {string} path
   * @param {RequestOptionsArgs} params
   * @returns {Observable<ResourceResponse>}
   */
  delete(path: string, params: RequestOptionsArgs): Observable<ResourceResponse> {
    return this._http.delete(path, params).map(this._toResponse);
  }
}
