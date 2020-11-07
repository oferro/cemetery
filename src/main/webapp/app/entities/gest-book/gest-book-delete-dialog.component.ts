import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGestBook } from 'app/shared/model/gest-book.model';
import { GestBookService } from './gest-book.service';

@Component({
  templateUrl: './gest-book-delete-dialog.component.html',
})
export class GestBookDeleteDialogComponent {
  gestBook?: IGestBook;

  constructor(protected gestBookService: GestBookService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.gestBookService.delete(id).subscribe(() => {
      this.eventManager.broadcast('gestBookListModification');
      this.activeModal.close();
    });
  }
}
