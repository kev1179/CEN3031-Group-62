import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
<<<<<<< HEAD
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
=======
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from 'src/app/services/auth.service';
>>>>>>> 06ca4f0 (Saved changes)
import { UserLoginComponent } from './user-login.component';

describe('UserLoginComponent', () => {
  let component: UserLoginComponent;
  let fixture: ComponentFixture<UserLoginComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLoginComponent ],
<<<<<<< HEAD
      imports: [ ReactiveFormsModule, HttpClientTestingModule ]
=======
      imports: [ ReactiveFormsModule, HttpClientTestingModule ],
      providers: [ AuthService ]
>>>>>>> 06ca4f0 (Saved changes)
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpTestingController = TestBed.inject(HttpTestingController);
  });

<<<<<<< HEAD
  afterEach(() => {
    httpTestingController.verify();
  });

=======
>>>>>>> 06ca4f0 (Saved changes)
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

<<<<<<< HEAD
  /* it('should submit valid form', () => {
=======
  it('should submit valid form', () => {
>>>>>>> 06ca4f0 (Saved changes)
    component.loginForm.setValue({
      username: 'john',
      password: 'password'
    });
    expect(component.loginForm.valid).toBeTruthy();
<<<<<<< HEAD
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
=======
    spyOn(component.auth, 'login').and.callThrough();
    spyOn(window, 'alert');
    component.Login();
    expect(component.auth.login).toHaveBeenCalledWith({
      username: 'john',
      password: 'password'
    });
    expect(window.alert).toHaveBeenCalledWith('success message from server');
  });
});
>>>>>>> 06ca4f0 (Saved changes)
