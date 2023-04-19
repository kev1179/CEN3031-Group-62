/*import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RestaurantFinderComponent } from './restaurantFinder.component';
import {FormGroup, FormControl} from '@angular/forms';
import axios from 'axios';
import { of } from 'rxjs';

describe('RestaurantFinderComponent', () => {
  let component: RestaurantFinderComponent;
  let fixture: ComponentFixture<RestaurantFinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantFinderComponent, FormControl, FormGroup ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve nearby restaurants when submitting the form', () => {
    const restaurants: any = [{ name: 'Restaurant 1', address: 'Address 1', price: '1' }, { name: 'Restaurant 2', address: 'Address 2', price: '2' }];
    const getNearbyRestaurantsSpy = spyOn(component, 'getNearbyRestaurants').and.returnValue(Promise.resolve(restaurants));
    const submitButton = fixture.nativeElement.querySelector('button');
    submitButton.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(getNearbyRestaurantsSpy).toHaveBeenCalled();
      expect(component.restaurants).toEqual(restaurants);
    });
  });

  it('should set latitude and longitude when initializing', () => {
    const position = { coords: { latitude: 37.7749, longitude: -122.4194 } };
    spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake((callback: any) => {
      callback(position);
    });
    component.ngOnInit();
    expect(component.latitude).toBe(position.coords.latitude);
    expect(component.longitude).toBe(position.coords.longitude);
  });

  it('should retrieve nearby restaurants from the Yelp API', () => {
    const restaurants: any = [{ name: 'Restaurant 1', location: { address1: 'Address 1' }, price: '1' }, { name: 'Restaurant 2', location: { address1: 'Address 2' }, price: '2' }];
    const response = { data: { businesses: restaurants } };
    spyOn(axios, 'get').and.returnValue(Promise.resolve(response));
    component.latitude = 37.7749;
    component.longitude = -122.4194;
    component.searchTerm = 'pizza';
    component.priceRange = '1';
    component.getNearbyRestaurants().then(result => {
      expect(result).toEqual([{ name: 'Restaurant 1', address: 'Address 1', price: '1' }, { name: 'Restaurant 2', address: 'Address 2', price: '2' }]);
      expect(axios.get).toHaveBeenCalledWith(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?latitude=37.7749&longitude=-122.4194&term=pizza&price=1`, { headers: jasmine.any(Object) });
    });
  });
});
*/