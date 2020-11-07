import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICandle } from 'app/shared/model/candle.model';
import { CandleService } from './candle.service';

@Component({
  templateUrl: './candle-delete-dialog.component.html',
})
export class CandleDeleteDialogComponent {
  candle?: ICandle;

  constructor(protected candleService: CandleService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.candleService.delete(id).subscribe(() => {
      this.eventManager.broadcast('candleListModification');
      this.activeModal.close();
    });
  }
}
