import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CemeterySharedModule } from 'app/shared/shared.module';
import { GestBookComponent } from './gest-book.component';
import { GestBookDetailComponent } from './gest-book-detail.component';
import { GestBookUpdateComponent } from './gest-book-update.component';
import { GestBookDeleteDialogComponent } from './gest-book-delete-dialog.component';
import { gestBookRoute } from './gest-book.route';

@NgModule({
  imports: [CemeterySharedModule, RouterModule.forChild(gestBookRoute)],
  declarations: [GestBookComponent, GestBookDetailComponent, GestBookUpdateComponent, GestBookDeleteDialogComponent],
  entryComponents: [GestBookDeleteDialogComponent],
})
export class CemeteryGestBookModule {}
