
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GreetingComponent } from './greeting/greeting.component';
import { FormsModule } from '@angular/forms';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { OrderTrackingComponent } from './order-tracking/order-tracking.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { NavbarComponent } from './navbar/navbar.component';  // Import FormsModule

import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    GreetingComponent,
    LoginComponent,
    ProductComponent,
    CartComponent,
    OrderTrackingComponent,
    OrderConfirmationComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
