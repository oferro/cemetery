import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { CemeteryTestModule } from '../../../test.module';
import { CandleDetailComponent } from 'app/entities/candle/candle-detail.component';
import { Candle } from 'app/shared/model/candle.model';

describe('Component Tests', () => {
  describe('Candle Management Detail Component', () => {
    let comp: CandleDetailComponent;
    let fixture: ComponentFixture<CandleDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ candle: new Candle(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CemeteryTestModule],
        declarations: [CandleDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CandleDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CandleDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load candle on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.candle).toEqual(jasmine.objectContaining({ id: 123 }));
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
