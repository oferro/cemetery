import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GestBookService } from 'app/entities/gest-book/gest-book.service';
import { IGestBook, GestBook } from 'app/shared/model/gest-book.model';

describe('Service Tests', () => {
  describe('GestBook Service', () => {
    let injector: TestBed;
    let service: GestBookService;
    let httpMock: HttpTestingController;
    let elemDefault: IGestBook;
    let expectedResult: IGestBook | IGestBook[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(GestBookService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new GestBook(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', false);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a GestBook', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new GestBook()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a GestBook', () => {
        const returnedFromService = Object.assign(
          {
            bName: 'BBBBBB',
            bEmail: 'BBBBBB',
            bPhone: 'BBBBBB',
            bContent: 'BBBBBB',
            bNotActive: true,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of GestBook', () => {
        const returnedFromService = Object.assign(
          {
            bName: 'BBBBBB',
            bEmail: 'BBBBBB',
            bPhone: 'BBBBBB',
            bContent: 'BBBBBB',
            bNotActive: true,
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

      it('should delete a GestBook', () => {
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
