import { Component, OnInit, HostListener } from '@angular/core';
import { AppService } from '../../app.service';
import { ICompany } from 'src/app/models/icompany';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  companiesArray = [];
  trendingItemsArray = [];
  default_searchByCompany = { limit: 10, skip: 0, sortOptions: ['Most Rated', -1] };
  default_searchNearBy = { limit: 10, skip: 0, sortOptions: ['Most Rated', -1] };

  errorMsg = '';

  homeLayoutSpinner: boolean = true;
  trendingLayoutSpinner: boolean = true;
  
  startingPoint = 1000;

  usersCurrentLocation;
  showMap;
  searchCompanyForm;

  @HostListener("window:scroll", [])
    onWindowScroll() {

      if ( window.pageYOffset >= this.startingPoint ) {

        this.homeLayoutSpinner = true;

        this.default_searchByCompany.skip = this.default_searchByCompany.limit;
        this.default_searchByCompany.limit = this.startingPoint / 100 + 10;
  
        this.default_searchNearBy.skip = this.default_searchNearBy.limit;
        this.default_searchNearBy.limit = this.startingPoint / 100 + 10;

        if (this.searchCompanyForm) {
          this._appService.searchCompany(this.default_searchByCompany)
          .subscribe(data => {
            this.homeLayoutSpinner = false;
            data.forEach(d => this.companiesArray.push(d));
          });

        } else {
            this._appService.searchCompanyNearBy(this.default_searchNearBy)
            .subscribe(data => {
              this.homeLayoutSpinner = false;
              data.shift();
              data.forEach(d => this.companiesArray.push(d));
            });
        }

        this.startingPoint += 1000;
      }

  }

  constructor(private _appService: AppService) { 
    this.searchCompanyForm = true;
  }

  receivedCompanies( [searchResult, _searchByCompany]: [ICompany[], any] ) {
    this.companiesArray = searchResult;
    this.default_searchByCompany = _searchByCompany;
    this.startingPoint = 1000;
    this.searchCompanyForm = true;
  }

  receivedCompaniesNearBy( [searchResult, _searchByCompany]: [ICompany[], any] ) {
    this.usersCurrentLocation = searchResult[0];
    searchResult.shift();

    this.companiesArray = searchResult;
    this.default_searchNearBy = _searchByCompany;
    this.startingPoint = 1000;
    this.searchCompanyForm = false;
  }

  getListOfCompanies() {
    this._appService.getAllCompanies()
      .subscribe(data => {
        this.homeLayoutSpinner = false;
        this.companiesArray = data;
      },
        error => this.errorMsg = error.message
      )
  }

  getListOfTrendingItems() {
    this._appService.getTrendingItems()
      .subscribe(data => {
        this.trendingLayoutSpinner = false;
        this.trendingItemsArray = data;
      },
        error => this.errorMsg = error.message
      )
  }

  cycleTrendingItems() {
    this._appService.getTrendingItems()
      .subscribe(
        data => this.trendingItemsArray = data,
        error => this.errorMsg = error.message
      )
  }

  receiveMap(displayMap: boolean) {
    this.showMap = displayMap;
  }


  ngOnInit() {
    this.getListOfCompanies();
    this.getListOfTrendingItems();
  }

}
