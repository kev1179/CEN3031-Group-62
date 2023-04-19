import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Review {
  reviewerName: string;
  reviewRating: number;
  reviewComment: string;
  restaurantName: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'http://localhost:8080/'; 

  constructor(private http: HttpClient) {}

  postReview(review: Review): Observable<any> {
    return this.http.post<any>('http://localhost:8080/write-review', review);
  }
}
