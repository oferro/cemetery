import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CemeteryTestModule } from '../../../test.module';
import { HespedimUpdateComponent } from 'app/entities/hespedim/hespedim-update.component';
import { HespedimService } from 'app/entities/hespedim/hespedim.service';
import { Hespedim } from 'app/shared/model/hespedim.model';

describe('Component Tests', () => {
  describe('Hespedim Management Update Component', () => {
    let comp: HespedimUpdateComponent;
    let fixture: ComponentFixture<HespedimUpdateComponent>;
    let service: HespedimService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CemeteryTestModule],
        declarations: [HespedimUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(HespedimUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(HespedimUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(HespedimService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Hespedim(123);
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
        const entity = new Hespedim();
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
