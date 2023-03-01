import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent {
  registrationForm!: FormGroup;
  
  constructor(private fb : FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  register() {
    if(this.registrationForm.valid) {
      //send info to database
      this.auth.signUp(this.registrationForm.value)
      .subscribe({
        next:(res=>{
          alert(res.message);
          this.registrationForm.reset();
          this.router.navigate(['login']);
        })
        ,error:(err=>{
          alert(err?.error.message)
        })
      })
    } else {
      this.validateForm(this.registrationForm);
      alert("One or more fields have not been filled out");

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
