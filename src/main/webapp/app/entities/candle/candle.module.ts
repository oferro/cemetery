import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CemeterySharedModule } from 'app/shared/shared.module';
import { CandleComponent } from './candle.component';
import { CandleDetailComponent } from './candle-detail.component';
import { CandleUpdateComponent } from './candle-update.component';
import { CandleDeleteDialogComponent } from './candle-delete-dialog.component';
import { candleRoute } from './candle.route';

@NgModule({
  imports: [CemeterySharedModule, RouterModule.forChild(candleRoute)],
  declarations: [CandleComponent, CandleDetailComponent, CandleUpdateComponent, CandleDeleteDialogComponent],
  entryComponents: [CandleDeleteDialogComponent],
})
export class CemeteryCandleModule {}
