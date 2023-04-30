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
  rUserId = '';
  rAddress = '';





  constructor(protected emartService: EmartService, protected router: Router) { }

  ngOnInit(): void {
  }

  // checkPassword(){ 
  //   if(this.rPassword == this.rrePassword){
  //     return true;
  //   }
  //   return false;
  // }

  addBuyer(){

      let buyer: any = {
        "userId" : 0,
        "userName" : this.rName,
        "homeAddress" : this.rAddress,
      }

      this.emartService.addBuyer(buyer).subscribe((response)=> 
        {
          buyer = response;
          this.router.navigate(['/']);
        }
      );
  }

}
