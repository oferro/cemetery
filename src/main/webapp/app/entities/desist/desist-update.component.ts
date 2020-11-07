import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IDesist, Desist } from 'app/shared/model/desist.model';
import { DesistService } from './desist.service';
import { AlertError } from 'app/shared/alert/alert-error.model';

@Component({
  selector: 'jhi-desist-update',
  templateUrl: './desist-update.component.html',
})
export class DesistUpdateComponent implements OnInit {
  isSaving = false;
  dDateBornDp: any;
  dDateDeadDp: any;

  editForm = this.fb.group({
    id: [],
    dSorName: [null, [Validators.required]],
    dForeName: [null, [Validators.required]],
    dPic: [],
    dPicContentType: [],
    dBerthPlace: [],
    dCareer: [],
    dEducation: [],
    dDateBorn: [],
    dDateDead: [],
    dNotActive: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected desistService: DesistService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ desist }) => {
      this.updateForm(desist);
    });
  }

  updateForm(desist: IDesist): void {
    this.editForm.patchValue({
      id: desist.id,
      dSorName: desist.dSorName,
      dForeName: desist.dForeName,
      dPic: desist.dPic,
      dPicContentType: desist.dPicContentType,
      dBerthPlace: desist.dBerthPlace,
      dCareer: desist.dCareer,
      dEducation: desist.dEducation,
      dDateBorn: desist.dDateBorn,
      dDateDead: desist.dDateDead,
      dNotActive: desist.dNotActive,
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

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null,
    });
    if (this.elementRef && idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const desist = this.createFromForm();
    if (desist.id !== undefined) {
      this.subscribeToSaveResponse(this.desistService.update(desist));
    } else {
      this.subscribeToSaveResponse(this.desistService.create(desist));
    }
  }

  private createFromForm(): IDesist {
    return {
      ...new Desist(),
      id: this.editForm.get(['id'])!.value,
      dSorName: this.editForm.get(['dSorName'])!.value,
      dForeName: this.editForm.get(['dForeName'])!.value,
      dPicContentType: this.editForm.get(['dPicContentType'])!.value,
      dPic: this.editForm.get(['dPic'])!.value,
      dBerthPlace: this.editForm.get(['dBerthPlace'])!.value,
      dCareer: this.editForm.get(['dCareer'])!.value,
      dEducation: this.editForm.get(['dEducation'])!.value,
      dDateBorn: this.editForm.get(['dDateBorn'])!.value,
      dDateDead: this.editForm.get(['dDateDead'])!.value,
      dNotActive: this.editForm.get(['dNotActive'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDesist>>): void {
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
}
