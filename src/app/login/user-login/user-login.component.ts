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
  
  constructor(private fb: FormBuilder, private http : HttpClient) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  Login() {
    if(this.loginForm.valid) {
      //sends user data to database

      let formObj = this.loginForm.getRawValue();
      let serializedForm = JSON.stringify(this.loginForm.value);
      this.http.post('http://localhost:8080/login', this.loginForm.value)
      .subscribe(
        data => console.log("success", data),
        error => console.error("couldn't post because", error)
      );
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
