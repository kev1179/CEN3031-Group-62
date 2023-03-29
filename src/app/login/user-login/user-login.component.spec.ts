import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserLoginComponent } from './user-login.component';

describe('UserLoginComponent', () => {
  let component: UserLoginComponent;
  let fixture: ComponentFixture<UserLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserLoginComponent ],
      imports: [ ReactiveFormsModule, HttpClientTestingModule ]
        })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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

  it('should submit valid form', () => {
    component.loginForm.setValue({
      username: 'john',
      password: 'password'
    });
    /*
    expect(component.loginForm.valid).toBeTruthy();
    spyOn(component.auth, 'login').and.callThrough();
    spyOn(window, 'alert');
    component.Login();
    expect(component.auth.login).toHaveBeenCalledWith({
      username: 'john',
      password: 'password'
    });
    expect(window.alert).toHaveBeenCalledWith('success message from server');
  });
  */
})
})