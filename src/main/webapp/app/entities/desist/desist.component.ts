import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDesist } from 'app/shared/model/desist.model';
import { DesistService } from './desist.service';
import { DesistDeleteDialogComponent } from './desist-delete-dialog.component';

@Component({
  selector: 'jhi-desist',
  templateUrl: './desist.component.html',
})
export class DesistComponent implements OnInit, OnDestroy {
  desists?: IDesist[];
  eventSubscriber?: Subscription;

  constructor(
    protected desistService: DesistService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.desistService.query().subscribe((res: HttpResponse<IDesist[]>) => (this.desists = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDesists();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDesist): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInDesists(): void {
    this.eventSubscriber = this.eventManager.subscribe('desistListModification', () => this.loadAll());
  }

  delete(desist: IDesist): void {
    const modalRef = this.modalService.open(DesistDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.desist = desist;
  }
}
