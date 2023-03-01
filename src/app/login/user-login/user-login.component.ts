import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})

export class UserLoginComponent {
  loginForm!: FormGroup;
  
  constructor(private fb: FormBuilder, private auth: AuthService) { }

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
      this.auth.login(this.loginForm.value)
      .subscribe({
        next:(res)=>{
          alert(res.message);
          this.loginForm.reset();
        },
        error:(err)=>{
          alert(err?.error.message)
        }
      })
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
