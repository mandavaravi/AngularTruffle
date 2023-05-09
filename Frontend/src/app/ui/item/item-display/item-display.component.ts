import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmartService } from 'src/app/services/instacart/emart.service';


@Component({
  selector: 'app-item-display',
  templateUrl: './item-display.component.html',
  styleUrls: ['./item-display.component.scss']
})
export class ItemDisplayComponent implements OnInit {

  item: any;

  constructor(protected activatedRoute: ActivatedRoute,
    protected emartService: EmartService,
    protected router: Router) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(
      (param) => {
        let id = param.get('iId');
        this.item = this.emartService.getItem(id);
      }
    );

  }

  addToCart(item: any) {
    //alert(JSON.stringify([item]) + " :::: " + this.emartService.getDirection());
    this.emartService.addToCart([item], this.emartService.getDirection()).subscribe((response: any) => {
      //alert('add success');
    });
    this.router.navigate(['item-list']);
  }

}
