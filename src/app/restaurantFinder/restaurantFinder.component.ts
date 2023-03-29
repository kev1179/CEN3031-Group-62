
/*import { Component } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
//import axios from 'axios';
import { YelpService } from '../services/yelp.service';

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
        name: business.name,
        address: business.location.address1,
        price: business.price
      }));
    }
  
    
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
  