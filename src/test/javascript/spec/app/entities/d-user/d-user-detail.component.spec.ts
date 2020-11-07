import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CemeteryTestModule } from '../../../test.module';
import { DUserDetailComponent } from 'app/entities/d-user/d-user-detail.component';
import { DUser } from 'app/shared/model/d-user.model';

describe('Component Tests', () => {
  describe('DUser Management Detail Component', () => {
    let comp: DUserDetailComponent;
    let fixture: ComponentFixture<DUserDetailComponent>;
    const route = ({ data: of({ dUser: new DUser(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CemeteryTestModule],
        declarations: [DUserDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(DUserDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DUserDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load dUser on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.dUser).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
