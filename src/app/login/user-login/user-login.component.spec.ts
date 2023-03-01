import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UserLoginComponent } from './user-login.component';
import { expect } from '@jest/globals';

describe('UserLoginComponent', () => {
  let component: UserLoginComponent;
  let fixture: ComponentFixture<UserLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserLoginComponent ],
      imports: [ ReactiveFormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should validate the form when it is invalid', () => {
    component.loginForm.setValue({
      username: '',
      password: ''
    });
    component.Login();
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should not validate the form when it is valid', () => {
    component.loginForm.setValue({
      username: 'test',
      password: 'password'
    });
    component.Login();
    expect(component.loginForm.valid).toBeTruthy();
  });
});