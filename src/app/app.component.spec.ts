<<<<<<< HEAD
import { TestBed } from '@angular/core/testing';
=======
<<<<<<< HEAD
import { ComponentFixture, TestBed } from '@angular/core/testing';
=======
import { TestBed } from '@angular/core/testing';
>>>>>>> bee9748 (yelp api is available @ url /restaurantFinder)
>>>>>>> audrey-dev
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from './navbar/navbar.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppComponent, NavbarComponent ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'CEN3031-Group-62'`, () => {
    expect(component.title).toEqual('CEN3031-Group-62');
  });
<<<<<<< HEAD
});
=======

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.title').textContent).toContain('CEN3031-Group-62');
  });
<<<<<<< HEAD
}); 
=======
}); 
>>>>>>> bee9748 (yelp api is available @ url /restaurantFinder)
>>>>>>> audrey-dev
