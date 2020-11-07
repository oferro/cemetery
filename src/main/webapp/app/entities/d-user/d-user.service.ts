import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDUser } from 'app/shared/model/d-user.model';

type EntityResponseType = HttpResponse<IDUser>;
type EntityArrayResponseType = HttpResponse<IDUser[]>;

@Injectable({ providedIn: 'root' })
export class DUserService {
  public resourceUrl = SERVER_API_URL + 'api/d-users';

  constructor(protected http: HttpClient) {}

  create(dUser: IDUser): Observable<EntityResponseType> {
    return this.http.post<IDUser>(this.resourceUrl, dUser, { observe: 'response' });
  }

  update(dUser: IDUser): Observable<EntityResponseType> {
    return this.http.put<IDUser>(this.resourceUrl, dUser, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDUser>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDUser[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
