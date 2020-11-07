import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDesist } from 'app/shared/model/desist.model';
import { DesistService } from './desist.service';

@Component({
  templateUrl: './desist-delete-dialog.component.html',
})
export class DesistDeleteDialogComponent {
  desist?: IDesist;

  constructor(protected desistService: DesistService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.desistService.delete(id).subscribe(() => {
      this.eventManager.broadcast('desistListModification');
      this.activeModal.close();
    });
  }
}
