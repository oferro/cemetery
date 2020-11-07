import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDUser } from 'app/shared/model/d-user.model';
import { DUserService } from './d-user.service';

@Component({
  templateUrl: './d-user-delete-dialog.component.html',
})
export class DUserDeleteDialogComponent {
  dUser?: IDUser;

  constructor(protected dUserService: DUserService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.dUserService.delete(id).subscribe(() => {
      this.eventManager.broadcast('dUserListModification');
      this.activeModal.close();
    });
  }
}
