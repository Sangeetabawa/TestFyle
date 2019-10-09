import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import{BankServiceService} from '../../bank-service.service';
@Component({
  selector: 'app-fav',
  templateUrl: './fav.component.html',
  styleUrls: ['./fav.component.scss']
})
export class FavComponent implements OnInit {
  ResponseApi:any;
  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private Bservice:BankServiceService
     
  ) {
  }
  ngOnInit() {
    this.route.queryParams.subscribe((p: any) => {
      if (p.filter){
          this.ResponseApi=JSON.parse(p.filter);
      }
  });
  }

}
