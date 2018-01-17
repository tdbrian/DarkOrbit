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

import { EventEntity } from '../models/event-entity';

@Injectable()
export class EventsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
   ApiEventsGetResponse(): Observable<HttpResponse<EventEntity[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/api/Events`,
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
        let _body: EventEntity[] = null;
        _body = _resp.body as EventEntity[]
        return _resp.clone({body: _body}) as HttpResponse<EventEntity[]>;
      })
    );
  }

  /**
   * @return Success
   */
   ApiEventsGet(): Observable<EventEntity[]> {
    return this.ApiEventsGetResponse().pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param entity undefined
   */
   ApiEventsPostResponse(entity?: EventEntity): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = entity;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/api/Events`,
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
   ApiEventsPost(entity?: EventEntity): Observable<void> {
    return this.ApiEventsPostResponse(entity).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
   ApiEventsByIdGetResponse(id: string): Observable<HttpResponse<EventEntity>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/api/Events/${id}`,
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
        let _body: EventEntity = null;
        _body = _resp.body as EventEntity
        return _resp.clone({body: _body}) as HttpResponse<EventEntity>;
      })
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
   ApiEventsByIdGet(id: string): Observable<EventEntity> {
    return this.ApiEventsByIdGetResponse(id).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param params The `EventsService.ApiEventsByIdPutParams` containing the following parameters:
   *
   * - `id`: 
   *
   * - `entity`:
   */
   ApiEventsByIdPutResponse(params: EventsService.ApiEventsByIdPutParams): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.entity;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/api/Events/${params.id}`,
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
   * @param params The `EventsService.ApiEventsByIdPutParams` containing the following parameters:
   *
   * - `id`: 
   *
   * - `entity`:
   */
   ApiEventsByIdPut(params: EventsService.ApiEventsByIdPutParams): Observable<void> {
    return this.ApiEventsByIdPutResponse(params).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param id undefined
   */
   ApiEventsByIdDeleteResponse(id: string): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/api/Events/${id}`,
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
   ApiEventsByIdDelete(id: string): Observable<void> {
    return this.ApiEventsByIdDeleteResponse(id).pipe(
      map(_r => _r.body)
    );
  }
}

export module EventsService {

  /**
   * Parameters for ApiEventsByIdPut
   */
   export interface ApiEventsByIdPutParams {

    id: string;

    entity?: EventEntity;
  }
}
