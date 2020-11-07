import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDUser } from 'app/shared/model/d-user.model';

@Component({
  selector: 'jhi-d-user-detail',
  templateUrl: './d-user-detail.component.html',
})
export class DUserDetailComponent implements OnInit {
  dUser: IDUser | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ dUser }) => (this.dUser = dUser));
  }

  previousState(): void {
    window.history.back();
  }
}
