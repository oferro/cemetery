import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CemeteryTestModule } from '../../../test.module';
import { DesistUpdateComponent } from 'app/entities/desist/desist-update.component';
import { DesistService } from 'app/entities/desist/desist.service';
import { Desist } from 'app/shared/model/desist.model';

describe('Component Tests', () => {
  describe('Desist Management Update Component', () => {
    let comp: DesistUpdateComponent;
    let fixture: ComponentFixture<DesistUpdateComponent>;
    let service: DesistService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CemeteryTestModule],
        declarations: [DesistUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(DesistUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DesistUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DesistService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Desist(123);
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
        const entity = new Desist();
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
