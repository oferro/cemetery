import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { CemeteryTestModule } from '../../../test.module';
import { HespedimDetailComponent } from 'app/entities/hespedim/hespedim-detail.component';
import { Hespedim } from 'app/shared/model/hespedim.model';

describe('Component Tests', () => {
  describe('Hespedim Management Detail Component', () => {
    let comp: HespedimDetailComponent;
    let fixture: ComponentFixture<HespedimDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ hespedim: new Hespedim(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CemeteryTestModule],
        declarations: [HespedimDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(HespedimDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(HespedimDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load hespedim on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.hespedim).toEqual(jasmine.objectContaining({ id: 123 }));
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
