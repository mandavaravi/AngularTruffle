import { Routes } from '@angular/router';

// Components
import {AccountComponent} from "./account/account.component";
import {ErrorComponent} from "./error/error.component";
import {HomeComponent} from "./home/home.component";
import {TransactionComponent} from "./transaction/transaction.component";
import { ItemDisplayComponent } from './item/item-display/item-display.component';
import { ItemListComponent } from './item/item-list/item-list.component';
import { CartListComponent } from './cart/cart-list/cart-list.component';
import { BillViewComponent } from './bill/bill-view/bill-view.component';
import { BillListComponent } from './bill/bill-list/bill-list.component';
import { BuyerSignupComponent } from './user/buyer-signup/buyer-signup.component';
import { SellerSignupComponent } from './user/seller-signup/seller-signup.component';
import { SellerItemsComponent } from './item/seller-items/seller-items.component';
import { SellerAddItemComponent } from './item/seller-add-item/seller-add-item.component';

export const UiRoute: Routes = [
  { path: '', redirectTo: 'money', pathMatch: 'full'},
  { path: 'money', component: TransactionComponent },
  { path: 'home', component: HomeComponent},
  { path: 'account', component: AccountComponent},
  {
    path: 'item-display/:iId',
    component: ItemDisplayComponent
  },
  {
    path: 'item-list',
    component: ItemListComponent
  },
  {
    path: 'cart-list',
    component: CartListComponent
  },
  {
    path: 'bill-view',
    component: BillViewComponent
  },
  {
    path: 'bill-list',
    component: BillListComponent
  },
  {
    path: 'buyer-signup',
    component: BuyerSignupComponent
  },
  {
    path: 'seller-signup',
    component: SellerSignupComponent
  },
  {
    path: 'seller-items',
    component: SellerItemsComponent
  },
  {
    path: 'seller-add-item',
    component: SellerAddItemComponent
  },
  { path: '404', component: ErrorComponent },
  { path: '**', redirectTo: '/404' },
];
