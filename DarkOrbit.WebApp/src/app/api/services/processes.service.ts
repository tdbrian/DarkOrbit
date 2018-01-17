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

import { ProcessEntity } from '../models/process-entity';

@Injectable()
export class ProcessesService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
   ApiProcessesGetResponse(): Observable<HttpResponse<ProcessEntity[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/api/Processes`,
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
        let _body: ProcessEntity[] = null;
        _body = _resp.body as ProcessEntity[]
        return _resp.clone({body: _body}) as HttpResponse<ProcessEntity[]>;
      })
    );
  }

  /**
   * @return Success
   */
   ApiProcessesGet(): Observable<ProcessEntity[]> {
    return this.ApiProcessesGetResponse().pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param entity undefined
   */
   ApiProcessesPostResponse(entity?: ProcessEntity): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = entity;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/api/Processes`,
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
   ApiProcessesPost(entity?: ProcessEntity): Observable<void> {
    return this.ApiProcessesPostResponse(entity).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
   ApiProcessesByIdGetResponse(id: string): Observable<HttpResponse<ProcessEntity>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/api/Processes/${id}`,
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
        let _body: ProcessEntity = null;
        _body = _resp.body as ProcessEntity
        return _resp.clone({body: _body}) as HttpResponse<ProcessEntity>;
      })
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
   ApiProcessesByIdGet(id: string): Observable<ProcessEntity> {
    return this.ApiProcessesByIdGetResponse(id).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param params The `ProcessesService.ApiProcessesByIdPutParams` containing the following parameters:
   *
   * - `id`: 
   *
   * - `entity`:
   */
   ApiProcessesByIdPutResponse(params: ProcessesService.ApiProcessesByIdPutParams): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.entity;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/api/Processes/${params.id}`,
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
   * @param params The `ProcessesService.ApiProcessesByIdPutParams` containing the following parameters:
   *
   * - `id`: 
   *
   * - `entity`:
   */
   ApiProcessesByIdPut(params: ProcessesService.ApiProcessesByIdPutParams): Observable<void> {
    return this.ApiProcessesByIdPutResponse(params).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param id undefined
   */
   ApiProcessesByIdDeleteResponse(id: string): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/api/Processes/${id}`,
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
   ApiProcessesByIdDelete(id: string): Observable<void> {
    return this.ApiProcessesByIdDeleteResponse(id).pipe(
      map(_r => _r.body)
    );
  }
}

export module ProcessesService {

  /**
   * Parameters for ApiProcessesByIdPut
   */
   export interface ApiProcessesByIdPutParams {

    id: string;

    entity?: ProcessEntity;
  }
}
