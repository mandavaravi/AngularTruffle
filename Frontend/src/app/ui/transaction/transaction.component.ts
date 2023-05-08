import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ContractService } from "src/app/services/contract/contract.service";
import { EmartService } from "src/app/services/instacart/emart.service";

@Component({
  selector: "app-transaction",
  templateUrl: "./transaction.component.html",
  styleUrls: ["./transaction.component.scss"],
})
export class TransactionComponent implements OnInit {
  address: string;
  amount: number;
  direction: any;
  transactionForm: FormGroup;

  constructor(private fb: FormBuilder, private contract: ContractService, protected emartService: EmartService) {
    this.transactionForm = new FormGroup({
      sendaddress: new FormControl("", [Validators.required]),
      amount: new FormControl("", [Validators.required]),
    });

    if (this.emartService.getDirection() == undefined) {
      this.contract
        .connectAccount()
        .then((value: any) => {
          this.direction = value;
          this.emartService.setDirection(this.direction);
        })
        .catch((error: any) => {
          console.log(error);
          contract.failure(
            "Could't get the account data, please check if metamask is running correctly and refresh the page"
          );
        });
    }
  }

  ngOnInit(): void {
    this.transactionForm.valueChanges.subscribe((x) => {
    });
  }

  sendEth(e) {
    console.log(e);
    this.address = this.transactionForm.value.sendaddress;
    alert(this.address);
    this.amount = this.transactionForm.value.amount;
    alert(this.amount);
    alert(this.direction);

    this.contract
      .trasnferEther(this.direction, this.address, this.amount)
      .then((r) => {
        console.log(r);
        alert('Tr comp 1');
        this.contract.success();
      })
      .catch((e) => {
        console.log(e);
        alert('Tr comp 2 : ' + e);
        this.contract.failure("Transaction failed");
      });
  }

  getAllItems() {
    // this.address = this.transactionForm.value.sendaddress;
    // alert(this.address);
    // this.amount = this.transactionForm.value.amount;
    // alert(this.amount);
    // alert(this.direction);
    this.contract
      .getAllItems(this.direction)
      .then((r) => {
        console.log(r);
        alert('Tr comp 1 getting');
        // this.contract.success();  
      })
      .catch((e) => {
        console.log(e);
        alert('Tr comp 2 : ' + e);
        this.contract.failure("Getting failed");
      });
  }

  getItemById() {
    this.contract
      .getItemById(this.direction, 201)
      .then((r) => {
        console.log(r);
        alert('Tr comp 1 getting');
        // this.contract.success();  
      })
      .catch((e) => {
        console.log(e);
        alert('Tr comp 2 : ' + e);
        this.contract.failure("Getting failed");
      });
  }


  public temp1: number = 0;
  addUser() {

    alert("name " + this.temp1 + " -- " + "addr " + this.temp1 + " -- " + this.tempAcc[this.temp1]);
    this.contract
      .addUser(this.direction, "name " + this.temp1 + "", "addr " + this.temp1 + "", this.tempAcc[this.temp1])
      .then((r) => {
        console.log(r);
        alert('Tr comp 1 getting');
        this.temp1++;
        // this.contract.success();  
      })
      .catch((e) => {
        console.log(e);
        alert('Tr comp 2 : ' + e);
        this.contract.failure("Getting failed");
      });
  }

  getAllUsers() {
    this.contract
      .getAllUsers(this.direction)
      .then((r) => {
        // list of retailer structs
        console.log(r);
        alert('Tr comp 1 getting');
        // this.contract.success();  
      })
      .catch((e) => {
        console.log(e);
        alert('Tr comp 2 : ' + e);
        this.contract.failure("Getting failed");
      });
  }

  getUserById() {
    this.contract
      .getUserById(this.direction, this.direction[0])
      .then((r) => {
        console.log(r);
        alert('Tr comp 1 getting');
        // this.contract.success();  
      })
      .catch((e) => {
        console.log(e);
        alert('Tr comp 2 : ' + e);
        this.contract.failure("Getting failed");
      });
  }

  public tempItCart = 0;
  addItemToCart() {
    // this.dir, name, catId, price, quantity, retailerId, itemId
    this.contract
      .addItemToCart(this.direction, this.direction, 201 + this.tempItIn, "item name " + this.tempItIn, 101, 10, 30, this.direction)
      .then((r) => {
        console.log(r);
        this.tempItIn++;
        alert('Tr comp 1 getting');
        // this.contract.success();  
      })
      .catch((e) => {
        console.log(e);
        alert('Tr comp 2 : ' + e);
        this.contract.failure("Getting failed");
      });
  }


  viewCart() {
    // this.dir, name, catId, price, quantity, retailerId, itemId
    this.contract
      .viewCart(this.direction, this.direction)
      .then((r) => {
        console.log(r);
        alert('Tr comp 1 getting');
        // this.contract.success();  
      })
      .catch((e) => {
        console.log(e);
        alert('Tr comp 2 : ' + e);
        this.contract.failure("Getting failed");
      });
  }

  updateCart() {
    // this.dir, name, catId, price, quantity, retailerId, itemId
    this.contract
      .updateCart(this.direction, this.direction, 201, 50)
      .then((r) => {
        console.log(r);
        alert('Tr comp 1 getting');
        // this.contract.success();  
      })
      .catch((e) => {
        console.log(e);
        alert('Tr comp 2 : ' + e);
        this.contract.failure("Getting failed");
      });
  }

  removeItemFromCart() {
    // this.dir, name, catId, price, quantity, retailerId, itemId
    this.contract
      .removeItemFromCart(this.direction, this.direction, 201)
      .then((r) => {
        console.log(r);
        alert('Tr comp 1 getting');
        // this.contract.success();  
      })
      .catch((e) => {
        console.log(e);
        alert('Tr comp 2 : ' + e);
        this.contract.failure("Getting failed");
      });
  }


  public temp: number = 0;
  public tempAcc =
    [
      '0xD8946B60d860F2d955aFAAc110c5F544739c7a46',
      '0x34eE2e8352d5b398C7c102152aE768f44Ad63CCd',
      '0xb3078258C22ED63BD4c4f4f74ed9514071E40028',
      '0xFA3157e69483Db8A9AcF9E66239c143309249b04',
      '0x5a64eB732F054E1593eAA61403eBc1d6ea606662',
      '0xCEb5CD45a07dCC7d5DC47A48eB2DBa05C40abB2b',
      '0xFf1B96669e577AEbBb188D95De4021580CBEB49D',
      '0x726c304795d4fFcc93F292a4CE1B2B9BA600f4aD',
      '0x4e76c85fDd5728626D7Cd3849a0168E92E7800e4',
      '0x038a39be4C622b2cF89A4155Be94be5dBa210FA5'
    ];
  addRetailer() {

    alert("name " + this.temp + " -- " + "addr " + this.temp + " -- " + this.tempAcc[this.temp]);
    this.contract
      .addRetailer(this.direction, this.tempAcc[this.temp], "name " + this.temp + "", "addr " + this.temp + "")
      .then((r) => {
        console.log(r);
        alert('Tr comp 1 getting');
        this.temp++;
        // this.contract.success();  
      })
      .catch((e) => {
        console.log(e);
        alert('Tr comp 2 : ' + e);
        this.contract.failure("Getting failed");
      });
  }


  getRetailerById() {
    this.contract
      .getRetailerById(this.direction, this.direction)
      .then((r) => {
        console.log(r);
        alert('Tr comp 1 getting');
        // this.contract.success();  
      })
      .catch((e) => {
        console.log(e);
        alert('Tr comp 2 : ' + e);
        this.contract.failure("Getting failed");
      });
  }


  getAllRetailer() {
    this.contract
      .getAllRetailer(this.direction)
      .then((r) => {
        // list of retailer structs
        console.log(r);
        alert('Tr comp 1 getting');
        // this.contract.success();  
      })
      .catch((e) => {
        console.log(e);
        alert('Tr comp 2 : ' + e);
        this.contract.failure("Getting failed");
      });
  }

  public tempItIn = 0;
  addnewItemToInvt() {
    // this.dir, name, catId, price, quantity, retailerId, itemId
    this.contract
      .addnewItemToInvt(this.direction, "item name " + this.tempItIn, 101, 10, 100, this.direction, 201 + this.tempItIn)
      .then((r) => {
        console.log(r);
        this.tempItIn++;
        alert('Tr comp 1 getting');
        // this.contract.success();  
      })
      .catch((e) => {
        console.log(e);
        alert('Tr comp 2 : ' + e);
        this.contract.failure("Getting failed");
      });
  }

  viewInventory() {
    // this.dir, name, catId, price, quantity, retailerId, itemId
    this.contract
      .viewInventory(this.direction, this.direction)
      .then((r) => {
        console.log(r);
        alert('Tr comp 1 getting');
        // this.contract.success();  
      })
      .catch((e) => {
        console.log(e);
        alert('Tr comp 2 : ' + e);
        this.contract.failure("Getting failed");
      });
  }

  UpdateInventory() {
    // this.dir, name, catId, price, quantity, retailerId, itemId
    this.contract
      .UpdateInventory(this.direction, 201, 150, this.direction)
      .then((r) => {
        console.log(r);
        alert('Tr comp 1 getting');
        // this.contract.success();  
      })
      .catch((e) => {
        console.log(e);
        alert('Tr comp 2 : ' + e);
        this.contract.failure("Getting failed");
      });
  }

  removeItemInventory() {
    // this.dir, name, catId, price, quantity, retailerId, itemId
    this.contract
      .removeItemInventory(this.direction, this.direction, 201)
      .then((r) => {
        console.log(r);
        alert('Tr comp 1 getting');
        // this.contract.success();  
      })
      .catch((e) => {
        console.log(e);
        alert('Tr comp 2 : ' + e);
        this.contract.failure("Getting failed");
      });
  }




}
