import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CookieComponent, UserLoginComponent } from './user-login.component';

describe('UserLoginComponent', () => {
  let component: UserLoginComponent;
  let fixture: ComponentFixture<UserLoginComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserLoginComponent, CookieComponent],
      imports: [HttpClientTestingModule],
      providers: [FormBuilder]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLoginComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize loginForm', () => {
    expect(component.loginForm).toBeDefined();
  });

  it('should have username and password controls', () => {
    expect(component.loginForm.contains('username')).toBeTrue();
    expect(component.loginForm.contains('password')).toBeTrue();
  });

  it('should require username and password', () => {
    const username = component.loginForm.controls['username'];
    const password = component.loginForm.controls['password'];

    username.setValue('');
    password.setValue('');
    expect(component.loginForm.valid).toBeFalse();

    username.setValue('testuser');
    password.setValue('');
    expect(component.loginForm.valid).toBeFalse();

    username.setValue('');
    password.setValue('testpassword');
    expect(component.loginForm.valid).toBeFalse();

    username.setValue('testuser');
    password.setValue('testpassword');
    expect(component.loginForm.valid).toBeTrue();
  });

  it('should call validateForm and display error message if loginForm is invalid', () => {
    spyOn(component, 'validateForm').and.callThrough();
    spyOn(window, 'alert');
    component.Login();
    expect(component.validateForm).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Username or password is incorrect');
  });

  it('should log loginForm values to the console if loginForm is valid', () => {
    spyOn(console, 'log');
    component.loginForm.controls['username'].setValue('testuser');
    component.loginForm.controls['password'].setValue('testpassword');
    component.Login();
    expect(console.log).toHaveBeenCalledWith({username: 'testuser', password: 'testpassword'});
  });
});

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