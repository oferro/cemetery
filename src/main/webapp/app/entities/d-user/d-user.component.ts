import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDUser } from 'app/shared/model/d-user.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { DUserService } from './d-user.service';
import { DUserDeleteDialogComponent } from './d-user-delete-dialog.component';

@Component({
  selector: 'jhi-d-user',
  templateUrl: './d-user.component.html',
})
export class DUserComponent implements OnInit, OnDestroy {
  dUsers: IDUser[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected dUserService: DUserService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.dUsers = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0,
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.dUserService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe((res: HttpResponse<IDUser[]>) => this.paginateDUsers(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.dUsers = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDUsers();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDUser): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDUsers(): void {
    this.eventSubscriber = this.eventManager.subscribe('dUserListModification', () => this.reset());
  }

  delete(dUser: IDUser): void {
    const modalRef = this.modalService.open(DUserDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.dUser = dUser;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateDUsers(data: IDUser[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.dUsers.push(data[i]);
      }
    }
  }
}
