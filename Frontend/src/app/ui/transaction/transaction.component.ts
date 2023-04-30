import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ContractService } from "src/app/services/contract/contract.service";

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

  constructor(private fb: FormBuilder, private contract: ContractService) {
    this.transactionForm = new FormGroup({
      sendaddress: new FormControl("", [Validators.required]),
      amount: new FormControl("", [Validators.required]),
    });


    this.contract
      .connectAccount()
      .then((value: any) => {
        this.direction = value;
      })
      .catch((error: any) => {
        console.log(error);
        contract.failure(
          "Could't get the account data, please check if metamask is running correctly and refresh the page"
        );
      });
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
      .addItemToCart(this.direction,  this.direction, 201 + this.tempItIn, "item name " + this.tempItIn, 101, 10, 30, this.direction)
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
  public tempAcc = [
    '0x67B82548B0d34cBc6d993583d6130e2a5f76C8EA',
    '0x11aDC0Fd2591D02677d3604cacC83B1F2843513C',
    '0x14a1aC3334E112ada66c8D70CE22C8DB69786407',
    '0xC65945756b653Ce95031121008a509e2BD48F4a9',
    '0x48FEa6F67f4C401A36b91b956cDBc9E71395722d',
    '0xFa983286366Be51f78a0F991Ac9a7cB709674295',
    '0x8f31E7ea81de995918b9BeA2c487c7a8526f4D3a',
    '0x5BC71457d46C15E54989530389c23ecF98C81bf6',
    '0x91C3e4B4AB4F15778b5B0F881633E1F50837004a',
    '0xb2a9a8f7a803E3Ba1783c0F8226C0cce1CD65650'
  ]
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
