import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IMedia, Media } from 'app/shared/model/media.model';
import { MediaService } from './media.service';
import { IDesist } from 'app/shared/model/desist.model';
import { DesistService } from 'app/entities/desist/desist.service';

@Component({
  selector: 'jhi-media-update',
  templateUrl: './media-update.component.html',
})
export class MediaUpdateComponent implements OnInit {
  isSaving = false;
  desists: IDesist[] = [];
  mDateDp: any;

  editForm = this.fb.group({
    id: [],
    mType: [null, [Validators.required]],
    mDescription: [],
    mDate: [],
    mLink: [null, [Validators.required]],
    mNotActive: [],
    desist: [],
  });

  constructor(
    protected mediaService: MediaService,
    protected desistService: DesistService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ media }) => {
      this.updateForm(media);

      this.desistService.query().subscribe((res: HttpResponse<IDesist[]>) => (this.desists = res.body || []));
    });
  }

  updateForm(media: IMedia): void {
    this.editForm.patchValue({
      id: media.id,
      mType: media.mType,
      mDescription: media.mDescription,
      mDate: media.mDate,
      mLink: media.mLink,
      mNotActive: media.mNotActive,
      desist: media.desist,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const media = this.createFromForm();
    if (media.id !== undefined) {
      this.subscribeToSaveResponse(this.mediaService.update(media));
    } else {
      this.subscribeToSaveResponse(this.mediaService.create(media));
    }
  }

  private createFromForm(): IMedia {
    return {
      ...new Media(),
      id: this.editForm.get(['id'])!.value,
      mType: this.editForm.get(['mType'])!.value,
      mDescription: this.editForm.get(['mDescription'])!.value,
      mDate: this.editForm.get(['mDate'])!.value,
      mLink: this.editForm.get(['mLink'])!.value,
      mNotActive: this.editForm.get(['mNotActive'])!.value,
      desist: this.editForm.get(['desist'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMedia>>): void {
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
