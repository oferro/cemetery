import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CemeteryTestModule } from '../../../test.module';
import { DUserUpdateComponent } from 'app/entities/d-user/d-user-update.component';
import { DUserService } from 'app/entities/d-user/d-user.service';
import { DUser } from 'app/shared/model/d-user.model';

describe('Component Tests', () => {
  describe('DUser Management Update Component', () => {
    let comp: DUserUpdateComponent;
    let fixture: ComponentFixture<DUserUpdateComponent>;
    let service: DUserService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CemeteryTestModule],
        declarations: [DUserUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(DUserUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DUserUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DUserService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new DUser(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new DUser();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
