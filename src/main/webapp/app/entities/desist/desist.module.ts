import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CemeterySharedModule } from 'app/shared/shared.module';
import { DesistComponent } from './desist.component';
import { DesistDetailComponent } from './desist-detail.component';
import { DesistUpdateComponent } from './desist-update.component';
import { DesistDeleteDialogComponent } from './desist-delete-dialog.component';
import { desistRoute } from './desist.route';

@NgModule({
  imports: [CemeterySharedModule, RouterModule.forChild(desistRoute)],
  declarations: [DesistComponent, DesistDetailComponent, DesistUpdateComponent, DesistDeleteDialogComponent],
  entryComponents: [DesistDeleteDialogComponent],
})
export class CemeteryDesistModule {}
