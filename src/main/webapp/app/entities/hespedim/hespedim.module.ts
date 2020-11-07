import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CemeterySharedModule } from 'app/shared/shared.module';
import { HespedimComponent } from './hespedim.component';
import { HespedimDetailComponent } from './hespedim-detail.component';
import { HespedimUpdateComponent } from './hespedim-update.component';
import { HespedimDeleteDialogComponent } from './hespedim-delete-dialog.component';
import { hespedimRoute } from './hespedim.route';

@NgModule({
  imports: [CemeterySharedModule, RouterModule.forChild(hespedimRoute)],
  declarations: [HespedimComponent, HespedimDetailComponent, HespedimUpdateComponent, HespedimDeleteDialogComponent],
  entryComponents: [HespedimDeleteDialogComponent],
})
export class CemeteryHespedimModule {}
