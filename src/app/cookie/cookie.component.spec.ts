import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CookieComponent } from './cookie.component';
  
  describe('CookieComponent', () => {
    let component: CookieComponent;
    let fixture: ComponentFixture<CookieComponent>;
    let httpTestingController: HttpTestingController;
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [ CookieComponent ],
        imports: [ HttpClientTestingModule ]
      })
      .compileComponents();
  
      httpTestingController = TestBed.inject(HttpTestingController);
    });
  
    beforeEach(() => {
      fixture = TestBed.createComponent(CookieComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    afterEach(() => {
      httpTestingController.verify();
    });
  
    it('should send a request with the cookie header', () => {
      const cookieName = 'myCookie';
      const cookieValue = 'myCookieValue';
      const apiUrl = 'http://localhost:8080';
      const endpoint = '/my-endpoint';
  
      component.sendRequest();
  
      const req = httpTestingController.expectOne(`${apiUrl}${endpoint}`);
      expect(req.request.headers.get('Cookie')).toEqual(`${cookieName}=${cookieValue}`);
  
      const responseBody = 'some response';
      req.flush(responseBody);
  
      expect(component.response).toEqual(responseBody);
    });
  });