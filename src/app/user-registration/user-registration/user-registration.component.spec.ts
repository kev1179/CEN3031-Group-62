import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRegistrationComponent } from './user-registration.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserRegistrationComponent', () => {
  let component: UserRegistrationComponent;
  let fixture: ComponentFixture<UserRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRegistrationComponent ],
      imports: [ ReactiveFormsModule, HttpClientTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid registration form', () => {
    expect(component.registrationForm.valid).toBeFalsy();

    component.registrationForm.patchValue({
      firstName: 'Test First',
      lastName: 'Test Last',
      userName: 'testuser',
      email: 'testuser@example.com',
      password: 'testpassword'
    });

    expect(component.registrationForm.valid).toBeTruthy();
  });

  it('should throw an alert when registering with an invalid form', () => {
    spyOn(window, 'alert');
    component.register();
    expect(window.alert).toHaveBeenCalledWith('One or more fields have not been filled out');
  });

  /* it('should log the registration form values when registering with a valid form', () => {
    spyOn(console, 'log');
    component.registrationForm.patchValue({
      firstName: 'Test First',
      lastName: 'Test Last',
      userName: 'testuser',
      email: 'testuser@example.com',
      password: 'testpassword'
    });
    component.register();
    expect(console.log).toHaveBeenCalledWith(component.registrationForm.value);
  }); */
}); 