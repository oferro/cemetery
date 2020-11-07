import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICandle } from 'app/shared/model/candle.model';

type EntityResponseType = HttpResponse<ICandle>;
type EntityArrayResponseType = HttpResponse<ICandle[]>;

@Injectable({ providedIn: 'root' })
export class CandleService {
  public resourceUrl = SERVER_API_URL + 'api/candles';

  constructor(protected http: HttpClient) {}

  create(candle: ICandle): Observable<EntityResponseType> {
    return this.http.post<ICandle>(this.resourceUrl, candle, { observe: 'response' });
  }

  update(candle: ICandle): Observable<EntityResponseType> {
    return this.http.put<ICandle>(this.resourceUrl, candle, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICandle>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICandle[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
