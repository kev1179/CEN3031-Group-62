import { Component } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms'

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
public loginForm!: FormGroup

}
