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
  orderIdCount = 0;




  constructor(protected emartService: EmartService,
    protected router: Router, private contract: ContractService) {
    this.allBills = [];
  }

  ngOnInit(): void {

    this.direction = this.emartService.getDirection();

    // this.currentBuyer = this.emartService.getCurrentBuyer();
    this.cartItems = this.emartService.getAllCart(this.direction).subscribe(
      (res) => {
        this.cartItems = res;

        let size = this.cartItems.length;
        for (let i = 0; i < size; i++) {
          this.amount = this.amount + this.cartItems[i].itemPrice;
        }
        alert("bill view amnt :: " + this.amount);
      }
    );


  }

  addBill() {
    let size = this.cartItems.length;
    this.amount = 0;
    for (let i = 0; i < size; i++) {
      this.amount = this.amount + this.cartItems[i].itemPrice;
    }
    //alert(JSON.stringify(this.cartItems[0]));
    console.log('addBill 1 :: ' + this.cartItems[0]['retailerId'] + ' :: amnt :: ' + this.amount);
    // let retAddr = '';

    this.emartService.getAllBills(this.emartService.getDirection()).subscribe(
      (res) => {
        //alert('all bills : ' + JSON.stringify(res));

        let allorderIds = Object.keys(res);
        this.orderIdCount = +allorderIds[allorderIds.length - 1];

      }
    );

    this.contract.trasnferEther(this.direction, this.cartItems[0]['retailerId'], this.amount).then((r) => {
      console.log(r);
      //alert('Tr comp 1 - 71');
      alert("Transacted to retailer");
      this.isTransferSucces = true;

      this.contract
        .placeOrder(this.direction, this.cartItems[0]['retailerId'], this.orderIdCount + 1, this.amount)
        .then((r) => {
          console.log(r);
          alert('Order details updated in contract');
          // //alert(this.orderIdCount + 1);   
          this.emartService.addBill(this.direction, this.orderIdCount + 1).subscribe(
            (res) => {
            },
            (err) => {
              console.log(err);
              if (err.status == 200) {
                //alert('place succsess- 83');
                for (let i = 0; i < size; i++) {
                  this.emartService.deleteCartItem(this.cartItems[i], this.emartService.getDirection()).subscribe(
                    (res) => {
                      console.log(res);
                      //alert('delete succsess - 88');
                    },
                    (err) => {
                      console.log(err.status);
                      if (i == size - 1) {
                        this.router.navigate(['bill-list']);
                      }
                      //alert('delete fail - 92');
                      if (err.status == 200) {
                        //alert('delete fail - 94');
                      }
                    }
                  );
                }
                this.emartService.getAllCart(this.emartService.getDirection()).subscribe(
                  (res) => {
                    alert("get cart" + JSON.stringify(res));
                  },
                  (err) => {
                    alert("get cart");
                    console.log(err.status);
                    //alert('delete fail - 92');
                    if (err.status == 200) {
                      //alert('delete fail - 94');
                    }
                  }
                );

                this.router.navigate(['bill-list']);
              }
            }
          );
          // this.contract.success();  
        })
        .catch((e) => {
          console.log(e);
          //alert('place order comp 2 : ' + e);
          this.contract.failure("Getting failed");
        });

      this.contract.success();
    })
      .catch((e) => {
        console.log(e);
        //alert('Tr comp 2 : ' + 2);
        this.contract.failure("Transaction failed");
      });
  }

  // sendEth(e) {
  //   console.log(e);
  //   this.address = this.transactionForm.value.sendaddress;
  //   //alert(this.address);
  //   this.amount = this.transactionForm.value.amount;
  //   //alert(this.amount);
  //   //alert(this.direction);

  //   this.contract
  //     .trasnferEther(this.direction, this.address, this.amount)
  //     .then((r) => {
  //       console.log(r);
  //       //alert('Tr comp 1');
  //       this.contract.success();
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //       //alert('Tr comp 2 : ' + 2);
  //       this.contract.failure("Transaction failed");
  //     });
  // }

}
