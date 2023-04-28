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


    contract
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
        alert('Tr comp 2 : ' + 2);
        this.contract.failure("Transaction failed");
      });
  }

  getItems() {
    // this.address = this.transactionForm.value.sendaddress;
    // alert(this.address);
    // this.amount = this.transactionForm.value.amount;
    // alert(this.amount);
    // alert(this.direction);

    this.contract
      .getItems(this.direction)
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
