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

import { MicroServiceEntity } from '../models/micro-service-entity';

@Injectable()
export class MicroServicesService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
   ApiMicroServicesGetResponse(): Observable<HttpResponse<MicroServiceEntity[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/api/MicroServices`,
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
        let _body: MicroServiceEntity[] = null;
        _body = _resp.body as MicroServiceEntity[]
        return _resp.clone({body: _body}) as HttpResponse<MicroServiceEntity[]>;
      })
    );
  }

  /**
   * @return Success
   */
   ApiMicroServicesGet(): Observable<MicroServiceEntity[]> {
    return this.ApiMicroServicesGetResponse().pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param entity undefined
   */
   ApiMicroServicesPostResponse(entity?: MicroServiceEntity): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = entity;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/api/MicroServices`,
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
   ApiMicroServicesPost(entity?: MicroServiceEntity): Observable<void> {
    return this.ApiMicroServicesPostResponse(entity).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
   ApiMicroServicesByIdGetResponse(id: string): Observable<HttpResponse<MicroServiceEntity>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/api/MicroServices/${id}`,
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
        let _body: MicroServiceEntity = null;
        _body = _resp.body as MicroServiceEntity
        return _resp.clone({body: _body}) as HttpResponse<MicroServiceEntity>;
      })
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
   ApiMicroServicesByIdGet(id: string): Observable<MicroServiceEntity> {
    return this.ApiMicroServicesByIdGetResponse(id).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param params The `MicroServicesService.ApiMicroServicesByIdPutParams` containing the following parameters:
   *
   * - `id`: 
   *
   * - `entity`:
   */
   ApiMicroServicesByIdPutResponse(params: MicroServicesService.ApiMicroServicesByIdPutParams): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.entity;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/api/MicroServices/${params.id}`,
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
   * @param params The `MicroServicesService.ApiMicroServicesByIdPutParams` containing the following parameters:
   *
   * - `id`: 
   *
   * - `entity`:
   */
   ApiMicroServicesByIdPut(params: MicroServicesService.ApiMicroServicesByIdPutParams): Observable<void> {
    return this.ApiMicroServicesByIdPutResponse(params).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param id undefined
   */
   ApiMicroServicesByIdDeleteResponse(id: string): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/api/MicroServices/${id}`,
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
   ApiMicroServicesByIdDelete(id: string): Observable<void> {
    return this.ApiMicroServicesByIdDeleteResponse(id).pipe(
      map(_r => _r.body)
    );
  }
}

export module MicroServicesService {

  /**
   * Parameters for ApiMicroServicesByIdPut
   */
   export interface ApiMicroServicesByIdPutParams {

    id: string;

    entity?: MicroServiceEntity;
  }
}
