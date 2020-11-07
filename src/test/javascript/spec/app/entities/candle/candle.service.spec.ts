import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CandleService } from 'app/entities/candle/candle.service';
import { ICandle, Candle } from 'app/shared/model/candle.model';

describe('Service Tests', () => {
  describe('Candle Service', () => {
    let injector: TestBed;
    let service: CandleService;
    let httpMock: HttpTestingController;
    let elemDefault: ICandle;
    let expectedResult: ICandle | ICandle[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(CandleService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new Candle(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', false);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Candle', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Candle()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Candle', () => {
        const returnedFromService = Object.assign(
          {
            cName: 'BBBBBB',
            cEmail: 'BBBBBB',
            cPhone: 'BBBBBB',
            cContent: 'BBBBBB',
            cNotActive: true,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Candle', () => {
        const returnedFromService = Object.assign(
          {
            cName: 'BBBBBB',
            cEmail: 'BBBBBB',
            cPhone: 'BBBBBB',
            cContent: 'BBBBBB',
            cNotActive: true,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Candle', () => {
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
