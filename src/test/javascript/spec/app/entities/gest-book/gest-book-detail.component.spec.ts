import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { CemeteryTestModule } from '../../../test.module';
import { GestBookDetailComponent } from 'app/entities/gest-book/gest-book-detail.component';
import { GestBook } from 'app/shared/model/gest-book.model';

describe('Component Tests', () => {
  describe('GestBook Management Detail Component', () => {
    let comp: GestBookDetailComponent;
    let fixture: ComponentFixture<GestBookDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ gestBook: new GestBook(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CemeteryTestModule],
        declarations: [GestBookDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(GestBookDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(GestBookDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load gestBook on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.gestBook).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
