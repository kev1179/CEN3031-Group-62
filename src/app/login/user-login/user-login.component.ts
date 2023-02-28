import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})

export class UserLoginComponent {
  loginForm!: FormGroup;
  
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  Login() {
    if(this.loginForm.valid) {
      //sends user data to database
      console.log(this.loginForm.value);
    } else {
      //throws error
      this.validateForm(this.loginForm);
      alert("Username or password is incorrect");
    }
  }

  private validateForm(formGroup:FormGroup) {
    Object.keys(formGroup.controls).forEach(field=>{
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({onlySelf:true})
      } else if (control instanceof FormGroup) {
        this.validateForm(control)
      }
    })
  }
}

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
