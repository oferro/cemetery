import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IGestBook, GestBook } from 'app/shared/model/gest-book.model';
import { GestBookService } from './gest-book.service';
import { GestBookComponent } from './gest-book.component';
import { GestBookDetailComponent } from './gest-book-detail.component';
import { GestBookUpdateComponent } from './gest-book-update.component';

@Injectable({ providedIn: 'root' })
export class GestBookResolve implements Resolve<IGestBook> {
  constructor(private service: GestBookService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IGestBook> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((gestBook: HttpResponse<GestBook>) => {
          if (gestBook.body) {
            return of(gestBook.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new GestBook());
  }
}

export const gestBookRoute: Routes = [
  {
    path: '',
    component: GestBookComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'cemeteryApp.gestBook.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: GestBookDetailComponent,
    resolve: {
      gestBook: GestBookResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'cemeteryApp.gestBook.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: GestBookUpdateComponent,
    resolve: {
      gestBook: GestBookResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'cemeteryApp.gestBook.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: GestBookUpdateComponent,
    resolve: {
      gestBook: GestBookResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'cemeteryApp.gestBook.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
