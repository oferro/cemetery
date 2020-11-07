import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IHespedim, Hespedim } from 'app/shared/model/hespedim.model';
import { HespedimService } from './hespedim.service';
import { HespedimComponent } from './hespedim.component';
import { HespedimDetailComponent } from './hespedim-detail.component';
import { HespedimUpdateComponent } from './hespedim-update.component';

@Injectable({ providedIn: 'root' })
export class HespedimResolve implements Resolve<IHespedim> {
  constructor(private service: HespedimService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IHespedim> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((hespedim: HttpResponse<Hespedim>) => {
          if (hespedim.body) {
            return of(hespedim.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Hespedim());
  }
}

export const hespedimRoute: Routes = [
  {
    path: '',
    component: HespedimComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'cemeteryApp.hespedim.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: HespedimDetailComponent,
    resolve: {
      hespedim: HespedimResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'cemeteryApp.hespedim.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: HespedimUpdateComponent,
    resolve: {
      hespedim: HespedimResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'cemeteryApp.hespedim.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: HespedimUpdateComponent,
    resolve: {
      hespedim: HespedimResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'cemeteryApp.hespedim.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
