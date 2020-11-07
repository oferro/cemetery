import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { ICandle, Candle } from 'app/shared/model/candle.model';
import { CandleService } from './candle.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IDesist } from 'app/shared/model/desist.model';
import { DesistService } from 'app/entities/desist/desist.service';

@Component({
  selector: 'jhi-candle-update',
  templateUrl: './candle-update.component.html',
})
export class CandleUpdateComponent implements OnInit {
  isSaving = false;
  desists: IDesist[] = [];

  editForm = this.fb.group({
    id: [],
    cName: [null, [Validators.required]],
    cEmail: [null, [Validators.required]],
    cPhone: [null, [Validators.required]],
    cContent: [],
    cNotActive: [],
    desist: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected candleService: CandleService,
    protected desistService: DesistService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ candle }) => {
      this.updateForm(candle);

      this.desistService.query().subscribe((res: HttpResponse<IDesist[]>) => (this.desists = res.body || []));
    });
  }

  updateForm(candle: ICandle): void {
    this.editForm.patchValue({
      id: candle.id,
      cName: candle.cName,
      cEmail: candle.cEmail,
      cPhone: candle.cPhone,
      cContent: candle.cContent,
      cNotActive: candle.cNotActive,
      desist: candle.desist,
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: any, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('cemeteryApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const candle = this.createFromForm();
    if (candle.id !== undefined) {
      this.subscribeToSaveResponse(this.candleService.update(candle));
    } else {
      this.subscribeToSaveResponse(this.candleService.create(candle));
    }
  }

  private createFromForm(): ICandle {
    return {
      ...new Candle(),
      id: this.editForm.get(['id'])!.value,
      cName: this.editForm.get(['cName'])!.value,
      cEmail: this.editForm.get(['cEmail'])!.value,
      cPhone: this.editForm.get(['cPhone'])!.value,
      cContent: this.editForm.get(['cContent'])!.value,
      cNotActive: this.editForm.get(['cNotActive'])!.value,
      desist: this.editForm.get(['desist'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICandle>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IDesist): any {
    return item.id;
  }
}
