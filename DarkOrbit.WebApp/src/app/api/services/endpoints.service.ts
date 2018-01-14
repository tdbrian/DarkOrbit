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

import { EndpointEntity } from '../models/endpoint-entity';


@Injectable()
export class EndpointsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param Timestamp - undefined
   * @param Pid - undefined
   * @param Machine - undefined
   * @param Increment - undefined
   * @param CreationTime - undefined
   */
  ApiEndpointsGetResponse(params: EndpointsService.ApiEndpointsGetParams): Observable<HttpResponse<EndpointEntity>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.Timestamp != null) __params = __params.set("Timestamp", params.Timestamp.toString());
    if (params.Pid != null) __params = __params.set("Pid", params.Pid.toString());
    if (params.Machine != null) __params = __params.set("Machine", params.Machine.toString());
    if (params.Increment != null) __params = __params.set("Increment", params.Increment.toString());
    if (params.CreationTime != null) __params = __params.set("CreationTime", params.CreationTime.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/api/Endpoints`,
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
        let _body: EndpointEntity = null;
        _body = _resp.body as EndpointEntity
        return _resp.clone({body: _body}) as HttpResponse<EndpointEntity>;
      })
    );
  }

  /**
   * @param Timestamp - undefined
   * @param Pid - undefined
   * @param Machine - undefined
   * @param Increment - undefined
   * @param CreationTime - undefined
   */
  ApiEndpointsGet(params: EndpointsService.ApiEndpointsGetParams): Observable<EndpointEntity> {
    return this.ApiEndpointsGetResponse(params).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param entity - undefined
   */
  ApiEndpointsPostResponse(entity?: EndpointEntity): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = entity;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/api/Endpoints`,
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
   * @param entity - undefined
   */
  ApiEndpointsPost(entity?: EndpointEntity): Observable<void> {
    return this.ApiEndpointsPostResponse(entity).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param id - undefined
   */
  ApiEndpointsByIdGetResponse(id: string): Observable<HttpResponse<EndpointEntity[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/api/Endpoints/${id}`,
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
        let _body: EndpointEntity[] = null;
        _body = _resp.body as EndpointEntity[]
        return _resp.clone({body: _body}) as HttpResponse<EndpointEntity[]>;
      })
    );
  }

  /**
   * @param id - undefined
   */
  ApiEndpointsByIdGet(id: string): Observable<EndpointEntity[]> {
    return this.ApiEndpointsByIdGetResponse(id).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param id - undefined
   * @param entity - undefined
   */
  ApiEndpointsByIdPutResponse(params: EndpointsService.ApiEndpointsByIdPutParams): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    __body = params.entity;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/api/Endpoints/${params.id}`,
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
   * @param id - undefined
   * @param entity - undefined
   */
  ApiEndpointsByIdPut(params: EndpointsService.ApiEndpointsByIdPutParams): Observable<void> {
    return this.ApiEndpointsByIdPutResponse(params).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param id - undefined
   * @param Timestamp - undefined
   * @param Pid - undefined
   * @param Machine - undefined
   * @param Increment - undefined
   * @param CreationTime - undefined
   */
  ApiEndpointsByIdDeleteResponse(params: EndpointsService.ApiEndpointsByIdDeleteParams): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    if (params.Timestamp != null) __params = __params.set("Timestamp", params.Timestamp.toString());
    if (params.Pid != null) __params = __params.set("Pid", params.Pid.toString());
    if (params.Machine != null) __params = __params.set("Machine", params.Machine.toString());
    if (params.Increment != null) __params = __params.set("Increment", params.Increment.toString());
    if (params.CreationTime != null) __params = __params.set("CreationTime", params.CreationTime.toString());
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/api/Endpoints/${params.id}`,
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
   * @param id - undefined
   * @param Timestamp - undefined
   * @param Pid - undefined
   * @param Machine - undefined
   * @param Increment - undefined
   * @param CreationTime - undefined
   */
  ApiEndpointsByIdDelete(params: EndpointsService.ApiEndpointsByIdDeleteParams): Observable<void> {
    return this.ApiEndpointsByIdDeleteResponse(params).pipe(
      map(_r => _r.body)
    );
  }}

export module EndpointsService {
  export interface ApiEndpointsGetParams {
    Timestamp: number;
    Pid: number;
    Machine: number;
    Increment: number;
    CreationTime: string;
  }
  export interface ApiEndpointsByIdPutParams {
    id: string;
    entity?: EndpointEntity;
  }
  export interface ApiEndpointsByIdDeleteParams {
    id: string;
    Timestamp: number;
    Pid: number;
    Machine: number;
    Increment: number;
    CreationTime: string;
  }
}
