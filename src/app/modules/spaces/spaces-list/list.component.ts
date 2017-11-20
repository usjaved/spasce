import { SpacesService } from './../../../graphqls/services/space';
import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { MapsAPILoader, AgmMap, MarkerManager } from '@agm/core';
import { Overlay, overlayConfigFactory } from 'ngx-modialog';
import { Modal, BSModalContext } from 'ngx-modialog/plugins/bootstrap';

import { FlagComponent } from '../../../directives/flag/flag.component';
import { LoginComponent } from '../../login/login.component';
import { IonRangeSliderComponent } from "ng2-ion-range-slider";
import { Broadcaster } from '../../../utility/broadcaster';
import { Router } from '@angular/router';
import { UserService } from '../../../graphqls/services/user';

@Component({
    selector: 'spaces-list',
    templateUrl: 'list.component.html',
    providers: [MarkerManager]

})
export class SpacesListComponent implements OnInit {
    listItems;
    addressConponent: any;
    spaces = [];
    categories = [];
    capacities = [];
    showCapacityFilter = false;
    showCategoryFilter = false;
    showCommentBox = false;
    showMesseges = false;
    location = "";
    filters = [];
    zoom = 5;
    latitude = 25;
    longitude = -71;
    selectedcategory: any;
    markers: any;
    similarcategory: String;
    @ViewChild("search")
    @ViewChild('sliderCapacity') sliderCapacity: IonRangeSliderComponent;
    @ViewChild('sliderPrice') sliderPrice: IonRangeSliderComponent;
    public searchElementRef: ElementRef;

    min: number = 1;
    max: number = 10;
    simpleSlider = { name: "Simple Slider", onUpdate: undefined, onFinish: undefined };
    advancedSlider = { name: "Advanced Slider", onUpdate: undefined, onFinish: undefined };
    map: any;
    @ViewChild(AgmMap)
    public agmMap: AgmMap
    markerManager: MarkerManager;
    constructor(
        public mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone,
        private _spacesService: SpacesService,
        private broadcaster: Broadcaster,
        private router: Router,
        private modal: Modal,
        private zoon: NgZone,
        private _userservice : UserService
    ) {
        this.markers = [];
        this.showCommentBox = false;
        this.showMesseges = false;
        this.addressConponent = {};

    }
    mapReady(event) {
        this.markerManager = new MarkerManager(event, this.zoon);
    }
    enableCapacityFilter() {
        this.showCapacityFilter = !this.showCapacityFilter;
    }
    enableCategoryFilter() {
        this.showCategoryFilter = !this.showCategoryFilter;
    }
    ngOnInit() {
        this.getDetails();
        this.getFilteredSpaces();
        /* this.mapsAPILoader.load().then(() => {
             let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                 types: ["geocode"]
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
                     this.getFilterDetails();
                 });
             });
 
         }); */
    }
    getDetails() {
        this._spacesService.getNewFormOptions().subscribe(res => {
            for (let i = 0; i < res.data.categories.length; i++) {
                this.categories.push({
                    _id: res.data.categories[i]._id,
                    title: res.data.categories[i].title,
                    isSelected: false
                });
                if (res.data.categories[i]._id == localStorage.getItem("filterCategory")) {
                    this.selectCategory(this.categories[i]);
                }
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

    public loadAPIWrapper(map) {
        this.map = map;
    }
    getFilteredSpaces() {
        var data: any;
        data = {};
        data.category = [];
        data.capacity = [];
        data.city = "";
        data.state = "";

        if (localStorage.getItem("filterCategory")) {
            data.category.push(localStorage.getItem("filterCategory"));
        }
        if (localStorage.getItem("filterCity")) {
            data.city = localStorage.getItem("filterCity");
            var location = localStorage.getItem("filterCity") + ", " + localStorage.getItem("filterState");
            this.filters.push({ "title": location, type: "location" });
            this.location = location;
        }
        if (localStorage.getItem("filterState")) {
            data.state = localStorage.getItem("filterState");
        }
        this.addressConponent.locality = localStorage.getItem("filterCity")
        this.addressConponent.administrative_area_level_1 = localStorage.getItem("filterState")

        localStorage.setItem("filterCity", "");
        localStorage.setItem("filterState", "");
        localStorage.setItem("filterCategory", "");
        data.loginUserId = localStorage.getItem("loginUserId");
        this._spacesService.getFilterSpaces(data).subscribe(res => {
            this.spaces = res.data.filterSpacses.map((item) => { return Object.assign({}, item, { isSelected: false }); });;
            if (this.spaces.length > 0) {
                this.latitude = Number(this.spaces[0].latitude);
                this.longitude = Number(this.spaces[0].longitude);
                this.agmMap.triggerResize();
                const position = new google.maps.LatLng(this.latitude, this.longitude);
                this.map.panTo(position);
            }

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
        this.getFilterDetails();
        this.getSimilarRequests();
    }
    getSimilarRequests() {
        for (var i = 0; i < this.categories.length; i++) {
            if (this.categories[i].isSelected) {
                this.selectedcategory = this.categories[i]._id;
            }
        }
console.log("In SpacseList"+this.selectedcategory);
    }
    clearFilter() {
        this.filters = [];
        this.location = "";
        this.addressConponent = {};
        for (let i = 0; i < this.capacities.length; i++) {
            this.capacities[i].isSelected = false;
        };
        for (let i = 0; i < this.categories.length; i++) {
            this.categories[i].isSelected = false;
        };
        this.getFilterDetails();

    }
    removeFilter(item) {
        if (item.type == "location") {
            this.location = "";
            this.addressConponent = {};
            this.filters.splice(i, 1);
            /* for (var i = 0; i < this.filters.length; i++) {
                 if (this.filters[i].title == item.title) {
                     this.filters.splice(i, 1);
                 }
             } */
        } else {
            for (var i = 0; i < this.filters.length; i++) {
                if (this.filters[i].title == item.title) {
                    this.selectCategory(this.filters[i]);
                }
            }

        }
        this.getFilterDetails()
    }
    getFilterDetails() {
        var data: any;
        data = {};
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


        var v: any = this.sliderPrice;
        data.minPrice = v.from;
        data.maxPrice = v.to;

        v = this.sliderCapacity;
        data.minCapacity = v.from;
        data.maxCapacity = v.to;
        data.loginUserId = localStorage.getItem("loginUserId");
        this._spacesService.getFilterSpaces(data).subscribe(res => {
            this.spaces = res.data.filterSpacses.map((item) => { return Object.assign({}, item, { isSelected: false }); });
        }, err => {

        })
        
    }
    toggleCommentBox() {
        this.showCommentBox = !this.showCommentBox;
        if (this.showMesseges = true) {
            this.showMesseges = !this.showMesseges;
        }

    }
    showMessegeBox() {
        this.showMesseges = !this.showMesseges;
        if (this.showCommentBox = true) {
            this.showCommentBox = !this.showCommentBox;
        }

    }

    openFlagModal(id) {
        if (localStorage.getItem("loginUserId")) {
            var dialog = this.modal.open(FlagComponent, overlayConfigFactory({ "flagId": id, "type": "For Spacse" }, BSModalContext));
        }
        else {
            this.broadcaster.broadcast("loginOpen", "login");
        }
    }
    updateCapacity(event) {
        this.getFilterDetails();
    }
    updatePrice(event) {
        this.getFilterDetails();
    }

    finish(slider, event) {
        console.log("Slider finished: " + slider.name);
        slider.onFinish = event;
    }

    setAdvancedSliderTo(from, to) {
        //    this.advancedSliderElement.update({from: from, to:to});
    }
    toNumber(val) {
        return Number(val);
    }

    requestSpacse() {
        if (localStorage.getItem("loginUserId")) {
            this.router.navigate(['/requests/new']);
        }
        else {
            this.broadcaster.broadcast("loginOpen", "login");
        }
    }
    getPrice(item) {
        return "$ " + item.pricingLayer[0].rate;
    }
    getMarker(item) {
        if (item.isSelected) {
            return "/assets/images/marker-selected.png";
        } else {
            return "/assets/images/marker.png";
        }

    }
    markerClick(item) {
        item.isSelected = !item.isSelected;
    }
    addToFav(item){
        if (!localStorage.getItem("loginUserId")) {
            this.broadcaster.broadcast("loginOpen", "login");
            return false;
        }
        var data: any;
        data = {};
        data.userId = localStorage.getItem("loginUserId");
        data.spacseId = item._id;
        this._userservice.createUserFavouriteSpacse(data).subscribe(res => {
            debugger;
            if (res.data.createFavourite.code == "200") {
                item.favourites.push("hell");
            }
            else {
                item.favourites = [];
            }
        });
        
    }
}