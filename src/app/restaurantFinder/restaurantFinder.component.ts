import { Component, NgModule } from '@angular/core';
import axios from 'axios';
import { FormsModule } from '@angular/forms';

interface YelpBusiness {
  name: string;
  location: {
    address1: string;
  };
  price: string;
}

interface YelpResponse {
  businesses: YelpBusiness[];
}

interface Restaurant {
  name: string;
  address: string;
}

type CustomHeaders = {
    [key: string]: string;
};  

@Component({
  selector: 'app-restaurantFinder',
  templateUrl: './restaurantFinder.component.html',
  styleUrls: ['./restaurantFinder.component.css']
})

export class RestaurantFinderComponent {
    restaurants: Restaurant[] = [];
    latitude: number = 0;
    longitude: number = 0;
    searchTerm: string = '';
    priceRange: string = '1';
  
    constructor() {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.getNearbyRestaurants().then(restaurants => {
          this.restaurants = restaurants;
        });
      });
    }
  
    async getNearbyRestaurants(): Promise<Restaurant[]> {
      const url = `https://api.yelp.com/v3/businesses/search?latitude=${this.latitude}&longitude=${this.longitude}&term=${this.searchTerm}&price=${this.priceRange}`;
      const headers: CustomHeaders = { 
        Authorization: 'Bearer vJWO-KwXQeqVoBm0VutG9cYKFLXSGjlkvKkoB722hx7p1Be79r-b127NpgjEv7BkkWPUWP3SRo9DbafqHapy3AApGIqsbUQkAzhmqMxSuIZ5twJSuBj9BhsKl80bZHYx',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };
      const response = await axios.get<YelpResponse>(url, { headers });
      return response.data.businesses.map(business => ({
        name: business.name,
        address: business.location.address1,
        price: business.price
      }));
    }
}

@NgModule({
    imports: [FormsModule], 
    declarations: [RestaurantFinderComponent],
    exports: [RestaurantFinderComponent]
})
export class RestaurantFinderModule {}
  