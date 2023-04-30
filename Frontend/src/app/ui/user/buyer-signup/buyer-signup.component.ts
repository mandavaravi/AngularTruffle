import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmartService } from 'src/app/services/instacart/emart.service';

@Component({
  selector: 'app-buyer-signup',
  templateUrl: './buyer-signup.component.html',
  styleUrls: ['./buyer-signup.component.scss']
})
export class BuyerSignupComponent implements OnInit {

  rName = '';
  rPassword = '';
  rrePassword= '';
  rMobile : number= null;
  rEmail = '';
  rDate = new Date();
  checkpass : boolean =false;





  constructor(protected emartService: EmartService, protected router: Router) { }

  ngOnInit(): void {
  }

  checkPassword(){ 
    if(this.rPassword == this.rrePassword){
      return true;
    }
    return false;
  }

  addBuyer(){

    if(this.checkPassword()){
      let buyer: any = {
        "buyerId" : 0,
        "buyerUsername" : this.rName,
        "buyerPassword" : this.rPassword,
        "buyerEmail" : this.rEmail,
        "buyerMobile" : this.rMobile,
        "buyerDate" : this.rDate,
        "allBills": null
      }

      this.emartService.addBuyer(buyer).subscribe((response)=> 
        {
          buyer = response;
          this.router.navigate(['/']);
        }
      );

    }
    else{
      this.checkpass = true;
      document.getElementById("rePassword").focus();
    }

  }

}
