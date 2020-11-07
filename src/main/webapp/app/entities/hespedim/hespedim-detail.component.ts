import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IHespedim } from 'app/shared/model/hespedim.model';

@Component({
  selector: 'jhi-hespedim-detail',
  templateUrl: './hespedim-detail.component.html',
})
export class HespedimDetailComponent implements OnInit {
  hespedim: IHespedim | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ hespedim }) => (this.hespedim = hespedim));
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
