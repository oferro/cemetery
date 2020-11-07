import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CemeteryTestModule } from '../../../test.module';
import { DesistComponent } from 'app/entities/desist/desist.component';
import { DesistService } from 'app/entities/desist/desist.service';
import { Desist } from 'app/shared/model/desist.model';

describe('Component Tests', () => {
  describe('Desist Management Component', () => {
    let comp: DesistComponent;
    let fixture: ComponentFixture<DesistComponent>;
    let service: DesistService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CemeteryTestModule],
        declarations: [DesistComponent],
      })
        .overrideTemplate(DesistComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DesistComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DesistService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Desist(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.desists && comp.desists[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
