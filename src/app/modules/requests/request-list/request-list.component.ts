import { DateModel, DatePickerOptions } from 'ng2-datepicker';
import { MessageEvent } from './../../../utility/messageEvent';
import { Broadcaster } from './../../../utility/broadcaster';
import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { RequestService } from '../../../graphqls/services/request';
import { getFiteredRequests, getFilterRequestsQuery } from '../../../graphqls/queries/request';
import { MapsAPILoader } from '@agm/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../../login/login.component';
import { Modal } from 'ngx-modialog';

@Component({
    selector: 'request-list',
    templateUrl: 'request-list.component.html'
})

export class RequestListComponent {
    listItems;
    addressConponent: any;
    categories = [];
    capacities = [];
    showDateFilet = false;
    showCapacityFilter = false;
    showCategoryFilter = false;
    location = "";
    filters = [];
    pageNo = -1;
    pageLimit = 10;
    @ViewChild("search")
    public searchElementRef: ElementRef;
    isLoading = false;
    filterDate : DateModel;
    options: DatePickerOptions;
    constructor(
        public mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone,
        private router: Router,
        private modal: Modal,
        private broadcaster: Broadcaster,
        private _requestService: RequestService
    ) {
        this.listItems = [];
    }
    ngOnInit() {
        this.getDetails();
        // this.getFiteredRequests();

        this.addressConponent = {};
        this.options = new DatePickerOptions();
        this.onScroll();
        this.mapsAPILoader.load().then(() => {
            let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                types: ["geocode"]
                //componentRestrictions: {country: "us"}

            });
            autocomplete.addListener("place_changed", () => {
                this.ngZone.run(() => {
                    for (var i = 0; i < this.filters.length; i++) {
                        if (this.filters[i].type == "location") {
                            this.filters.splice(i, 1);
                        }
                    }
                    let place: google.maps.places.PlaceResult = autocomplete.getPlace();
                    if (place.geometry === undefined || place.geometry === null) {
                        this.location = this.addressConponent.administrative_area_level_1 + ", " + this.addressConponent.country;
                        return;
                    }

                    this.addressConponent = [];
                    var filterName = [];
                    place.address_components.forEach(element => {
                        this.addressConponent[element.types[0]] = element.long_name;
                    });
                    this.filters.push({ "title": place.formatted_address, type: "location" });
                    this.pageNo = -1;
                    this.onScroll();
                });
            });

        });
    }
    enableCapacityFilter() {
        this.showCapacityFilter = !this.showCapacityFilter;
    }
    enableCategoryFilter() {
        this.showCategoryFilter = !this.showCategoryFilter;
    }
 /*
    getFiteredRequests() {

        var data = { loginUserId: localStorage.getItem("loginUserId") }
        this._requestService.getFilterRequests(data).subscribe(res => {
            this.listItems = res.data.requests;
        }, err => {

        })
    } */
    getDetails() {
        this._requestService.getNewFormOptions().subscribe(res => {
            for (let i = 0; i < res.data.categories.length; i++) {
                this.categories.push({
                    _id: res.data.categories[i]._id,
                    title: res.data.categories[i].title,
                    isSelected: false
                });
            };

            for (let i = 0; i < res.data.properyCapacities.length; i++) {
                this.capacities.push({
                    _id: res.data.properyCapacities[i]._id,
                    title: res.data.properyCapacities[i].title,
                    isSelected: false
                });
            };

        }, err => {

        })

    }
    selectCategory(item) {
        item.isSelected = item.isSelected ? false : true;
        if (item.isSelected) {
            this.filters.push(item)
        } else {
            for (var i = 0; i < this.filters.length; i++) {
                if (this.filters[i].title == item.title) {
                    this.filters.splice(i, 1);
                }
            }
        }
        this.pageNo = -1;
        this.onScroll();
    }
    removeFilter(item) {
        if (item.type == "location") {
            for (var i = 0; i < this.filters.length; i++) {
                if (this.filters[i].title == item.title) {
                    this.filters.splice(i, 1);
                }
            }
        }else if (item.type == "date") {
            for (var i = 0; i < this.filters.length; i++) {
                if (this.filters[i].title == item.title) {
                    this.filters.splice(i, 1);
                }
            }
        } else {
            for (var i = 0; i < this.filters.length; i++) {
                if (this.filters[i].title == item.title) {
                    this.selectCategory(this.filters[i]);
                }
            }
        }
        this.pageNo = -1;
        this.onScroll();
    }
    getFilterDetails() {
        var data: any;
        data = {};
        this.isLoading = true;
        data.category = [];
        for (var i = 0; i < this.categories.length; i++) {
            if (this.categories[i].isSelected) {
                data.category.push(this.categories[i]._id)
            }
        }

        data.capacity = [];
        for (var i = 0; i < this.capacities.length; i++) {
            if (this.capacities[i].isSelected) {
                data.capacity.push(this.capacities[i]._id)
            }
        }
        data.city = "";
        data.state = "";
       
        if (this.addressConponent.locality) {
            data.city = this.addressConponent.locality;
        }
        if (this.addressConponent.administrative_area_level_1) {
            data.state = this.addressConponent.administrative_area_level_1;
        }
        data.loginUserId = localStorage.getItem("loginUserId");
        data.limit = this.pageLimit;
        data.pageNo = this.pageNo;

        data.dates = [];
        for(var i = 0; i < this.filters.length; i++){
            if(this.filters[i].type == "date"){
                data.dates.push(this.filters[i].title);
            }
        }

        this._requestService.getFilterRequestsQuery(data).subscribe(res => {
            this.isLoading = false;
            if(this.pageNo  != 0){
              //  this.listItems = res.data.filterRequests;
                this.listItems = this.listItems.concat(res.data.filterRequests);
            }else{
                this.listItems = res.data.filterRequests;
            }
            
        }, err => {

        })

    }

    requestSpacse() {
        if (localStorage.getItem("loginUserId")) {
            this.router.navigate(['/requests/new']);
        }
        else {
            this.broadcaster.broadcast("loginOpen", "login");
        }
    }
    clearFilter() {
        for (var J = this.filters.length - 1; J >= 0; J--) {
            if (this.filters[J].type == "location") {
                for (var i = 0; i < this.filters.length; i++) {
                    if (this.filters[i].title == this.filters[J].title) {
                        this.filters.splice(J, 1);
                    }
                }
            } else if (this.filters[J].type == "date") {
                for (var i = 0; i < this.filters.length; i++) {
                    if (this.filters[i].title == this.filters[J].title) {
                        this.filters.splice(J, 1);
                    }
                }
            } else {
                for (var i = 0; i < this.filters.length; i++) {
                    if (this.filters[i].title == this.filters[J].title) {
                        this.selectCategory(this.filters[J]);
                    }
                }
            }
        }
        this.getFilterDetails();
    }
    onScroll() {
        if (!this.isLoading) {
            this.isLoading = true;
            this.pageNo++;
            this.getFilterDetails();
        }
    }
    dateFilter(){
        if(this.filterDate.formatted){
            var _startTime = this.filterDate.formatted;
            this.filters.push({ "title": this.filterDate.formatted, type: "date" });
            this.pageNo = -1;
            this.showDateFilet = false;
            this.onScroll();
        }
        
    }
}
