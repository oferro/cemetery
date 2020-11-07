import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CemeterySharedModule } from 'app/shared/shared.module';
import { DUserComponent } from './d-user.component';
import { DUserDetailComponent } from './d-user-detail.component';
import { DUserUpdateComponent } from './d-user-update.component';
import { DUserDeleteDialogComponent } from './d-user-delete-dialog.component';
import { dUserRoute } from './d-user.route';

@NgModule({
  imports: [CemeterySharedModule, RouterModule.forChild(dUserRoute)],
  declarations: [DUserComponent, DUserDetailComponent, DUserUpdateComponent, DUserDeleteDialogComponent],
  entryComponents: [DUserDeleteDialogComponent],
})
export class CemeteryDUserModule {}
