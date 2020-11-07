import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IDUser, DUser } from 'app/shared/model/d-user.model';
import { DUserService } from './d-user.service';

@Component({
  selector: 'jhi-d-user-update',
  templateUrl: './d-user-update.component.html',
})
export class DUserUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    uForeName: [null, [Validators.required]],
    uSorName: [null, [Validators.required]],
    uPhone: [],
    uEmail: [null, [Validators.required]],
  });

  constructor(protected dUserService: DUserService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ dUser }) => {
      this.updateForm(dUser);
    });
  }

  updateForm(dUser: IDUser): void {
    this.editForm.patchValue({
      id: dUser.id,
      uForeName: dUser.uForeName,
      uSorName: dUser.uSorName,
      uPhone: dUser.uPhone,
      uEmail: dUser.uEmail,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const dUser = this.createFromForm();
    if (dUser.id !== undefined) {
      this.subscribeToSaveResponse(this.dUserService.update(dUser));
    } else {
      this.subscribeToSaveResponse(this.dUserService.create(dUser));
    }
  }

  private createFromForm(): IDUser {
    return {
      ...new DUser(),
      id: this.editForm.get(['id'])!.value,
      uForeName: this.editForm.get(['uForeName'])!.value,
      uSorName: this.editForm.get(['uSorName'])!.value,
      uPhone: this.editForm.get(['uPhone'])!.value,
      uEmail: this.editForm.get(['uEmail'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDUser>>): void {
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
