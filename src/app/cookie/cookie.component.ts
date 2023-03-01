import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'app-cookie-component',
    template: `
      <button (click)="sendRequest()">Send Request</button>
      <div *ngIf="response">{{ response }}</div>
    `,
})

export class CookieComponent {
    private apiUrl = 'http://localhost:8080';
    private cookieName = 'myCookie';
    public response = ' ';
  
    constructor(private http: HttpClient) {}
  
    public sendRequest() {
      const headers = new HttpHeaders().set('Cookie', `${this.cookieName}=myCookieValue`);
      this.http.get<string>(`${this.apiUrl}/my-endpoint`, { headers }).subscribe((response) => {
        this.response = response;
      });
    }
}