import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent {
  registrationForm!: FormGroup;
  
  constructor(private fb : FormBuilder) { }

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
      console.log(this.registrationForm.value);
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
