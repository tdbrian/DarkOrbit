/* tslint:disable */
import { Injectable } from '@angular/core';
import {
  HttpClient, HttpRequest, HttpResponse, 
  HttpHeaders, HttpParams } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { filter } from 'rxjs/operators/filter';

import { UserEntity } from '../models/user-entity';

@Injectable()
export class UsersService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
   ApiUsersGetResponse(): Observable<HttpResponse<UserEntity[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/api/Users`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: UserEntity[] = null;
        _body = _resp.body as UserEntity[]
        return _resp.clone({body: _body}) as HttpResponse<UserEntity[]>;
      })
    );
  }

  /**
   * @return Success
   */
   ApiUsersGet(): Observable<UserEntity[]> {
    return this.ApiUsersGetResponse().pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param entity undefined
   */
   ApiUsersPostResponse(entity?: UserEntity): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = entity;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/api/Users`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: void = null;
        
        return _resp.clone({body: _body}) as HttpResponse<void>;
      })
    );
  }

  /**
   * @param entity undefined
   */
   ApiUsersPost(entity?: UserEntity): Observable<void> {
    return this.ApiUsersPostResponse(entity).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
   ApiUsersByIdGetResponse(id: string): Observable<HttpResponse<UserEntity>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/api/Users/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: UserEntity = null;
        _body = _resp.body as UserEntity
        return _resp.clone({body: _body}) as HttpResponse<UserEntity>;
      })
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
   ApiUsersByIdGet(id: string): Observable<UserEntity> {
    return this.ApiUsersByIdGetResponse(id).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param params The `UsersService.ApiUsersByIdPutParams` containing the following parameters:
   *
   * - `id`: 
   *
   * - `entity`:
   */
   ApiUsersByIdPutResponse(params: UsersService.ApiUsersByIdPutParams): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.entity;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/api/Users/${params.id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: void = null;
        
        return _resp.clone({body: _body}) as HttpResponse<void>;
      })
    );
  }

  /**
   * @param params The `UsersService.ApiUsersByIdPutParams` containing the following parameters:
   *
   * - `id`: 
   *
   * - `entity`:
   */
   ApiUsersByIdPut(params: UsersService.ApiUsersByIdPutParams): Observable<void> {
    return this.ApiUsersByIdPutResponse(params).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param id undefined
   */
   ApiUsersByIdDeleteResponse(id: string): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/api/Users/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: void = null;
        
        return _resp.clone({body: _body}) as HttpResponse<void>;
      })
    );
  }

  /**
   * @param id undefined
   */
   ApiUsersByIdDelete(id: string): Observable<void> {
    return this.ApiUsersByIdDeleteResponse(id).pipe(
      map(_r => _r.body)
    );
  }
}

export module UsersService {

  /**
   * Parameters for ApiUsersByIdPut
   */
   export interface ApiUsersByIdPutParams {

    id: string;

    entity?: UserEntity;
  }
}
