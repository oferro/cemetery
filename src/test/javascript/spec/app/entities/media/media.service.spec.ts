import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { MediaService } from 'app/entities/media/media.service';
import { IMedia, Media } from 'app/shared/model/media.model';
import { MediaType } from 'app/shared/model/enumerations/media-type.model';

describe('Service Tests', () => {
  describe('Media Service', () => {
    let injector: TestBed;
    let service: MediaService;
    let httpMock: HttpTestingController;
    let elemDefault: IMedia;
    let expectedResult: IMedia | IMedia[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(MediaService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Media(0, MediaType.PIC, 'AAAAAAA', currentDate, 'AAAAAAA', false);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            mDate: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Media', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            mDate: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            mDate: currentDate,
          },
          returnedFromService
        );

        service.create(new Media()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Media', () => {
        const returnedFromService = Object.assign(
          {
            mType: 'BBBBBB',
            mDescription: 'BBBBBB',
            mDate: currentDate.format(DATE_FORMAT),
            mLink: 'BBBBBB',
            mNotActive: true,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            mDate: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Media', () => {
        const returnedFromService = Object.assign(
          {
            mType: 'BBBBBB',
            mDescription: 'BBBBBB',
            mDate: currentDate.format(DATE_FORMAT),
            mLink: 'BBBBBB',
            mNotActive: true,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            mDate: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Media', () => {
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
