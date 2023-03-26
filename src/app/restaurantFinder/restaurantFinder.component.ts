<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 81f19d1 (yelp api is available @ url /restaurantFinder)

/*import { Component } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
//import axios from 'axios';
import { YelpService } from '../services/yelp.service';
=======
import { Component, NgModule } from '@angular/core';
import axios from 'axios';
import { FormsModule } from '@angular/forms';
>>>>>>> bee9748 (yelp api is available @ url /restaurantFinder)
<<<<<<< HEAD
=======
import { Component, OnInit} from '@angular/core';
import axios from 'axios';
import {FormsModule} from '@angular/forms';
>>>>>>> 561ba67 (fixed cors issue with yelp api by adding proxy.)
=======
>>>>>>> 81f19d1 (yelp api is available @ url /restaurantFinder)

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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  price: string
=======
>>>>>>> bee9748 (yelp api is available @ url /restaurantFinder)
=======
  price: string
>>>>>>> 561ba67 (fixed cors issue with yelp api by adding proxy.)
=======
  price: string
=======
>>>>>>> bee9748 (yelp api is available @ url /restaurantFinder)
>>>>>>> 81f19d1 (yelp api is available @ url /restaurantFinder)
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 81f19d1 (yelp api is available @ url /restaurantFinder)
    restaurants: any
    latitude: number = 0;
    longitude: number = 0;
    //searchTerm: string = '';
    //priceRange: string = '1';
    
    searchForm = new FormGroup({
      searchTerm : new FormControl(),
      priceRange : new FormControl()
    })

    constructor(private yelp : YelpService) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
    });
  }
   // ngOnInit() : void {
      
       // this.getNearbyRestaurants().then(restaurants => {
          //this.restaurants = restaurants;
       // });
      //});
   // }
/*
    async getNearbyRestaurants(): Promise<Restaurant[]> {
      const url = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?latitude=${this.latitude}&longitude=${this.longitude}&term=${this.searchTerm}&price=${this.priceRange}`;
      const headers: CustomHeaders = { 
        Authorization: 'Bearer vJWO-KwXQeqVoBm0VutG9cYKFLXSGjlkvKkoB722hx7p1Be79r-b127NpgjEv7BkkWPUWP3SRo9DbafqHapy3AApGIqsbUQkAzhmqMxSuIZ5twJSuBj9BhsKl80bZHYx',
        "Access-Control-Allow-Origin":"*",
        "x-requested-with": "xmlhttprequest",
        'Accept': 'application/json'
      };
      const response = await axios.get<YelpResponse>(url, { headers });
      return response.data.businesses.map((business: { name: any; location: { address1: any; }; price: any; }) => ({
=======
<<<<<<< HEAD
=======
    private configUrl: string = "https://corsanywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=boston&term=steak";

>>>>>>> 561ba67 (fixed cors issue with yelp api by adding proxy.)
=======
>>>>>>> 81f19d1 (yelp api is available @ url /restaurantFinder)
    restaurants: Restaurant[] = [];
    latitude: number = 0;
    longitude: number = 0;
    searchTerm: string = '';
    priceRange: string = '1';
  
    constructor() {
<<<<<<< HEAD
    }

    ngOnInit() : void {
=======
>>>>>>> 81f19d1 (yelp api is available @ url /restaurantFinder)
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.getNearbyRestaurants().then(restaurants => {
          this.restaurants = restaurants;
        });
      });
    }
<<<<<<< HEAD

    async getNearbyRestaurants(): Promise<Restaurant[]> {
      const url = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?latitude=${this.latitude}&longitude=${this.longitude}&term=${this.searchTerm}&price=${this.priceRange}`;
      const headers: CustomHeaders = { 
        Authorization: 'Bearer vJWO-KwXQeqVoBm0VutG9cYKFLXSGjlkvKkoB722hx7p1Be79r-b127NpgjEv7BkkWPUWP3SRo9DbafqHapy3AApGIqsbUQkAzhmqMxSuIZ5twJSuBj9BhsKl80bZHYx',
        "Access-Control-Allow-Origin":"*",
        "x-requested-with": "xmlhttprequest",
        'Accept': 'application/json'
      };
      const response = await axios.get<YelpResponse>(url, { headers });
<<<<<<< HEAD
      return response.data.businesses.map(business => ({
>>>>>>> bee9748 (yelp api is available @ url /restaurantFinder)
=======
      return response.data.businesses.map((business: { name: any; location: { address1: any; }; price: any; }) => ({
>>>>>>> 561ba67 (fixed cors issue with yelp api by adding proxy.)
=======
  
    async getNearbyRestaurants(): Promise<Restaurant[]> {
      const url = `https://api.yelp.com/v3/businesses/search?latitude=${this.latitude}&longitude=${this.longitude}&term=${this.searchTerm}&price=${this.priceRange}`;
      const headers: CustomHeaders = { 
        Authorization: 'Bearer vJWO-KwXQeqVoBm0VutG9cYKFLXSGjlkvKkoB722hx7p1Be79r-b127NpgjEv7BkkWPUWP3SRo9DbafqHapy3AApGIqsbUQkAzhmqMxSuIZ5twJSuBj9BhsKl80bZHYx',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };
      const response = await axios.get<YelpResponse>(url, { headers });
      return response.data.businesses.map(business => ({
>>>>>>> bee9748 (yelp api is available @ url /restaurantFinder)
>>>>>>> 81f19d1 (yelp api is available @ url /restaurantFinder)
        name: business.name,
        address: business.location.address1,
        price: business.price
      }));
    }
<<<<<<< HEAD
  
    
    getNearbyRestaurants() {
      this.yelp.getNearbyRestaurants(this.longitude, this.latitude, this.searchForm.value.searchTerm, this.searchForm.value.priceRange).subscribe(data => {
        this.restaurants = data.businesses[Math.floor(Math.random()*data.businesses.length)]
        console.log(this.restaurants)
        return this.restaurants
      })
    }
  }
*/
    import { Component, OnInit} from '@angular/core';
    import axios from 'axios';
    import {FormGroup, FormControl} from '@angular/forms';
    
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
      price: string
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
    
        //restaurants: Restaurant[] = [];
        restaurants: any
        latitude: number = 0;
        longitude: number = 0;
        searchTerm: string = '';
        priceRange: string = '1';
        /*
        searchForm = new FormGroup({
          searchTerm : new FormControl(),
          priceRange : new FormControl()
        })*/
        constructor() {
        }
    
        ngOnInit() : void {
          navigator.geolocation.getCurrentPosition(position => {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
          });
        }
    
        async getNearbyRestaurants(): Promise<Restaurant[]> {
          const url = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?latitude=${this.latitude}&longitude=${this.longitude}&term=${this.searchTerm}&price=${this.priceRange}`;
          const headers: CustomHeaders = { 
            Authorization: 'Bearer vJWO-KwXQeqVoBm0VutG9cYKFLXSGjlkvKkoB722hx7p1Be79r-b127NpgjEv7BkkWPUWP3SRo9DbafqHapy3AApGIqsbUQkAzhmqMxSuIZ5twJSuBj9BhsKl80bZHYx',
            "Access-Control-Allow-Origin":"*",
            "x-requested-with": "xmlhttprequest",
            'Accept': 'application/json'
          };
          const response = await axios.get<YelpResponse>(url, { headers });
          return response.data.businesses.map((business: { name: any; location: { address1: any; }; price: any; }) => ({
            name: business.name,
            address: business.location.address1,
            price: business.price,
          }));
        }
        submit() : void {
          this.getNearbyRestaurants().then(restaurants => {
            this.restaurants = restaurants;
          });
        }
    }
=======
}
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 81f19d1 (yelp api is available @ url /restaurantFinder)

@NgModule({
    imports: [FormsModule], 
    declarations: [RestaurantFinderComponent],
    exports: [RestaurantFinderComponent]
})
export class RestaurantFinderModule {}
>>>>>>> bee9748 (yelp api is available @ url /restaurantFinder)
<<<<<<< HEAD
=======
>>>>>>> 561ba67 (fixed cors issue with yelp api by adding proxy.)
=======
>>>>>>> 81f19d1 (yelp api is available @ url /restaurantFinder)
  