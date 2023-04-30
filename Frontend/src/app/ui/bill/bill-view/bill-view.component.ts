import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ContractService } from 'src/app/services/contract/contract.service';
import { EmartService } from 'src/app/services/instacart/emart.service';

@Component({
  selector: 'app-bill-view',
  templateUrl: './bill-view.component.html',
  styleUrls: ['./bill-view.component.scss']
})
export class BillViewComponent implements OnInit {
  cartItems: any;
  amount: number = 0;
  allBills: any;
  currentBuyer: any;
  todayDate: Date = new Date();
  direction: any;
  isTransferSucces = false;




  constructor(protected emartService: EmartService,
    protected router: Router, private contract: ContractService) {
    this.allBills = [];
  }

  ngOnInit(): void {

    // if(JSON.parse(localStorage.getItem("currentBuyer")).buyerId != 0){

    this.currentBuyer = this.emartService.getCurrentBuyer();
    this.cartItems = this.emartService.getAllCart();
    let size = this.cartItems.length;
    alert(JSON.stringify( this.cartItems[0])); 
    for (let i = 0; i < size; i++) {
      this.amount = this.amount + this.cartItems[i].itemPrice;
    }

    this.contract
      .connectAccount()
      .then((value: any) => {
        this.direction = value;
        alert(this.direction);
      })
      .catch((error: any) => {
        console.log(error);
        this.contract.failure(
          "Could't get the account data, please check if metamask is running correctly and refresh the page"
        );
      });

  }

  addBill() {
    alert( JSON.stringify(this.cartItems[0]));
    console.log('addBill 1 :: ' +  this.cartItems[0]['retailerId'] + ' :: amnt :: ' + this.amount);
    // let retAddr = '';

    this.contract.trasnferEther(this.direction, this.cartItems[0]['retailerId'], this.amount).then((r) => {
      console.log(r); 
      alert('Tr comp 1');
      this.isTransferSucces = true;

      this.contract
      .placeOrder(this.direction, this.cartItems[0]['retailerId'], 501, this.amount)
      .then((r) => {
        console.log(r);
        alert('place order comp 1 getting');
        // this.contract.success();  
      })
      .catch((e) => {
        console.log(e);
        alert('place order comp 2 : ' + e);
        this.contract.failure("Getting failed");
      });

      this.contract.success();
    })
      .catch((e) => {
        console.log(e);
        alert('Tr comp 2 : ' + 2);  
        this.contract.failure("Transaction failed");
      });

    this.router.navigate(['home']);
  }

  // sendEth(e) {
  //   console.log(e);
  //   this.address = this.transactionForm.value.sendaddress;
  //   alert(this.address);
  //   this.amount = this.transactionForm.value.amount;
  //   alert(this.amount);
  //   alert(this.direction);

  //   this.contract
  //     .trasnferEther(this.direction, this.address, this.amount)
  //     .then((r) => {
  //       console.log(r);
  //       alert('Tr comp 1');
  //       this.contract.success();
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //       alert('Tr comp 2 : ' + 2);
  //       this.contract.failure("Transaction failed");
  //     });
  // }

}
