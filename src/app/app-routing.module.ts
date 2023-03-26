import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './login/user-login/user-login.component';
import { UserRegistrationComponent } from './user-registration/user-registration/user-registration.component';
import { AboutComponent } from './about/about/about.component';
import { RestaurantFinderComponent} from './restaurantFinder/restaurantFinder.component';
<<<<<<< HEAD
import { NavbarComponent } from './navbar/navbar.component';
=======
>>>>>>> bee9748 (yelp api is available @ url /restaurantFinder)

const routes: Routes = [
  {path : '', redirectTo : 'about', pathMatch : 'full'},
  {path : 'login', component : UserLoginComponent},
  {path : 'user-registration', component:UserRegistrationComponent},
  {path : 'about', component:AboutComponent},
  {path : 'restaurantFinder', component:RestaurantFinderComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
