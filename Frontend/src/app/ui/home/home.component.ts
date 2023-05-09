import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContractService } from 'src/app/services/contract/contract.service';
import { EmartService } from 'src/app/services/instacart/emart.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {
  allRetailers: any;
  currentBuyer: any;
  isSearched: boolean = false;
  searchedRetailers: any;
  searchBar: string;
  direction: any;
  constructor(protected emartService: EmartService, protected router: Router, private contract: ContractService) {
    this.searchedRetailers = [];
    this.searchBar = '';
  }

  ngOnInit(): void {
    //alert('landed in home');

    if (this.emartService.getDirection() == undefined) {
      this.contract
        .connectAccount()
        .then((value: any) => {
          this.direction = value;
          this.emartService.setDirection(this.direction);
          //alert(this.direction);
        })
        .catch((error: any) => {
          console.log(error);
          this.contract.failure(
            "Could't get the account data, please check if metamask is running correctly and refresh the page"
          );
        });
    }
    this.emartService.getAllSellers().subscribe((response: any) => {
      const retList = Object.values(response);
      console.log('type : ' + (retList));
      this.allRetailers = Array.from(retList);
      console.log('type : ' + typeof (this.allRetailers[0]));
      this.emartService.setLocalItems(this.allRetailers);
    });

  }

  displayInv(retId: number) {
    this.router.navigate(['/item-list/' + retId]);
  }


  resetSearchPage() {
    this.searchBar = '';
    this.searchedRetailers = [];
    this.isSearched = false;
  }

  searchItems() {
    this.searchedRetailers = [];
    if (this.searchBar != '') {
      this.isSearched = true;
      for (let item of this.allRetailers) {
        let temp: string = item.retailerName;
        // //alert('search');
        temp = temp.toLowerCase();
        if (temp.includes(this.searchBar.toLowerCase())) {
          this.searchedRetailers.push(item);
        }

      }

      if (this.searchedRetailers.length == 0) {
        // this.isSearched = false;
        document.getElementById("searchBar").focus();
      }
      else {
        this.isSearched = true;
      }
      //alert(this.searchedRetailers.length);
    }
    else {
      document.getElementById("searchBar").focus();
      this.searchedRetailers = [];
      this.isSearched = false;

    }

  }
}
