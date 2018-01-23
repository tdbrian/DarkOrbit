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

import { ServiceManagerEntity } from '../models/service-manager-entity';

@Injectable()
export class ServiceManagerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
   ApiServiceManagerGetResponse(): Observable<HttpResponse<ServiceManagerEntity[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/api/ServiceManager`,
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
        let _body: ServiceManagerEntity[] = null;
        _body = _resp.body as ServiceManagerEntity[]
        return _resp.clone({body: _body}) as HttpResponse<ServiceManagerEntity[]>;
      })
    );
  }

  /**
   * @return Success
   */
   ApiServiceManagerGet(): Observable<ServiceManagerEntity[]> {
    return this.ApiServiceManagerGetResponse().pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @return Success
   */
   ApiServiceManagerLiveGetResponse(): Observable<HttpResponse<ServiceManagerEntity[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/api/ServiceManager/live`,
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
        let _body: ServiceManagerEntity[] = null;
        _body = _resp.body as ServiceManagerEntity[]
        return _resp.clone({body: _body}) as HttpResponse<ServiceManagerEntity[]>;
      })
    );
  }

  /**
   * @return Success
   */
   ApiServiceManagerLiveGet(): Observable<ServiceManagerEntity[]> {
    return this.ApiServiceManagerLiveGetResponse().pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
   ApiServiceManagerByIdGetResponse(id: string): Observable<HttpResponse<ServiceManagerEntity>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/api/ServiceManager/${id}`,
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
        let _body: ServiceManagerEntity = null;
        _body = _resp.body as ServiceManagerEntity
        return _resp.clone({body: _body}) as HttpResponse<ServiceManagerEntity>;
      })
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
   ApiServiceManagerByIdGet(id: string): Observable<ServiceManagerEntity> {
    return this.ApiServiceManagerByIdGetResponse(id).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param entity undefined
   */
   ApiServiceManagerStartPutResponse(entity?: ServiceManagerEntity): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = entity;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/api/ServiceManager/start`,
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
   ApiServiceManagerStartPut(entity?: ServiceManagerEntity): Observable<void> {
    return this.ApiServiceManagerStartPutResponse(entity).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param entity undefined
   */
   ApiServiceManagerStopPutResponse(entity?: ServiceManagerEntity): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = entity;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/api/ServiceManager/stop`,
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
   ApiServiceManagerStopPut(entity?: ServiceManagerEntity): Observable<void> {
    return this.ApiServiceManagerStopPutResponse(entity).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param entity undefined
   */
   ApiServiceManagerRestartPutResponse(entity?: ServiceManagerEntity): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = entity;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/api/ServiceManager/restart`,
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
   ApiServiceManagerRestartPut(entity?: ServiceManagerEntity): Observable<void> {
    return this.ApiServiceManagerRestartPutResponse(entity).pipe(
      map(_r => _r.body)
    );
  }
}

export module ServiceManagerService {
}
