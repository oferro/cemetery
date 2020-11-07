import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICandle, Candle } from 'app/shared/model/candle.model';
import { CandleService } from './candle.service';
import { CandleComponent } from './candle.component';
import { CandleDetailComponent } from './candle-detail.component';
import { CandleUpdateComponent } from './candle-update.component';

@Injectable({ providedIn: 'root' })
export class CandleResolve implements Resolve<ICandle> {
  constructor(private service: CandleService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICandle> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((candle: HttpResponse<Candle>) => {
          if (candle.body) {
            return of(candle.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Candle());
  }
}

export const candleRoute: Routes = [
  {
    path: '',
    component: CandleComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'cemeteryApp.candle.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CandleDetailComponent,
    resolve: {
      candle: CandleResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'cemeteryApp.candle.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CandleUpdateComponent,
    resolve: {
      candle: CandleResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'cemeteryApp.candle.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CandleUpdateComponent,
    resolve: {
      candle: CandleResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'cemeteryApp.candle.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
