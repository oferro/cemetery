import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IGestBook, GestBook } from 'app/shared/model/gest-book.model';
import { GestBookService } from './gest-book.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IDesist } from 'app/shared/model/desist.model';
import { DesistService } from 'app/entities/desist/desist.service';

@Component({
  selector: 'jhi-gest-book-update',
  templateUrl: './gest-book-update.component.html',
})
export class GestBookUpdateComponent implements OnInit {
  isSaving = false;
  desists: IDesist[] = [];

  editForm = this.fb.group({
    id: [],
    bName: [null, [Validators.required]],
    bEmail: [null, [Validators.required]],
    bPhone: [null, [Validators.required]],
    bContent: [],
    bNotActive: [],
    desist: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected gestBookService: GestBookService,
    protected desistService: DesistService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ gestBook }) => {
      this.updateForm(gestBook);

      this.desistService.query().subscribe((res: HttpResponse<IDesist[]>) => (this.desists = res.body || []));
    });
  }

  updateForm(gestBook: IGestBook): void {
    this.editForm.patchValue({
      id: gestBook.id,
      bName: gestBook.bName,
      bEmail: gestBook.bEmail,
      bPhone: gestBook.bPhone,
      bContent: gestBook.bContent,
      bNotActive: gestBook.bNotActive,
      desist: gestBook.desist,
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
    const gestBook = this.createFromForm();
    if (gestBook.id !== undefined) {
      this.subscribeToSaveResponse(this.gestBookService.update(gestBook));
    } else {
      this.subscribeToSaveResponse(this.gestBookService.create(gestBook));
    }
  }

  private createFromForm(): IGestBook {
    return {
      ...new GestBook(),
      id: this.editForm.get(['id'])!.value,
      bName: this.editForm.get(['bName'])!.value,
      bEmail: this.editForm.get(['bEmail'])!.value,
      bPhone: this.editForm.get(['bPhone'])!.value,
      bContent: this.editForm.get(['bContent'])!.value,
      bNotActive: this.editForm.get(['bNotActive'])!.value,
      desist: this.editForm.get(['desist'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGestBook>>): void {
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
