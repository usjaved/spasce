import { Router } from '@angular/router';
import { MapsAPILoader } from '@agm/core';
import { Component, NgZone, ViewChild, ElementRef } from '@angular/core';
import { RequestService } from '../../../graphqls/services/request';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import { Broadcaster } from '../../../utility/broadcaster';

@Component({
    selector: 'request-add',
    templateUrl: 'request-add.component.html'
})
export class RequestAddComponent {

    startDate: DateModel;
    endDate: DateModel;
    city: string;
    options: DatePickerOptions;
    otherCategory: boolean;
    otherCategoryTitle: string;
    description: string;
    otherSpaceTime: boolean;
    otherSpaceTimeTitle: string;
    categories: any;
    capacities: any;
    budgets: any;
    selectedCategory: any;
    selectedCacpacity: any;
    zoom: number;
    latitude: number;
    longitude: number;
    budget: string;
    spaceTime: string;
    requestId: any;
    success = false;
    error = false;
    alertMessage = "";
    _timer: any;
    hideInfo = true;


    @ViewChild("locationSearch")
    public locationSearchElementRef: ElementRef;
    addressConponent: any;
    constructor(private _requestService: RequestService,
        public mapsAPILoader: MapsAPILoader,
        private broadcaster: Broadcaster,
        private ngZone: NgZone,
        private router: Router) {
        this.capacities = [];
        this.categories = [];
        this.budgets = [];
        this.budget = "";

        this.options = new DatePickerOptions();
        // this.options.placeholder = "Start Date";    
        this.otherCategory = false;
        this.otherCategoryTitle = "";
        this.otherSpaceTime = false;
        this.otherSpaceTimeTitle = "";
        this.getDetails();
        this.addressConponent = [];


    }
    messageAlert(type, message) {
        if (type == "error") {
            this.showError(message)
        } else {
            this.showSuccess(message);
        }
    }
    showError(message) {
        this.success = false;
        this.error = false;
        this.alertMessage = message;
        this.error = true;
        this._timer = setTimeout(() => {
            this.alertMessage = '';
            this.error = false;
            this._timer = null;
        }, 3000);
    }
    showSuccess(message) {
        this.success = false;
        this.error = false;
        this.alertMessage = message;
        this.success = true;
        this._timer = setTimeout(() => {
            this.alertMessage = '';
            this.success = false;
            this._timer = null;
        }, 3000);
    }


    ngOnInit() {
        this.zoom = 4;
        this.latitude = 39.8282;
        this.longitude = -98.5795;
        this.mapsAPILoader.load().then(() => {
            let autocomplete = new google.maps.places.Autocomplete(this.locationSearchElementRef.nativeElement, {
                types: ["(cities)"]
            });
            autocomplete.addListener("place_changed", () => {
                this.ngZone.run(() => {
                    let place: google.maps.places.PlaceResult = autocomplete.getPlace();
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }
                    place.address_components.forEach(element => {
                        this.addressConponent[element.types[0]] = element.long_name;
                    });

                    this.city = place.formatted_address;
                    this.latitude = place.geometry.location.lat();
                    this.longitude = place.geometry.location.lng();
                    this.zoom = 12;
                });
            });
        });

        if (!localStorage.getItem("loginUserId")) {
            this.broadcaster.broadcast("loginOpen", "login");
        }
    }

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

            for (let i = 0; i < res.data.budgets.length; i++) {
                this.budgets.push({
                    _id: res.data.budgets[i]._id,
                    title: res.data.budgets[i].title,
                    isSelected: false
                });
            };
            if (this.budgets.lenght > 0) {
                this.budget = this.budgets[0]._id;
            }


        }, err => {

        })
    }
    selectCategory(item) {
        this.otherCategory = false;
        item.isSelected = item.isSelected ? false : true;
        if (!this.selectedCategory || item.title == this.selectedCategory.title) {
            this.selectedCategory = item;
        } else {
            this.selectedCategory.isSelected = false;
            this.selectedCategory = item;
        }
        if (!item.isSelected) {
            this.selectedCategory = null;
        }
    }
    selectCapacity(item) {
        item.isSelected = item.isSelected ? false : true;
        if (!this.selectedCacpacity || item.title == this.selectedCacpacity.title) {
            this.selectedCacpacity = item;
        } else {
            this.selectedCacpacity.isSelected = false;
            this.selectedCacpacity = item;
        }
        if (!item.isSelected) {
            this.selectedCacpacity = null;
        }
    }
    otherCategoryOption() {
        if (this.otherCategory) {
            this.selectedCategory.isSelected = false;
            this.selectedCategory = null;
        }

    }
    otherTimeChange() {
        if (this.otherSpaceTime) {
            this.spaceTime = "";
        }

    }
    slecectTime() {
        this.otherSpaceTime = false;
    }
    submitForm() {
        if (!localStorage.getItem("loginUserId")) {
            this.broadcaster.broadcast("loginOpen", "login");
            return false;
        }
        var _startTime = Number(this.startDate.momentObj.format("x"));
        var _endTime = Number(this.endDate.momentObj.format("x"));
        var date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        var _diffInDays = 1;
        var _currentTime = date.getTime() - date.getMilliseconds();

        if (_currentTime > _startTime) {
            this.messageAlert("error", "Sorry!! You can not select past date.")
            return;
        }
        if (_startTime > _endTime) {
            this.messageAlert("error", "Sorry!! To date greater or equals to From date .")
            return;
        }

        if (!this.selectedCategory && !this.otherCategory) {
            this.messageAlert('error', 'Please select category');
            return false;
        } else if (this.otherCategory && !this.otherCategoryTitle) {
            this.messageAlert('error', 'Please enter category name');
            return false;
        }
        if (!this.city) {
            this.messageAlert('error', 'Please enter city');
            return false;
        }
        if (!this.selectedCacpacity) {
            this.messageAlert('error', 'Please select capacity');
            return false;
        }

        if (!this.spaceTime && !this.otherSpaceTime) {
            this.messageAlert('error', 'Please Select Time');
            return false;
        } else if (this.otherSpaceTime && !this.otherSpaceTimeTitle) {
            this.messageAlert('error', 'Please enter time');
            return false;
        }
        if (!this.startDate || !this.startDate.formatted) {
            this.messageAlert('error', 'Please select start date');
            return false;
        }
        if (!this.endDate || !this.endDate.formatted) {
            this.messageAlert('error', 'Please select end date');
            return false;
        }
        if (!this.budget) {
            this.messageAlert('error', 'Please select budget');
            return false;
        }

        if (!this.description) {
            this.messageAlert('error', 'Please enter description');
            return false;
        }

        var data: any;
        data = {};
        data.userId = localStorage.getItem("loginUserId");
        data.startDate = this.startDate.formatted;
        data.endDate = this.endDate.formatted;
        data.address = this.city;
        data.city = this.addressConponent.administrative_area_level_2;
        data.state = this.addressConponent.administrative_area_level_1;
        data.country = this.addressConponent.country;
        if (this.otherCategory) {
            data.otherCategoryTitle = this.otherCategoryTitle;
        } else {
            data.categoryId = this.selectedCategory._id;
        }
        data.capacityId = this.selectedCacpacity._id
        data.budgetId = this.budget
        data.description = this.description;
        if (this.otherSpaceTime) {
            data.timeDuration = this.otherSpaceTimeTitle;
        } else {
            data.timeDuration = this.spaceTime;
        }
        data.status = "Active"

        this._requestService.createRequest(data).subscribe(res => {
            if (res.data.createRequest._id) {
                this.messageAlert('success', 'Saved');
                this.router.navigate(['/requests']);
            }
            else {
                this.messageAlert('error', 'Error');
            }

        }, err => {
            this.messageAlert('error', 'Error');
        })

        return false;
    }
}
