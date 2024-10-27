import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { CartComponent } from './cart/cart.component';
import { OrderTrackingComponent } from './order-tracking/order-tracking.component';
import { ProductComponent } from './product/product.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DeliveryFormComponent } from './delivery-form/delivery-form.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { StcoktManagerComponent } from './prodct-manager/stock-manager.component';
import { OrderManagementComponent } from './order-management/order-management.component';


const routes: Routes = [
  { path: 'ordersAllClient', component:  OrderManagementComponent  }, 
  { path: 'stock', component:  StcoktManagerComponent  }, 
  { path: 'products', component:  ProductComponent  }, 
  { path: 'product/:id', component: ProductDetailComponent }, // Détails du produit
  { path: 'login', component:  LoginComponent }, 
  { path: 'register', component:  RegisterComponent },
   { path: 'delivery', component:  DeliveryFormComponent },  
  { path: 'confirm-order', component: OrderConfirmationComponent },  // Ajoutez cette route
  { path: 'cart', component: CartComponent  },
 { path: 'orders', component: OrderTrackingComponent },
 { path: '', redirectTo: '/products', pathMatch: 'full' },
 { path: '**', redirectTo: '/products' }  // Redirection par défaut
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
