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

import { CommandEntity } from '../models/command-entity';

@Injectable()
export class CommandsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
   ApiCommandsGetResponse(): Observable<HttpResponse<CommandEntity[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/api/Commands`,
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
        let _body: CommandEntity[] = null;
        _body = _resp.body as CommandEntity[]
        return _resp.clone({body: _body}) as HttpResponse<CommandEntity[]>;
      })
    );
  }

  /**
   * @return Success
   */
   ApiCommandsGet(): Observable<CommandEntity[]> {
    return this.ApiCommandsGetResponse().pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param entity undefined
   */
   ApiCommandsPostResponse(entity?: CommandEntity): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = entity;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/api/Commands`,
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
   ApiCommandsPost(entity?: CommandEntity): Observable<void> {
    return this.ApiCommandsPostResponse(entity).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
   ApiCommandsByIdGetResponse(id: string): Observable<HttpResponse<CommandEntity>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/api/Commands/${id}`,
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
        let _body: CommandEntity = null;
        _body = _resp.body as CommandEntity
        return _resp.clone({body: _body}) as HttpResponse<CommandEntity>;
      })
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
   ApiCommandsByIdGet(id: string): Observable<CommandEntity> {
    return this.ApiCommandsByIdGetResponse(id).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param params The `CommandsService.ApiCommandsByIdPutParams` containing the following parameters:
   *
   * - `id`: 
   *
   * - `entity`:
   */
   ApiCommandsByIdPutResponse(params: CommandsService.ApiCommandsByIdPutParams): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.entity;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/api/Commands/${params.id}`,
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
   * @param params The `CommandsService.ApiCommandsByIdPutParams` containing the following parameters:
   *
   * - `id`: 
   *
   * - `entity`:
   */
   ApiCommandsByIdPut(params: CommandsService.ApiCommandsByIdPutParams): Observable<void> {
    return this.ApiCommandsByIdPutResponse(params).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param id undefined
   */
   ApiCommandsByIdDeleteResponse(id: string): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/api/Commands/${id}`,
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
   ApiCommandsByIdDelete(id: string): Observable<void> {
    return this.ApiCommandsByIdDeleteResponse(id).pipe(
      map(_r => _r.body)
    );
  }
}

export module CommandsService {

  /**
   * Parameters for ApiCommandsByIdPut
   */
   export interface ApiCommandsByIdPutParams {

    id: string;

    entity?: CommandEntity;
  }
}
