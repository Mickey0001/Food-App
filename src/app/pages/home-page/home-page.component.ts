import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { ICompany } from '../../models/icompany';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  // companiesArray = [] as Array<ICompany>
  companiesArray = [];
  errorMsg = '';

  // probably
  // declare 4 props that you will pass to company item company inside home page 

  // and you'll use *ngFor to display <company-item> component foreach iteration and pass those props into it

    /* filter */
  // if you are subscribing to a filter, you will have different kind of data that you'll use *ngFor "for"
  // buut that even will fire from sidebar and will be subscribed here & *ngFor the filtered data

  constructor(private _appService: AppService) { }

  ngOnInit() {
    this._appService.getAllCompanies()
      .subscribe(
        data => this.companiesArray = data,
        error => this.errorMsg = error.message
      )
  }

}
