
    import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
    import { Loader } from '@googlemaps/js-api-loader';
    import axios from 'axios';
    import {FormGroup, FormControl} from '@angular/forms';
    import { ReviewService, Review } from '../review.service';
    
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
 
      price: string;
    }
    
    type CustomHeaders = {
        [key: string]: string;
    };  
    
    @Component({
      selector: 'app-restaurantFinder',
      templateUrl: './restaurantFinder.component.html',
      styleUrls: ['./restaurantFinder.component.css'],
      template: `
    <div #mapContainer style="height: 500px"></div>
  `,
    })
    
    // google api AIzaSyCotSaf51Alf1UCST9yeT25a27lBXMZ38Y
    export class RestaurantFinderComponent {
    
        //restaurants: Restaurant[] = [];
        restaurants: any;

        latitude: number = 0;
        longitude: number = 0;
        searchTerm: string = '';
        priceRange: string = '1';
        //title = "google-maps";

        reviews: Review[] = [];
        selectedRestaurant: string = '';
        reviewerName: string = '';
        reviewRating: number = 1;
        reviewComment: string = '';
        @ViewChild('mapContainer')
      mapContainer!: ElementRef;
        map!: google.maps.Map;
  markers: google.maps.Marker[] = [];
        
        searchForm = new FormGroup({
          searchTerm : new FormControl(),
          priceRange : new FormControl()
        })

        constructor(private reviewService: ReviewService)  {}
    
        ngOnInit() : void {
          navigator.geolocation.getCurrentPosition(position => {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
          });
          
          let loader = new Loader({
            apiKey : "AIzaSyCotSaf51Alf1UCST9yeT25a27lBXMZ38Y"
          });

          loader.load().then(async () => {
            new google.maps.Map(document.getElementById("map") as HTMLElement,{
              center: {lat: 29.651634, lng: -82.324829 },
              zoom: 14
            })
            //const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
            //map = new Map(document.getElementById("map") as HTMLElement)
          });
          
          //this.loadMap();
        }/*
        loadMap() {
          let loader = new Loader({
            apiKey : "AIzaSyCotSaf51Alf1UCST9yeT25a27lBXMZ38Y",
            libraries: ['places']
          });
          loader.load().then(() => {
            const mapOptions: google.maps.MapOptions = {
              center: { lat: 37.7749, lng: -122.4194 },
              zoom: 12,
            };
            let map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
      
            const center = map.getCenter();
      
            map.addListener('click', (event: google.maps.KmlMouseEvent) => {
              //const location = event.latLng.toJSON();
              //this.map.setCenter(location);
            });
          });
        }
        */
        async getNearbyRestaurants(): Promise<Restaurant[]> {
          const url = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?latitude=${this.latitude}&longitude=${this.longitude}&term=${this.searchTerm}&price=${this.priceRange}`;
          const headers: CustomHeaders = { 
            Authorization: 'Bearer vJWO-KwXQeqVoBm0VutG9cYKFLXSGjlkvKkoB722hx7p1Be79r-b127NpgjEv7BkkWPUWP3SRo9DbafqHapy3AApGIqsbUQkAzhmqMxSuIZ5twJSuBj9BhsKl80bZHYx',
            "Access-Control-Allow-Origin":"*",
            "x-requested-with": "xmlhttprequest",
            'Accept': 'application/json'
          };
          const response = await axios.get<YelpResponse>(url, { headers });
          return response.data.businesses.map((business: { name: any; location: { address1: any;}; price: any; }) => ({
            name: business.name,
            address: business.location.address1,
            price: business.price,
          }));
        }


        submit() : void {
          this.getNearbyRestaurants().then(restaurants => {
            this.restaurants = restaurants;
          });/*
          this.restaurants.array.forEach(this.restaurants => {
            geocoder: new google.maps.Geocoder();
            //geocoder.geocode({address: this.restaurants.address}, {results, status} =>{}
              )
            //const position = new google.maps.LatLng(business.coordinates.latitude, business.coordinates.longitude);
            const marker = new google.maps.Marker({
              position: ,
              map: this.map,
              title: this.restaurants.name
            })
          });*/
        }

        submitReview() {
          if (this.selectedRestaurant && this.reviewerName && this.reviewRating && this.reviewComment) {
            const review: Review = {
              restaurantName: this.selectedRestaurant,
              reviewerName: this.reviewerName,
              reviewRating: this.reviewRating,
              reviewComment: this.reviewComment,
            };
        
            this.reviewService.postReview(review).subscribe(
              (response: any) => {
                console.log('Review submitted:', response);
                // Add the submitted review to the local reviews array
                this.reviews.push(review);
              },
              (error : any) => {
                console.error('Error submitting review:', error);
              }
            );
        
            this.selectedRestaurant = '';
            this.reviewerName = '';
            // Remove the line below
            // this.reviewRating = null;
            this.reviewComment = '';
          }
        }        
        
    }
