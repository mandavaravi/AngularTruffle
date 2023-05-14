import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { EmartService } from 'src/app/services/instacart/emart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {
  
  cartItems: any;
  isEmpty: boolean;
  currentBuyer: any;
  constructor(protected emartService:EmartService, protected router: Router) { }

  ngOnInit(): void {


    // if(JSON.parse(localStorage.getItem("currentBuyer")).buyerId != 0){
      // alert(JSON.stringify(this.emartService.getDirection()));
      this.getCart();
  } 

  getCart(){
    this.emartService.getAllCart(this.emartService.getDirection()).subscribe(
      (res) => {
        this.cartItems = res;
        // alert(JSON.stringify(this.cartItems));
        if(this.cartItems.length==0){
          this.isEmpty=false;
        }
        else{
          this.isEmpty=true;
        }    
      }
    );
  
    // if(this.cartItems.length==0){
    //   this.isEmpty=false;
    // }
    // else{
    //   this.isEmpty=true;
    // }
  }

  deleteCartItem(itemNo: number){   
    this.cartItems = this.emartService.deleteCartItem(itemNo, this.emartService.getDirection()).subscribe(
      (res) => {
        console.log(res);
        // alert('delete succsess');
        this.getCart();
      },
      (err) =>{
        console.log(err.status);
        // alert('delete fail');
        if(err.status == 200){
          // alert('delete fail');
          this.getCart();
        }
      }
    );
    if(this.cartItems.length==0){
      this.isEmpty=false;
    }
    else{
      this.isEmpty=true;
    }
  }

  checkOut(Items: any){
    this.emartService.setAllCart(Items);
    this.router.navigate(['bill-view']);
  }

}


