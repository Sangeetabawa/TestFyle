import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { DataTableDirective } from 'angular-datatables';
import { BankServiceService } from '../bank-service.service'
import { HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { NgxSpinnerService } from "ngx-spinner";
import { RouterModule, Routes, Router } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-banklisting',
  templateUrl: './banklisting.component.html',
  styleUrls: ['./banklisting.component.scss'],
  providers: [BankServiceService],
  encapsulation: ViewEncapsulation.None
})
export class BanklistingComponent implements OnInit, AfterViewInit {
  destroyFlag:boolean=false;
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  ResponseApi = [];
  dtTrigger = new Subject();
  selectedCity = {
    id: '1',
    name: 'MUMBAI'
  };
  cities = [
    { id: 1, name: 'MUMBAI' },
    { id: 2, name: 'DELHI' },
    { id: 3, name: 'BANGALORE' },
    { id: 4, name: 'CHANDIGARH' },
    { id: 5, name: 'HARYANA' }
  ];
  bankdetails: any;
  ischecked: boolean=false;
  abc = [];
newarray=[];
  constructor(private BService: BankServiceService, private spinner: NgxSpinnerService, private router: Router) {
    if(localStorage.getItem('Array'))
    {
      this.abc=  JSON.parse(localStorage.getItem('Array'));
      
    console.log( this.newarray)
    }
    this.cityFilterData(this.selectedCity)

  }

  ngOnInit(): void {
   
      
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthChange: true,
      
    };


  }
  onCheckboxChange(val, event) {
    console.log(event.target.checked);
    console.log(val)
    if (event.target.checked == true) {
      
      this.abc.push(val);
      localStorage.setItem('Array', JSON.stringify(this.abc));
    } else {
      let indexx = this.abc.indexOf(val);
      this.abc.splice(indexx, 1)
      localStorage.setItem('Array', JSON.stringify(this.abc));
    }

    this.BService.sendMessage(this.abc)
  }
  submit() {
    console.log("ji")
    this.abc = JSON.parse(localStorage.getItem('Array'));
    console.log(this.abc)
    this.router.navigate(['/banklisting/fav'], {
      queryParams: {
        filter: JSON.stringify(this.abc)
      }
    });

    console.log(this.router)
  }
  cityFilterData(event) {
    console.log(event.name)
    const params = new HttpParams()
      .set('city', event.name)
    console.log(params)
    this.BService.bankData(params).subscribe((response: any) => {
      this.ResponseApi = response;
      this.spinner.show();

      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 3000);
      if(this.abc){
        this.ResponseApi .forEach(item => {

          this.abc.forEach(element => {
            if(item.ifsc==element.ifsc){
              item.ischecked=true;
            }
           
          });
        });
      

        if (this.destroyFlag) {
          this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.dtTrigger.next();
          });
        } else {
          this.destroyFlag = true
          this.dtTrigger.next();
        }
    }
   
      







     
       
      
    }, (error: any) => {

    })


  }
  ngAfterViewInit(): void {
    this.dtTrigger.subscribe(() => {
      this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.columns().every(function () {
          const that = this;
          $('input', this.footer()).on('keyup change', function () {
            if (that.search() !== this['value']) {
              that
                .search(this['value'])
                .draw();
            }
          });
        });
      });
    });
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
