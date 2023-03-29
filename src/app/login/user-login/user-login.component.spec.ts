import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserLoginComponent } from './user-login.component';

describe('UserLoginComponent', () => {
  let component: UserLoginComponent;
  let fixture: ComponentFixture<UserLoginComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLoginComponent ],
      imports: [ ReactiveFormsModule, HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit invalid form', () => {
    component.loginForm.setValue({
      username: '',
      password: ''
    });
    expect(component.loginForm.valid).toBeFalsy();
    spyOn(window, 'alert');
    component.Login();
    expect(window.alert).toHaveBeenCalledWith('Username or password is incorrect');
  });

  /* it('should submit valid form', () => {
    component.loginForm.setValue({
      username: 'john',
      password: 'password'
    });
    expect(component.loginForm.valid).toBeTruthy();
    spyOn(component, 'Login').and.callThrough();
    spyOn(window, 'alert');
    component.Login();
    const req = httpTestingController.expectOne('http://localhost:8080/login');
    expect(req.request.method).toEqual('POST');
    req.flush({ message: 'success message from server' });
    expect(component.Login).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('success message from server');
  }); */
});
