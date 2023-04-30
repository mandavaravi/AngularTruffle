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
  rImage = '';
  rPrice: number;
  rStock: number;
  rDescription = '';
  rSubCategory: any = null;
  rCategory: any = null;
  rRetailer = '';
  clist: any = [];
  sclist: any = [];


  constructor(protected router: Router, protected emartService: EmartService) { }

  ngOnInit(): void {

    this.emartService.getDataJSON().subscribe
      (
        (res) => {
          this.clist = res;
        })

    this.clist = this.emartService.getDataJSON().subscribe((response: any) => {
      const clistTemp = response['allCategories'];
      console.log('type : ' + typeof (clistTemp));
      this.clist = Array.from(clistTemp);
      console.log('type : ' + (this.clist[0]));
      // this.emartService.setLocalItems(this.allItems); 
    });

  }

  addItem() {
    let subcat: any;
    for (let i of this.sclist) {
      if (this.rSubCategory == i.subCategoryId) {
        subcat = i;
        break;
      }
    }
    let item: any = {
      itemId: 0,
      itemName: this.rName,
      itemImage: this.rImage,
      itemPrice: this.rPrice,
      quantity: this.rStock,
      categoryId: this.rCategory,
      retailerId: this.rRetailer
    };

    this.emartService.getDataJSON().subscribe((response: any) => {
      let jsonData = response;
      jsonData['allretailersInvs'][this.rRetailer].push(item);
      alert(JSON.stringify( jsonData['allretailersInvs'][this.rRetailer][0]));
      // this.emartService.setDataJSON(jsonData).subscribe((res: any) => {
      //   alert('post success');
      // });
      // console.log('type : ' + typeof (currInv));
      // this.clist = Array.from(currInv); 

      // console.log('type : ' + (this.clist[0]));
      // this.emartService.setLocalItems(this.allItems); 
    });

  }

}
