import { AboutComponent } from './about.component';
import { TestBed } from '@angular/core/testing';

describe('AboutComponent', () => {
  let component: AboutComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutComponent ],
    });
    component = TestBed.createComponent(AboutComponent).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title of "About"', () => {
    expect(component.Title).toBeTruthy();
  });
<<<<<<< HEAD
});
=======
}); 
>>>>>>> bee9748 (yelp api is available @ url /restaurantFinder)
