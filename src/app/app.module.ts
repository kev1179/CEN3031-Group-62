import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { UserLoginComponent } from './login/user-login/user-login.component';
import { UserRegistrationComponent } from './user-registration/user-registration/user-registration.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { RestaurantFinderComponent } from './restaurantFinder/restaurantFinder.component';
=======
>>>>>>> bee9748 (yelp api is available @ url /restaurantFinder)
=======
import { RestaurantFinderComponent } from './restaurantFinder/restaurantFinder.component';
>>>>>>> 561ba67 (fixed cors issue with yelp api by adding proxy.)
=======
import { RestaurantFinderComponent } from './restaurantFinder/restaurantFinder.component';
=======
>>>>>>> bee9748 (yelp api is available @ url /restaurantFinder)
>>>>>>> 81f19d1 (yelp api is available @ url /restaurantFinder)

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserLoginComponent,
    UserRegistrationComponent,
    RestaurantFinderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }