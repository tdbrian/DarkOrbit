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
   * @return Success
   */
   ApiEndpointsGetResponse(): Observable<HttpResponse<EndpointEntity[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
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
        let _body: EndpointEntity[] = null;
        _body = _resp.body as EndpointEntity[]
        return _resp.clone({body: _body}) as HttpResponse<EndpointEntity[]>;
      })
    );
  }

  /**
   * @return Success
   */
   ApiEndpointsGet(): Observable<EndpointEntity[]> {
    return this.ApiEndpointsGetResponse().pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param entity undefined
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
   * @param entity undefined
   */
   ApiEndpointsPost(entity?: EndpointEntity): Observable<void> {
    return this.ApiEndpointsPostResponse(entity).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param serviceId undefined
   * @return Success
   */
   ApiEndpointsByServiceByServiceIdGetResponse(serviceId: string): Observable<HttpResponse<EndpointEntity[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/api/Endpoints/ByService/${serviceId}`,
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
   * @param serviceId undefined
   * @return Success
   */
   ApiEndpointsByServiceByServiceIdGet(serviceId: string): Observable<EndpointEntity[]> {
    return this.ApiEndpointsByServiceByServiceIdGetResponse(serviceId).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
   ApiEndpointsByIdGetResponse(id: string): Observable<HttpResponse<EndpointEntity>> {
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
        let _body: EndpointEntity = null;
        _body = _resp.body as EndpointEntity
        return _resp.clone({body: _body}) as HttpResponse<EndpointEntity>;
      })
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
   ApiEndpointsByIdGet(id: string): Observable<EndpointEntity> {
    return this.ApiEndpointsByIdGetResponse(id).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param params The `EndpointsService.ApiEndpointsByIdPutParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `entity`:
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
   * @param params The `EndpointsService.ApiEndpointsByIdPutParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `entity`:
   */
   ApiEndpointsByIdPut(params: EndpointsService.ApiEndpointsByIdPutParams): Observable<void> {
    return this.ApiEndpointsByIdPutResponse(params).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param id undefined
   */
   ApiEndpointsByIdDeleteResponse(id: string): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/api/Endpoints/${id}`,
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
   ApiEndpointsByIdDelete(id: string): Observable<void> {
    return this.ApiEndpointsByIdDeleteResponse(id).pipe(
      map(_r => _r.body)
    );
  }
}

export module EndpointsService {

  /**
   * Parameters for ApiEndpointsByIdPut
   */
   export interface ApiEndpointsByIdPutParams {

    id: string;

    entity?: EndpointEntity;
  }
}
