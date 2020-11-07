import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IHespedim, Hespedim } from 'app/shared/model/hespedim.model';
import { HespedimService } from './hespedim.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IDesist } from 'app/shared/model/desist.model';
import { DesistService } from 'app/entities/desist/desist.service';

@Component({
  selector: 'jhi-hespedim-update',
  templateUrl: './hespedim-update.component.html',
})
export class HespedimUpdateComponent implements OnInit {
  isSaving = false;
  desists: IDesist[] = [];

  editForm = this.fb.group({
    id: [],
    hName: [null, [Validators.required]],
    hEmail: [null, [Validators.required]],
    hContent: [],
    hNotActive: [],
    desist: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected hespedimService: HespedimService,
    protected desistService: DesistService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ hespedim }) => {
      this.updateForm(hespedim);

      this.desistService.query().subscribe((res: HttpResponse<IDesist[]>) => (this.desists = res.body || []));
    });
  }

  updateForm(hespedim: IHespedim): void {
    this.editForm.patchValue({
      id: hespedim.id,
      hName: hespedim.hName,
      hEmail: hespedim.hEmail,
      hContent: hespedim.hContent,
      hNotActive: hespedim.hNotActive,
      desist: hespedim.desist,
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
    const hespedim = this.createFromForm();
    if (hespedim.id !== undefined) {
      this.subscribeToSaveResponse(this.hespedimService.update(hespedim));
    } else {
      this.subscribeToSaveResponse(this.hespedimService.create(hespedim));
    }
  }

  private createFromForm(): IHespedim {
    return {
      ...new Hespedim(),
      id: this.editForm.get(['id'])!.value,
      hName: this.editForm.get(['hName'])!.value,
      hEmail: this.editForm.get(['hEmail'])!.value,
      hContent: this.editForm.get(['hContent'])!.value,
      hNotActive: this.editForm.get(['hNotActive'])!.value,
      desist: this.editForm.get(['desist'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHespedim>>): void {
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
