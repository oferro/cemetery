import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IGestBook } from 'app/shared/model/gest-book.model';

@Component({
  selector: 'jhi-gest-book-detail',
  templateUrl: './gest-book-detail.component.html',
})
export class GestBookDetailComponent implements OnInit {
  gestBook: IGestBook | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ gestBook }) => (this.gestBook = gestBook));
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  previousState(): void {
    window.history.back();
  }
}
