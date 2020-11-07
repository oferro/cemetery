import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CemeteryTestModule } from '../../../test.module';
import { CandleUpdateComponent } from 'app/entities/candle/candle-update.component';
import { CandleService } from 'app/entities/candle/candle.service';
import { Candle } from 'app/shared/model/candle.model';

describe('Component Tests', () => {
  describe('Candle Management Update Component', () => {
    let comp: CandleUpdateComponent;
    let fixture: ComponentFixture<CandleUpdateComponent>;
    let service: CandleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CemeteryTestModule],
        declarations: [CandleUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(CandleUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CandleUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CandleService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Candle(123);
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
        const entity = new Candle();
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
