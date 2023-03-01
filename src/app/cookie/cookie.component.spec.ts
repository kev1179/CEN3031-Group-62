import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CookieComponent } from './cookie.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { expect } from '@jest/globals';

describe('CookieComponent', () => {
    let component: CookieComponent;
    let fixture: ComponentFixture<CookieComponent>;
    let httpMock: HttpTestingController;
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [CookieComponent],
        imports: [HttpClientTestingModule]
      }).compileComponents();
  
      httpMock = TestBed.inject(HttpTestingController);
    });
  
    beforeEach(() => {
      fixture = TestBed.createComponent(CookieComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    afterEach(() => {
      httpMock.verify();
    });
  
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });
  
    it('should send request with correct headers', () => {
      component.sendRequest();
      const req = httpMock.expectOne('http://localhost:8080/my-endpoint');
      expect(req.request.headers.get('Cookie')).toEqual('myCookie=myCookieValue');
    });
  
    it('should display the response', () => {
      const testResponse = 'Test response';
      component.sendRequest();
      const req = httpMock.expectOne('http://localhost:8080/my-endpoint');
      req.flush(testResponse);
      expect(component.response).toEqual(testResponse);
    });
  });
