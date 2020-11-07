import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CemeteryTestModule } from '../../../test.module';
import { GestBookUpdateComponent } from 'app/entities/gest-book/gest-book-update.component';
import { GestBookService } from 'app/entities/gest-book/gest-book.service';
import { GestBook } from 'app/shared/model/gest-book.model';

describe('Component Tests', () => {
  describe('GestBook Management Update Component', () => {
    let comp: GestBookUpdateComponent;
    let fixture: ComponentFixture<GestBookUpdateComponent>;
    let service: GestBookService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CemeteryTestModule],
        declarations: [GestBookUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(GestBookUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GestBookUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GestBookService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new GestBook(123);
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
        const entity = new GestBook();
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
