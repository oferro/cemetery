import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { DesistService } from 'app/entities/desist/desist.service';
import { IDesist, Desist } from 'app/shared/model/desist.model';

describe('Service Tests', () => {
  describe('Desist Service', () => {
    let injector: TestBed;
    let service: DesistService;
    let httpMock: HttpTestingController;
    let elemDefault: IDesist;
    let expectedResult: IDesist | IDesist[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(DesistService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Desist(
        0,
        'AAAAAAA',
        'AAAAAAA',
        'image/png',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        currentDate,
        currentDate,
        false
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dDateBorn: currentDate.format(DATE_FORMAT),
            dDateDead: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Desist', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dDateBorn: currentDate.format(DATE_FORMAT),
            dDateDead: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dDateBorn: currentDate,
            dDateDead: currentDate,
          },
          returnedFromService
        );

        service.create(new Desist()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Desist', () => {
        const returnedFromService = Object.assign(
          {
            dSorName: 'BBBBBB',
            dForeName: 'BBBBBB',
            dPic: 'BBBBBB',
            dBerthPlace: 'BBBBBB',
            dCareer: 'BBBBBB',
            dEducation: 'BBBBBB',
            dDateBorn: currentDate.format(DATE_FORMAT),
            dDateDead: currentDate.format(DATE_FORMAT),
            dNotActive: true,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dDateBorn: currentDate,
            dDateDead: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Desist', () => {
        const returnedFromService = Object.assign(
          {
            dSorName: 'BBBBBB',
            dForeName: 'BBBBBB',
            dPic: 'BBBBBB',
            dBerthPlace: 'BBBBBB',
            dCareer: 'BBBBBB',
            dEducation: 'BBBBBB',
            dDateBorn: currentDate.format(DATE_FORMAT),
            dDateDead: currentDate.format(DATE_FORMAT),
            dNotActive: true,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dDateBorn: currentDate,
            dDateDead: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Desist', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
