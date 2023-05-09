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

  allBills: any;
  currentBuyer: any;
  isEmpty: boolean = false;
  allorderIds: any;
  constructor(protected emartService: EmartService, protected router: Router) {

  }

  ngOnInit(): void {

    // if(JSON.parse(localStorage.getItem("currentBuyer")).buyerId != 0){

    // this.currentBuyer = this.emartService.getCurrentBuyer();
    this.allBills = [];
    //alert('bill list -- '+this.emartService.getDirection());
    this.emartService.getAllBills(this.emartService.getDirection()).subscribe(
      (res) => {
        //alert('all bills : ' + JSON.stringify(res));
        this.allBills = (Object.values(res));
        this.allorderIds = Object.keys(res);
        // console.clear();
        console.log(this.allBills[0][0]);
        // this.emartService.setAllBills(this.allBills);

        if (this.allBills.length != 0) {
          //alert('true');
          this.isEmpty = true;
        }
        else {
          this.isEmpty = false;
        }

      }
    );


  }

}
