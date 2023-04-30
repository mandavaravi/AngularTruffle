import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(protected emartService: EmartService, protected router: Router) {
    this.searchedRetailers = [];
    this.searchBar = '';
  }

  ngOnInit(): void {
    alert("item list ngOn");
    this.emartService.getAllSellers().subscribe((response: any) => {
      const retList = response.retailersList;
      console.log('type : ' + typeof (retList));
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
        alert('search');
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
      alert(this.searchedRetailers.length);
    }
    else {
      document.getElementById("searchBar").focus();
      this.searchedRetailers = [];
      this.isSearched = false;

    }

  }
}
