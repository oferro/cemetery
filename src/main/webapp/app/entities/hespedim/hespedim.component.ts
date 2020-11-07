import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IHespedim } from 'app/shared/model/hespedim.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { HespedimService } from './hespedim.service';
import { HespedimDeleteDialogComponent } from './hespedim-delete-dialog.component';

@Component({
  selector: 'jhi-hespedim',
  templateUrl: './hespedim.component.html',
})
export class HespedimComponent implements OnInit, OnDestroy {
  hespedims: IHespedim[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected hespedimService: HespedimService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.hespedims = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0,
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.hespedimService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe((res: HttpResponse<IHespedim[]>) => this.paginateHespedims(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.hespedims = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInHespedims();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IHespedim): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInHespedims(): void {
    this.eventSubscriber = this.eventManager.subscribe('hespedimListModification', () => this.reset());
  }

  delete(hespedim: IHespedim): void {
    const modalRef = this.modalService.open(HespedimDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.hespedim = hespedim;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateHespedims(data: IHespedim[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.hespedims.push(data[i]);
      }
    }
  }
}
