import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

const yelpKey = 'Bearer vJWO-KwXQeqVoBm0VutG9cYKFLXSGjlkvKkoB722hx7p1Be79r-b127NpgjEv7BkkWPUWP3SRo9DbafqHapy3AApGIqsbUQkAzhmqMxSuIZ5twJSuBj9BhsKl80bZHYx'; 

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': yelpKey,
    'Content-Type': "application/json",
    //"Access-Control-Allow-Origin":"*",
    //"x-requested-with": "xmlhttprequest"
  })
}

@Injectable({
  providedIn: 'root'
})

export class YelpService {


  
  constructor(public http: HttpClient) { }

  getNearbyRestaurants(latitude: number, longitude: number, searchTerm: string, priceRange: string): Observable<any> {
    const url = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?latitude=${latitude}&longitude=${longitude}&term=${searchTerm}&price=${priceRange}`;
    return this.http.get(url, httpOptions)
  }
}
