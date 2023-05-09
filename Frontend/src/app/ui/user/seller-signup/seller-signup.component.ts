import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmartService } from 'src/app/services/instacart/emart.service';

@Component({
  selector: 'app-seller-signup',
  templateUrl: './seller-signup.component.html',
  styleUrls: ['./seller-signup.component.scss']
})
export class SellerSignupComponent implements OnInit {

  rName = '';
  rretailerId = '';
  // rPassword = '';
  // rrePassword = '';
  // rCompany = '';
  // rBrief = '';
  // rGst: number = null;
  rAddress = '';
  // rEmail = '';
  // rWebsite = '';
  // rContact: number = null;
  // checkpass : boolean =false;

  constructor(protected emartService: EmartService, protected router: Router) { }

  ngOnInit(): void {
  }
  // checkPassword(){ 
  //   if(this.rPassword == this.rrePassword){
  //     return true;
  //   }
  //   return false;
  // }


  addSeller(){
    // if(this.checkPassword()){
    let seller: any = {
      "retailerId" : this.rretailerId,
      "retailerName" : this.rName,
      "homeAddress" : this.rAddress
    }
    //alert(JSON.stringify(seller));

    this.emartService.addSeller(seller).subscribe((response)=> 
      {
        seller = response;
        this.router.navigate(['/']);
      }
    );
    // }
    // else{
    //   this.checkpass = true;
    //   document.getElementById("rePassword").focus();
    // }
  }

}
