import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IGestBook } from 'app/shared/model/gest-book.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { GestBookService } from './gest-book.service';
import { GestBookDeleteDialogComponent } from './gest-book-delete-dialog.component';

@Component({
  selector: 'jhi-gest-book',
  templateUrl: './gest-book.component.html',
})
export class GestBookComponent implements OnInit, OnDestroy {
  gestBooks: IGestBook[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected gestBookService: GestBookService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.gestBooks = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0,
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.gestBookService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe((res: HttpResponse<IGestBook[]>) => this.paginateGestBooks(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.gestBooks = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInGestBooks();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IGestBook): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInGestBooks(): void {
    this.eventSubscriber = this.eventManager.subscribe('gestBookListModification', () => this.reset());
  }

  delete(gestBook: IGestBook): void {
    const modalRef = this.modalService.open(GestBookDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.gestBook = gestBook;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateGestBooks(data: IGestBook[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.gestBooks.push(data[i]);
      }
    }
  }
}
