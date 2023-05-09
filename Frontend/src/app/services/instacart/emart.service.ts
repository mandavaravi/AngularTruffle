import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmartService {

  cartItems: any;
  allBills: any;
  currentBuyer: any = null;
  currentSeller: any = null;
  allItems: any;
  direction: any;
  editedItem: any;

  constructor(protected http: HttpClient) {
    this.cartItems = [];
    this.allBills = [];
  }

  setDirection(orgAcc) {
    this.direction = orgAcc;
  }

  getDirection() {
    return this.direction;
  }

  setEditedItem(item) {
    this.editedItem = item;
  }

  getEditedItem() {
    return this.editedItem;
  }


  /*
  * ******************************************************************************************* ******************************************************************************************
  * ******************************************************************************************* ******************************************************************************************
  * ******************************************************************************************* ******************************************************************************************
  */

  getAllSellers() {
    return this.http.post('https://my-service-1.onrender.com/retailers', {});
  }

  getAllSelleritems(retailerId) {
    // https://my-service-1.onrender.com/add_update_inv
    return this.http.post('https://my-service-1.onrender.com/add_update_inv', { "type": "viewinv", "retailerId": retailerId });
  }

  addItem(item: any, retailerId) {
    return this.http.post('https://my-service-1.onrender.com/add_update_inv/', { "type": "add", "retailerId": retailerId, "itemList": item });
  }

  updateItem(item: any, retailerId) {
    return this.http.post('https://my-service-1.onrender.com/add_update_inv/', { "type": "update", "retailerId": retailerId, "itemList": item });
  }

  setLocalItems(itemsList: any) {
    this.allItems = itemsList;
  }

  getItem(itemId): any {
    for (let i = 0; i < this.allItems.length; i++) {
      if (itemId == this.allItems[i]['itemId']) {
        return this.allItems[i];
      }
    }
  }
  /*
  * ******************************************************************************************* ******************************************************************************************
  * ******************************************************************************************* ******************************************************************************************
  * ******************************************************************************************* ******************************************************************************************
  */


  getAllBills(buyerId): any {
    return this.http.post('https://my-service-1.onrender.com/order',
      {
        "type": "vieworder",
        "userId": buyerId+""
      });
  }

  addBill(originalAccount, orderId) {
    let temp = this.cartItems;
    console.clear();
    console.log(JSON.stringify(temp));
    this.cartItems = [];
    return this.http.post("https://my-service-1.onrender.com/order", {
      "type": "add",
      "userId": originalAccount,
      "orderId": orderId,
      "itemList": temp
    });
  }
 

  /*
  * ******************************************************************************************* ******************************************************************************************
  * ******************************************************************************************* ******************************************************************************************
  * ******************************************************************************************* ******************************************************************************************
  */


  addToCart(itemObjArr, originalAccount) {
    // this.cartItems.push(itemObj);
    console.log(JSON.stringify(itemObjArr));
    return this.http.post("https://my-service-1.onrender.com/add_update_cart", {
      "type": "add",
      "userId": originalAccount,
      "itemList": itemObjArr
    });
  }

  getAllCart(originalAccount) {
    // return [].concat(this.cartItems);
    return this.http.post("https://my-service-1.onrender.com/add_update_cart", {
      "type": "viewcart",
      "userId": originalAccount
    });
  }

  setAllCart(cartItems: any) {
    this.cartItems = cartItems;
  }

  deleteCartItem(itemObjArr, originalAccount) {
    return this.http.post("https://my-service-1.onrender.com/add_update_cart", {
      "type": "delete",
      "userId": originalAccount,
      "itemId": itemObjArr
    });
  }

  updateCartItem(itemObjArr, originalAccount) {
    return this.http.post("https://my-service-1.onrender.com/add_update_cart", {
      "type": "update",
      "userId": originalAccount[0],
      "itemList": itemObjArr
    });
  }


  /*
  * ******************************************************************************************* ******************************************************************************************
  * ******************************************************************************************* ******************************************************************************************
  * ******************************************************************************************* ******************************************************************************************
  */
  setBuyer(currentBuyer: any) {
    this.currentBuyer = currentBuyer;
  }
  setSeller(currentSeller: any) {
    this.currentSeller = currentSeller;
  }

  getCurrentBuyer() {
    return this.currentBuyer;
  }

  getCurrentSeller() {
    return this.currentSeller;
  }

  addBuyer(buyer: any) {
    return this.http.post('https://my-service-1.onrender.com/newUser_Retailer', {
      "type": "user",
      "userId": buyer.userId,
      "userName": buyer.userName,
      "homeAddress": buyer.homeAddress
    });
  }



  addSeller(seller: any) {
    return this.http.post('https://my-service-1.onrender.com/newUser_Retailer', {
      "type": "retailer",
      "retailerId": seller.retailerId,
      "retailerName": seller.retailerName,
      "retailerImage": "https://i.pinimg.com/originals/66/f7/72/66f77296282b5ab7c2780724802614c0.png",
      "homeAddress": seller.homeAddress
    });
  }

  /*
  * ******************************************************************************************* ******************************************************************************************
  * ******************************************************************************************* ******************************************************************************************
  * ******************************************************************************************* ******************************************************************************************
  */
}
