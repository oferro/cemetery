import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDUser, DUser } from 'app/shared/model/d-user.model';
import { DUserService } from './d-user.service';
import { DUserComponent } from './d-user.component';
import { DUserDetailComponent } from './d-user-detail.component';
import { DUserUpdateComponent } from './d-user-update.component';

@Injectable({ providedIn: 'root' })
export class DUserResolve implements Resolve<IDUser> {
  constructor(private service: DUserService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDUser> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((dUser: HttpResponse<DUser>) => {
          if (dUser.body) {
            return of(dUser.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DUser());
  }
}

export const dUserRoute: Routes = [
  {
    path: '',
    component: DUserComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'cemeteryApp.dUser.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DUserDetailComponent,
    resolve: {
      dUser: DUserResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'cemeteryApp.dUser.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DUserUpdateComponent,
    resolve: {
      dUser: DUserResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'cemeteryApp.dUser.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DUserUpdateComponent,
    resolve: {
      dUser: DUserResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'cemeteryApp.dUser.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
