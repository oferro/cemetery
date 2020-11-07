import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDesist, Desist } from 'app/shared/model/desist.model';
import { DesistService } from './desist.service';
import { DesistComponent } from './desist.component';
import { DesistDetailComponent } from './desist-detail.component';
import { DesistUpdateComponent } from './desist-update.component';

@Injectable({ providedIn: 'root' })
export class DesistResolve implements Resolve<IDesist> {
  constructor(private service: DesistService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDesist> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((desist: HttpResponse<Desist>) => {
          if (desist.body) {
            return of(desist.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Desist());
  }
}

export const desistRoute: Routes = [
  {
    path: '',
    component: DesistComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'cemeteryApp.desist.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DesistDetailComponent,
    resolve: {
      desist: DesistResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'cemeteryApp.desist.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DesistUpdateComponent,
    resolve: {
      desist: DesistResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'cemeteryApp.desist.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DesistUpdateComponent,
    resolve: {
      desist: DesistResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'cemeteryApp.desist.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
