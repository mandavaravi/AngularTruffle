import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


// Components
import { AccountComponent } from './account/account.component';
import { HomeComponent } from './home/home.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { TransactionComponent } from './transaction/transaction.component';
import { ErrorComponent } from './error/error.component';
import { AppMaterialModule } from "../app-material.module";

// Routing
import { UiRoute} from "./ui.routes";
import { RouterModule} from "@angular/router";

// Services
import { ContractService } from "../services/contract/contract.service";
import { ThreeBox } from "../services/3box.service";
import { ItemDisplayComponent } from './item/item-display/item-display.component';
import { ItemListComponent } from './item/item-list/item-list.component';
import { SellerAddItemComponent } from './item/seller-add-item/seller-add-item.component';
import { SellerItemsComponent } from './item/seller-items/seller-items.component';
import { CartListComponent } from './cart/cart-list/cart-list.component';
import { BillListComponent } from './bill/bill-list/bill-list.component';
import { BillViewComponent } from './bill/bill-view/bill-view.component';
import { BuyerSignupComponent } from './user/buyer-signup/buyer-signup.component';
import { SellerSignupComponent } from './user/seller-signup/seller-signup.component'

@NgModule({
  declarations: [
    AccountComponent,
    HomeComponent,
    TopNavComponent,
    TransactionComponent,
    ErrorComponent,
    ItemDisplayComponent,
    ItemListComponent,
    SellerAddItemComponent,
    SellerItemsComponent,
    CartListComponent,
    BillListComponent,
    BillViewComponent,
    BuyerSignupComponent,
    SellerSignupComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(UiRoute),
    AppMaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    TopNavComponent,
    HomeComponent
  ],
  providers: [
    ContractService,
    ThreeBox
  ],
})
export class UiModule { }
