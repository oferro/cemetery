import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDesist } from 'app/shared/model/desist.model';

type EntityResponseType = HttpResponse<IDesist>;
type EntityArrayResponseType = HttpResponse<IDesist[]>;

@Injectable({ providedIn: 'root' })
export class DesistService {
  public resourceUrl = SERVER_API_URL + 'api/desists';

  constructor(protected http: HttpClient) {}

  create(desist: IDesist): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(desist);
    return this.http
      .post<IDesist>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(desist: IDesist): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(desist);
    return this.http
      .put<IDesist>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IDesist>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDesist[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(desist: IDesist): IDesist {
    const copy: IDesist = Object.assign({}, desist, {
      dDateBorn: desist.dDateBorn && desist.dDateBorn.isValid() ? desist.dDateBorn.format(DATE_FORMAT) : undefined,
      dDateDead: desist.dDateDead && desist.dDateDead.isValid() ? desist.dDateDead.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dDateBorn = res.body.dDateBorn ? moment(res.body.dDateBorn) : undefined;
      res.body.dDateDead = res.body.dDateDead ? moment(res.body.dDateDead) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((desist: IDesist) => {
        desist.dDateBorn = desist.dDateBorn ? moment(desist.dDateBorn) : undefined;
        desist.dDateDead = desist.dDateDead ? moment(desist.dDateDead) : undefined;
      });
    }
    return res;
  }
}
