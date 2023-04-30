import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationWidth } from '@angular/common';
import { tick } from '@angular/core/testing';
import { EmartService } from 'src/app/services/instacart/emart.service';


@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.scss']
})
export class BillListComponent implements OnInit {

  allBills: any[];
  currentBuyer: any;
  isEmpty: boolean = false;
  constructor(protected emartService: EmartService, protected router: Router) {

  }

  ngOnInit(): void {

    // if(JSON.parse(localStorage.getItem("currentBuyer")).buyerId != 0){

    this.currentBuyer = this.emartService.getCurrentBuyer();
    this.allBills = [];
    this.emartService.getAllBills(JSON.parse(localStorage.getItem("currentBuyer")).buyerId).subscribe(
      (res) => {
        this.allBills = res;
        this.emartService.setAllBills(this.allBills);

        if (this.allBills.length != 0) {
          this.isEmpty = true;
        }
        else {
          this.isEmpty = false;
        }

      }
    );


    // console.log("isEmpty:"+ this.isEmpty);
    //     }
    // else{
    //   this.router.navigate(['/']);
    // }



  }

}
