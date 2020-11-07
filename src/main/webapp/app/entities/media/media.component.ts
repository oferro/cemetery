import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMedia } from 'app/shared/model/media.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { MediaService } from './media.service';
import { MediaDeleteDialogComponent } from './media-delete-dialog.component';

@Component({
  selector: 'jhi-media',
  templateUrl: './media.component.html',
})
export class MediaComponent implements OnInit, OnDestroy {
  media: IMedia[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected mediaService: MediaService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.media = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0,
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.mediaService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe((res: HttpResponse<IMedia[]>) => this.paginateMedia(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.media = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInMedia();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IMedia): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInMedia(): void {
    this.eventSubscriber = this.eventManager.subscribe('mediaListModification', () => this.reset());
  }

  delete(media: IMedia): void {
    const modalRef = this.modalService.open(MediaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.media = media;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateMedia(data: IMedia[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.media.push(data[i]);
      }
    }
  }
}
