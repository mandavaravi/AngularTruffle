import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmartService } from 'src/app/services/instacart/emart.service';

@Component({
  selector: 'app-seller-add-item',
  templateUrl: './seller-add-item.component.html',
  styleUrls: ['./seller-add-item.component.scss']
})
export class SellerAddItemComponent implements OnInit {

  rName = '';
  rId = 0;
  rImage = '';
  rPrice: number;
  rStock: number;
  rDescription = '';
  rCategory: any = null;
  rRetailer = '';
  isEdit = false;
  clist: any = [{
    "categoryId": 101,
    "categoryName": "1st Cat"
  },
  {
    "categoryId": 102,
    "categoryName": "2nd Cat"
  },
  {
    "categoryId": 103,
    "categoryName": "3rd Cat"
  },
  {
    "categoryId": 104,
    "categoryName": "4th Cat"
  }];


  constructor(protected router: Router, protected emartService: EmartService) { }

  ngOnInit(): void {
    let temp = this.emartService.getEditedItem();
    if (temp != undefined) {
      alert(JSON.stringify(temp));
      this.rName = temp.itemName;
      this.rId = temp.itemId;
      this.rImage = temp.itemImage;
      this.rPrice = temp.itemPrice;
      this.rStock = temp.quantity;
      this.rCategory = temp.categoryId;
      this.rRetailer = temp.retailerId;
      this.isEdit = true;
      this.emartService.setEditedItem(undefined);
    }
  }

  addItem() {
    let item: any = {
      itemId: this.rId,
      itemName: this.rName,
      itemImage: this.rImage,
      itemPrice: this.rPrice,
      quantity: this.rStock,
      categoryId: this.rCategory,
      retailerId: this.rRetailer,
      pricePerQuantity: this.rStock*this.rPrice
    };


    alert(JSON.stringify([item]) + " :: " + this.rRetailer);
    if (this.isEdit) {
      alert(this.rStock);
      this.emartService.updateItem([item], this.rRetailer).subscribe((response: any) => {
        console.log(response);
      });
      this.router.navigate(['seller-items']);
    }
    else {
      this.emartService.addItem([item], this.rRetailer).subscribe((response: any) => {
        console.log(response);
      });
    }


  }

}
