import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IHespedim } from 'app/shared/model/hespedim.model';

type EntityResponseType = HttpResponse<IHespedim>;
type EntityArrayResponseType = HttpResponse<IHespedim[]>;

@Injectable({ providedIn: 'root' })
export class HespedimService {
  public resourceUrl = SERVER_API_URL + 'api/hespedims';

  constructor(protected http: HttpClient) {}

  create(hespedim: IHespedim): Observable<EntityResponseType> {
    return this.http.post<IHespedim>(this.resourceUrl, hespedim, { observe: 'response' });
  }

  update(hespedim: IHespedim): Observable<EntityResponseType> {
    return this.http.put<IHespedim>(this.resourceUrl, hespedim, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IHespedim>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IHespedim[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
