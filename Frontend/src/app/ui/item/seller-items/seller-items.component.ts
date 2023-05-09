import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmartService } from 'src/app/services/instacart/emart.service';

@Component({
  selector: 'app-seller-items',
  templateUrl: './seller-items.component.html',
  styleUrls: ['./seller-items.component.scss']
})
export class SellerItemsComponent implements OnInit {
  allItems: any;
  constructor(protected emartService: EmartService, protected router: Router) { }

  ngOnInit(): void {

    // if(JSON.parse(localStorage.getItem("currentSeller")).retailerId != 0){
      //alert(this.emartService.getDirection());
      this.emartService.getAllSelleritems(this.emartService.getDirection()).subscribe((response)=> 
        {
          this.allItems = response;
          console.log(this.allItems);
        }
      );
    // }
    // else{
    //   this.router.navigate(['/']);
    // }

  }

  addItem(){
    this.router.navigate(['/seller-add-item']);
  }

  editItem(item){
    this.emartService.setEditedItem(item);
    this.router.navigate(['/seller-add-item']);
  }
}
