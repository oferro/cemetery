import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHespedim } from 'app/shared/model/hespedim.model';
import { HespedimService } from './hespedim.service';

@Component({
  templateUrl: './hespedim-delete-dialog.component.html',
})
export class HespedimDeleteDialogComponent {
  hespedim?: IHespedim;

  constructor(protected hespedimService: HespedimService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.hespedimService.delete(id).subscribe(() => {
      this.eventManager.broadcast('hespedimListModification');
      this.activeModal.close();
    });
  }
}
