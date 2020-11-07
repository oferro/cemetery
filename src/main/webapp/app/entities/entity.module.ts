import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'd-user',
        loadChildren: () => import('./d-user/d-user.module').then(m => m.CemeteryDUserModule),
      },
      {
        path: 'desist',
        loadChildren: () => import('./desist/desist.module').then(m => m.CemeteryDesistModule),
      },
      {
        path: 'gest-book',
        loadChildren: () => import('./gest-book/gest-book.module').then(m => m.CemeteryGestBookModule),
      },
      {
        path: 'candle',
        loadChildren: () => import('./candle/candle.module').then(m => m.CemeteryCandleModule),
      },
      {
        path: 'hespedim',
        loadChildren: () => import('./hespedim/hespedim.module').then(m => m.CemeteryHespedimModule),
      },
      {
        path: 'media',
        loadChildren: () => import('./media/media.module').then(m => m.CemeteryMediaModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class CemeteryEntityModule {}
