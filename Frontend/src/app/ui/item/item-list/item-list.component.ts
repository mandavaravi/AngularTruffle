import { Component, OnInit } from '@angular/core';
// import { Item } from '../../item';
import { ActivatedRoute, Router } from '@angular/router';
import { EmartService } from 'src/app/services/instacart/emart.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})

export class ItemListComponent implements OnInit {
  allItems: any;
  currentBuyer: any;
  isfiltered:boolean=false;
  isSearched:boolean=false;
  filteredItems:any;
  searchedItems : any;
  toPrice:number;
  fromPrice:number;
  searchBar: string;
  constructor(protected emartService: EmartService, protected router:Router, protected activatedRoute: ActivatedRoute) 
  {
    this.filteredItems=[];
    this.fromPrice = 0;
    this.toPrice = 0;
    this.searchedItems= [];
    this.searchBar = '';
  }

  ngOnInit(): void {
    // if(JSON.parse(localStorage.getItem("currentBuyer")).buyerId != 0){
      //alert("item list ngOn");
      this.activatedRoute.paramMap.subscribe(
        (param) => {
          let id = param.get('iId');
          this.allItems = this.emartService.getAllSelleritems(id).subscribe((response: any) => {
            const itemsList = response; //['allretailersInvs'][id]; 
            console.log('type : ' + typeof (itemsList));
            this.allItems = Array.from(itemsList); 
            console.log('type : ' + (this.allItems[0]));
            // this.emartService.setLocalItems(this.allItems); 
          });
        }
      );


  }

  displayItemDetails(itemId: number){
    this.router.navigate(['/item-display/'+itemId]);
  }

  addToCart(item: any){
    //alert(JSON.stringify([item]) + " :::: " + this.emartService.getDirection());
    this.emartService.addToCart([item], this.emartService.getDirection()).subscribe((response: any) => {
      //alert('add success');
    });
  }

  filterItems()
  {
    this.filteredItems =[];
    // console.log("filter length"+ this.filteredItems.length);
    if (this.toPrice > this.fromPrice) { 
      
      for (let item of this.allItems) {
        if (item.itemPrice <= this.toPrice && item.itemPrice >= this.fromPrice) {
          this.filteredItems.push(item);
        }
      }

      if(this.filteredItems.length == 0){
        //alert("No items in that range");
        this.isfiltered = false;
      }
      else{
        this.isfiltered = true;
      }
    }
    else{
      //alert("Enter a valid range");
      document.getElementById("ToPrice").focus();
      this.isfiltered = false;
    }
  }

  resetFilterPage(){
    this.filteredItems = [];
    this.isfiltered = false;
  }

  resetSearchPage(){
    this.searchBar='';
    this.searchedItems = [];
    this.isSearched = false;
  }

  searchItems(){
    this.searchedItems = [];
    if(this.searchBar !=''){
      this.isSearched = true;
      for (let item of this.allItems) {
        let temp: string = item.itemName;
        temp = temp.toLowerCase();
        if (temp.includes(this.searchBar.toLowerCase())) {
            this.searchedItems.push(item);
        }
      
      }

      if(this.searchedItems.length == 0){
        this.isSearched = false;
        document.getElementById("searchBar").focus();
      }
      else{
        this.isSearched = true;
      }
    
    }
    else{
      document.getElementById("searchBar").focus();
      this.searchedItems = [];
      this.isSearched = false;

    }
  
  }
}
