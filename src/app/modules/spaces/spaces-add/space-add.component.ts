import { Component, ViewChild, NgZone, ElementRef, OnInit } from '@angular/core';
import { SpacesService } from '../../../graphqls/services/space';
import { WizardComponent } from 'ng2-archwizard';
import { AgmCoreModule } from '@agm/core';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { } from '@types/googlemaps';
import { element } from 'protractor';
import { Router, ActivatedRoute } from '@angular/router';
import { CreateSpaceAmenities, CreateUserPaymentInfo, UpdateAdditionalFees, createSpaceStep6, createSpaceStep4, SubmitForApproval } from '../../../graphqls/mutations/space';
import { Broadcaster } from '../../../utility/broadcaster';

@Component({
    selector: 'space-add',
    templateUrl: 'space-add.component.html',

})
export class SpaceAddComponent implements OnInit {
    data: any;
    spaceId = "";
    firstName: String;
    lastName: String;
    addressConponent: any;
    categories: Array<{ _id: string, title: string, isSelected: boolean }>;
    capacities: Array<any>;
    amenities: Array<any>;
    place = "";
    numberOfRooms = "";
    numberOfRestRooms = "";
    squareFoots = "";
    spacename = "";
    subtitle = "";
    description = "";
    selectedCapacity: any;
    seelectedCategory: any;
    selectedAminities: any;
    weekdaysTimes;
    weekendTimes;
    public latitude: number;
    public longitude: number;
    public zoom: number;
    weekdays: boolean;
    weekend: boolean;
    location = "";
    price4hours = "";
    price8hours = "";
    price12hours = "";
    priceDay = "";
    priceWeek = "";
    priceMonth = "";
    timings: any;
    name = "";
    routingNo = " ";
    accounttype = "";
    accountNo = "";
    securityDeposit = "";
    additionalfees = "";
    paymentmethod = "directDeposit";
    email = "";
    timeOptions
    coverPic = "";
    success = false;
    error = false;
    alertMessage = "";
    _timer: any;
    @ViewChild("search")
    public searchElementRef: ElementRef;
    @ViewChild(WizardComponent)
    public wizard: WizardComponent
    @ViewChild(AgmMap)
    public agmMap: AgmMap
    requestId = "";
    coverImage: Array<any>;
    photoGallery: Array<any>;
    pastPhotoGallery = [];
    isPrivate = false;
    loading = false;
    isSubmitted = false;
    //categories: Array<any>;
    constructor(
        private _spacesService: SpacesService,
        public mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone,
        private router: Router,
        private broadcaster: Broadcaster,
        private route: ActivatedRoute
    ) {

        this.route.queryParams.subscribe(params => {
            this.requestId = params['requestId'];
        });
        this.firstName = localStorage.getItem("firstName");
        this.lastName = localStorage.getItem("lastName");
        this.categories = [];
        this.capacities = [];
        this.amenities = [];
        this.addressConponent = [];
        this.getDetails();
        this.zoom = 4;
        this.latitude = 39.8282;
        this.longitude = -98.5795;
        this.weekdaysTimes = [];
        this.weekendTimes = [];

        this.weekdaysTimes.push({ "startTime": "", "endTime": "" })
        this.weekendTimes.push({ "startTime": "", "endTime": "" })

        this.coverImage = [];
        this.photoGallery = [];
        this.spaceId = localStorage.getItem("tempSpaceId");
        this.timeOptions = [];
        this.coverPic = "";
        for (var i = 0; i < 12; i++) {
            if (i >= 10) {
                this.timeOptions.push(i + ":00 AM");
                this.timeOptions.push(i + ":30 AM");
            } else {
                this.timeOptions.push("0" + i + ":00 AM");
                this.timeOptions.push("0" + i + ":30 AM");
            }

        }
        for (var i = 0; i < 12; i++) {
            if (i >= 10) {
                this.timeOptions.push(i + ":00 PM");
                this.timeOptions.push(i + ":30 PM");
            } else {
                this.timeOptions.push("0" + i + ":00 PM");
                this.timeOptions.push("0" + i + ":30 PM");
            }

        }

    }
    messageAlert(type, message) {
        if (type == "error") {
            this.showError(message)
        } else if (type == "loading") {
            this.showloading(message);
        }
        else if (type == "hideLoader") {
            this.showloading(message);
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
    showloading(message) {
        this.loading = true;
        this.success = false;
        this.error = false;
        this.alertMessage = message;
    }

    hideloader(message) {
        this.loading = false;
    }
    ngOnInit() {
        this.zoom = 4;
        this.latitude = 39.8282;
        this.longitude = -98.5795;
        this.mapsAPILoader.load().then(() => {
            let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                types: ["address"]
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

                    this.place = place.formatted_address;
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

    addMoreTimes() {
        this.weekdays = true;
        this.weekdaysTimes.push({ "startTime": "", "endTime": "" })
    }

    addMoreWeekendTimes() {
        this.weekend = true;
        this.weekendTimes.push({ "startTime": "", "endTime": "" })

    }

    getDetails() {
        this._spacesService.getNewFormOptions().subscribe(res => {
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
            for (let i = 0; i < res.data.amenities.length; i++) {
                this.amenities.push({
                    _id: res.data.amenities[i]._id,
                    title: res.data.amenities[i].title,
                    isSelected: false
                });
            };
            if (this.spaceId) {
                this.getSpasceDetail();
            }
        }, err => {
            console.log(err);
        })
    }

    getSpasceDetail() {
        this._spacesService.getEditSpaceDetail(this.spaceId).subscribe(res => {

            var spacse = res.data.spacseForEdit;
            var categoryId = spacse.category._id;

            for (var i = 0; i < this.categories.length; i++) {
                for (var j = 0; j < spacse.spaceCategories.length; j++) {
                    if (spacse.spaceCategories[j].categoryId == this.categories[i]._id) {
                        this.categories[i].isSelected = true;
                    }
                }
                if (this.categories[i]._id == categoryId) {
                    this.categories[i].isSelected = true;
                    this.seelectedCategory = this.categories[i];
                }
            }

            this.isPrivate = spacse.isPrivate == "Yes";
            var capacityId = spacse.capacity._id;
            if (capacityId) {
                for (var i = 0; i < this.capacities.length; i++) {
                    if (this.capacities[i]._id == capacityId) {
                        this.selectPropery(this.capacities[i]);
                    }
                }
            }
            this.numberOfRooms = spacse.numberOfRooms;
            this.numberOfRestRooms = spacse.numberOfRestRooms;
            this.squareFoots = spacse.squareFootArea;

            // Manage Aminities. 
            for (var i = 0; i < spacse.spacseamenities.length; i++) {
                for (let j = 0; j < this.amenities.length; j++) {
                    if (this.amenities[j]._id == spacse.spacseamenities[i].amenities._id) {
                        this.amenities[j].isSelected = true;
                    }
                };
            }

            // Manage Location 
            this.place = spacse.address;
            this.addressConponent.administrative_area_level_2 = spacse.city;
            this.addressConponent.administrative_area_level_1 = spacse.state;
            this.addressConponent.country = spacse.country;
            this.latitude = parseFloat(spacse.latitude);
            this.longitude = parseFloat(spacse.longitude);

            // Set Avibilities 
            if (spacse.avaibilities.length) {
                this.weekdaysTimes = [];
                this.weekendTimes = [];
                for (var i = 0; i < spacse.avaibilities.length; i++) {
                    if (spacse.avaibilities[i].days == "weekdays") {
                        this.weekdays = true;
                        this.weekdaysTimes.push({ "startTime": spacse.avaibilities[i].startTime, "endTime": spacse.avaibilities[i].endTime })
                    } else {
                        this.weekend = true;
                        this.weekendTimes.push({ "startTime": spacse.avaibilities[i].startTime, "endTime": spacse.avaibilities[i].endTime })
                    }
                }
            }

            this.spacename = spacse.title;
            this.subtitle = spacse.subTitle;
            this.description = spacse.description;
            // manage Pricing layer
            for (var i = 0; i < spacse.pricingLayer.length; i++) {
                if (spacse.pricingLayer[i].timeFrame == "4" && spacse.pricingLayer[i].timeFrameType == "Hours") {
                    this.price4hours = spacse.pricingLayer[i].rate + "";
                } else if (spacse.pricingLayer[i].timeFrame == "8" && spacse.pricingLayer[i].timeFrameType == "Hours") {
                    this.price8hours = spacse.pricingLayer[i].rate + "";
                } else if (spacse.pricingLayer[i].timeFrame == "12" && spacse.pricingLayer[i].timeFrameType == "Hours") {
                    this.price12hours = spacse.pricingLayer[i].rate + "";
                } else if (spacse.pricingLayer[i].timeFrame == "1" && spacse.pricingLayer[i].timeFrameType == "Day") {
                    this.priceDay = spacse.pricingLayer[i].rate + "";
                } else if (spacse.pricingLayer[i].timeFrame == "1" && spacse.pricingLayer[i].timeFrameType == "Week") {
                    this.priceWeek = spacse.pricingLayer[i].rate + "";
                } else if (spacse.pricingLayer[i].timeFrame == "1" && spacse.pricingLayer[i].timeFrameType == "Month") {
                    this.priceMonth = spacse.pricingLayer[i].rate + "";
                }
            }

            // Manage Payemnt 
            if (spacse.userPaymentInfo.paymentType == "Paypal") {
                this.paymentmethod = "paypal";
                this.email = spacse.userPaymentInfo.email;
            } else {
                this.paymentmethod = "directDeposit";
                this.name = spacse.userPaymentInfo.bankInfo;
                this.accounttype = spacse.userPaymentInfo.accounttype;
                this.routingNo = spacse.userPaymentInfo.routingNo;
                this.accountNo = spacse.userPaymentInfo.accountNo;
            }

            this.additionalfees = spacse.additionalFees;
            this.securityDeposit = spacse.securityDeposit;
            this.coverPic = spacse.coverPictire;
            for (var i = 0; i < spacse.spacsePhotoGallery.length; i++) {
                this.pastPhotoGallery.push(spacse.spacsePhotoGallery[i].imageUrl);
            }
            var stepNumber = parseInt(localStorage.getItem("spaceStep"))
            this.wizard.goToStep(stepNumber);
        }, err => {
            this.spaceId = "";
            console.log("error");
        })
    }
    validateStape1($event) {

        this.wizard.goToNextStep();
        window.scrollTo(0, 0);
    }

    back() {
        window.scrollTo(0, 0);
        this.wizard.goToPreviousStep();
    }

    selectCategory(item) {
        item.isSelected = item.isSelected ? false : true;
        if (!this.seelectedCategory || item.title == this.seelectedCategory.title) {
            this.seelectedCategory = item;
        } else {
            this.seelectedCategory.isSelected = false;
            this.seelectedCategory = item;
        }
        if (!item.isSelected) {
            this.seelectedCategory = null;
        }
    }

    selectPropery(item) {
        item.isSelected = item.isSelected ? false : true;
        if (!this.selectedCapacity || item.title == this.selectedCapacity.title) {
            this.selectedCapacity = item;
        } else {
            this.selectedCapacity.isSelected = false;
            this.selectedCapacity = item;
        }
        if (!item.isSelected) {
            this.selectedCapacity = null;
        }
    }

    selectAminities(item) {
        if (item.isSelected) {
            item.isSelected = false;
        } else
            item.isSelected = true;
    }

    validateStep1() {

        var categoryIds = [];
        for (var i = 0; i < this.categories.length; i++) {
            if (this.categories[i].isSelected) {
                categoryIds.push(this.categories[i]._id);
            }
        }
        if (categoryIds.length == 0) {
            this.messageAlert('error', 'Plase select category');
            return false;
        }
        var data: any = {};
        if (this.spaceId) {
            data.spacseId = this.spaceId;
        }
        this.broadcaster.broadcast('loading', "Loading");
        data.categoryId = categoryIds;
        data.userId = localStorage.getItem("loginUserId");
        this._spacesService.createSpaceStep1(data).subscribe(res => {
            localStorage.setItem("tempSpaceId", res.data.createSpaceStep1.id);
            localStorage.setItem("spaceStep", "1");
            this.spaceId = res.data.createSpaceStep1.id;
            this.broadcaster.broadcast('hideLoader');
            window.scrollTo(0, 0);
            this.wizard.goToNextStep();
        }, err => {
            this.broadcaster.broadcast('hideLoader');
        });
    }

    validateStep2() {
        if (!this.selectedCapacity) {
            this.messageAlert('error', 'please select capacity');
        } else if (!this.numberOfRooms) {
            this.messageAlert('error', 'Please enter number of rooms');
        } else if (!this.numberOfRestRooms) {
            this.messageAlert('error', 'Please enter number of rest rooms');
        } else if (!this.squareFoots) {
            this.messageAlert('error', 'Please enter square foot area');
        } else {
            this.broadcaster.broadcast('loading', "Loading");
            var data: any = {};
            data.spacseId = this.spaceId;
            data.userId = localStorage.getItem("loginUserId");
            data.capacityId = this.selectedCapacity._id;
            data.numberOfRooms = this.numberOfRooms + "";
            data.numberOfRestRooms = this.numberOfRestRooms + "";
            data.squareFootArea = this.squareFoots + "";
            this._spacesService.createSpaceStep2(data).subscribe(res => {
                if (res.data.createSpaceStep2.code == '200') {
                    this.broadcaster.broadcast('hideLoader');
                    localStorage.setItem("spaceStep", "2");
                    window.scrollTo(0, 0);
                    this.wizard.goToNextStep();
                    
                }
                else {
                    this.broadcaster.broadcast('hideLoader');
                    this.messageAlert('error', 'Please try again');
                }

            }, err => {
                this.broadcaster.broadcast('hideLoader');
            });


        }
    }

    validateStep3() {
        this.selectedAminities = [];
        for (let i = 0; i < this.amenities.length; i++) {
            if (this.amenities[i].isSelected == true) {
                this.selectedAminities.push(this.amenities[i]._id);
            }
        }

        this.broadcaster.broadcast('loading', "Loading");
        var data: any = {};
        data.spacseId = this.spaceId;
        data.userId = localStorage.getItem("loginUserId");
        data.aminities = this.selectedAminities;
        this._spacesService.createSpaceStep3(data).subscribe(res => {
            if (res.data.createSpaceStep3.code == '200') {
                this.broadcaster.broadcast('hideLoader');
                this.wizard.goToNextStep();
                window.scrollTo(0, 0);
                this.agmMap.triggerResize();
                localStorage.setItem("spaceStep", "3");
            }
            else {
                this.broadcaster.broadcast('hideLoader');
                this.messageAlert('error', res.data.createSpaceStep3.message);
            }

        }, err => {
            this.broadcaster.broadcast('hideLoader');
        });


    }

    validateStep4() {
        if (!this.place) {
            this.messageAlert('error', 'please enter address');
        } else if (!this.addressConponent.country) {
            this.messageAlert('error', 'Check the location on google map is proper');
        } else {

            this.broadcaster.broadcast('loading', "Loading");
            var data: any = {};
            data.spacseId = this.spaceId;
            data.userId = localStorage.getItem("loginUserId");

            data.address = this.place;
            data.city = this.addressConponent.administrative_area_level_2;
            data.state = this.addressConponent.administrative_area_level_1;
            data.country = this.addressConponent.country;
            data.latitude = this.latitude + "";
            data.longitude = this.longitude + "";

            this._spacesService.createSpaceStep4(data).subscribe(res => {
                if (res.data.createSpaceStep4.code == '200') {
                    this.broadcaster.broadcast('hideLoader');
                    this.wizard.goToNextStep();
                    window.scrollTo(0, 0);
                    localStorage.setItem("spaceStep", "4");
                }
                else {
                    this.broadcaster.broadcast('hideLoader');
                    this.messageAlert('error', res.data.createSpaceStep4.message);
                }

            }, err => {
                this.broadcaster.broadcast('hideLoader');
            });



            //this.wizard.goToNextStep();
        }
    }

    validateStep5() {
        this.timings = [];
        if (this.weekdays) {
            if (this.weekdaysTimes[0].startTime && this.weekdaysTimes[0].endTime) {
                for (let i = 0; i < this.weekdaysTimes.length; i++) {

                    if (this.weekdaysTimes[i].startTime && this.weekdaysTimes[i].endTime) {
                        var timeFrame = { "days": "weekdays", "startTime": this.weekdaysTimes[i].startTime, "endTime": this.weekdaysTimes[i].endTime };
                        this.timings.push(timeFrame);
                    }
                }
            }
            else {
                this.messageAlert('error', 'Please enter valid week days times');
                return false;
            }
        }
        if (this.weekend) {
            if (this.weekendTimes[0].startTime && this.weekendTimes[0].endTime) {
                for (let i = 0; i < this.weekendTimes.length; i++) {
                    if (this.weekendTimes[i].startTime && this.weekendTimes[i].endTime) {
                        var timeFrame = { "days": "weekend", "startTime": this.weekendTimes[i].startTime, "endTime": this.weekendTimes[i].endTime };
                        this.timings.push(timeFrame);
                    }
                }
            }
            else {
                this.messageAlert('error', 'Please enter valid week end times');
                return false;
            }
        }
        if (this.timings.length == 0) {
            this.messageAlert('error', 'Please enter avaibility time');
            return false;
        }

        // this.broadcaster.broadcast('loading',"Loading");
        var data: any = {};
        data.spacseId = this.spaceId;
        data.userId = localStorage.getItem("loginUserId");
        data.avaibilities = this.timings;
        this._spacesService.createSpaceStep5(data).subscribe(res => {
            if (res.data.createSpaceStep5.code == '200') {
                this.broadcaster.broadcast('hideLoader');
                this.wizard.goToNextStep();
                window.scrollTo(0, 0);
                localStorage.setItem("spaceStep", "5");

            }
            else {
                this.broadcaster.broadcast('hideLoader');
                this.messageAlert('error', res.data.createSpaceStep5.message);
            }

        }, err => {
            this.broadcaster.broadcast('hideLoader');
        });


    }


    validateStepName() {

        if (!this.spacename) {
            this.messageAlert('error', 'Please enter name');
            return false;
        }
        if (!this.subtitle) {
            this.messageAlert('error', 'Please enter sub title');
            return false;
        }
        if (!this.description) {
            this.messageAlert('error', 'Please enter description');
            return false;
        }
        var data: any;
        data = {};
        data.spacseId = this.spaceId;
        data.title = this.spacename;
        data.subTitle = this.subtitle;
        data.description = this.description;
        this._spacesService.createSpaceStep6(data).subscribe(res => {
            if (res.data.createSpaceStep6.code == "200") {
                this.broadcaster.broadcast('hideLoader');
                this.wizard.goToNextStep();
                window.scrollTo(0, 0);
                var selectedCategoryCount = 0;
                var isRetailSelected = false;
                for (var i = 0; i < this.categories.length; i++) {
                    if (this.categories[i].isSelected) {
                        if (this.categories[i].title == "Retail") {
                            isRetailSelected = true;
                        }
                        selectedCategoryCount++;
                    }
                }

                if (selectedCategoryCount == 1 && isRetailSelected) {
                    this.wizard.goToNextStep();
                    window.scrollTo(0, 0);
                    localStorage.setItem("spaceStep", "7");
                } else {
                    localStorage.setItem("spaceStep", "6");
                }
                //  this.agmMap.triggerResize(true);

            } else {
                this.broadcaster.broadcast('hideLoader');
                this.messageAlert('error', 'Please try again');
            }

        }, err => {
            this.broadcaster.broadcast('hideLoader');
        });

    }

    validatebankinfo() {
        var data: any;
        if (this.paymentmethod == "directDeposit") {
            if (!this.name) {
                this.messageAlert('error', 'Please enter name on Account');
            }
            // else if (!this.accounttype) {
            //     this.messageAlert('error', 'Select  any one AccountType');
            // }
            else if (!this.routingNo) {
                this.messageAlert('error', 'Enter Routing No');
            }
            else if (!this.accountNo) {
                this.messageAlert('error', 'Enter Account No');
            }
            else {
                data = {};
                data.paymentType = "Direct Deposit"
                data.spacseId = this.spaceId;
                data.userId = localStorage.getItem("loginUserId");
                data.bankInfo = this.name;
                data.routingNo = this.routingNo;
                data.accounttype = this.accounttype;
                data.accountNo = this.accountNo;
                console.log(data);
                this._spacesService.createUserPaymentInfo(data).subscribe(res => {

                    if (res.data.createUserPaymentInfo._id) {
                        localStorage.setItem("spaceStep", "9");
                        this.wizard.goToNextStep();
                        window.scrollTo(0, 0);
                    }
                }, error => {
                    this.messageAlert('error', 'error');
                })
            }
        }

   /*     if (this.paymentmethod == "paypal") {
            if (!this.email) {
                this.messageAlert('error', 'Please enter email address');

            }
            else {
                var data: any;
                data = {};
                data.paymentType = "Paypal"
                data.spacseId = this.spaceId;
                data.userId = localStorage.getItem("loginUserId");
                data.email = this.email;
                console.log(data);
                this._spacesService.createUserPaymentInfo(data).subscribe(res => {

                    if (res.data.createUserPaymentInfo._id) {
                        this.wizard.goToNextStep();
                        window.scrollTo(0, 0);
                        localStorage.setItem("spaceStep", "9");
                    }
                }, error => {
                    this.messageAlert('error', 'error');
                })
            }
        } */
    }

    validatesecuritydeposit() {
        var data: any;
        if (!this.securityDeposit) {
            this.securityDeposit = "0";
        }

        data = {};
        data.spacseId = this.spaceId;
        data.securityDeposit = this.securityDeposit;

        this._spacesService.updatesecurityDeposit(data).subscribe(res => {
            if (res.data.updateSecurityDeposit.code == "200") {
                this.wizard.goToNextStep();
                window.scrollTo(0, 0);
                localStorage.setItem("spaceStep", "10");
            }
        });
    }

    // addtional fees
    validateStep6() {
        var data: any;
        if (!this.additionalfees) {
            this.additionalfees = "0"
        }
        data = {};
        data.spacseId = this.spaceId;
        data.additionalFees = this.additionalfees;
        this._spacesService.updateAdditionalFees(data).subscribe(res => {
            if (res.data.updateAdditionalFees.code == "200") {
                this.wizard.goToNextStep();
                window.scrollTo(0, 0);
                localStorage.setItem("spaceStep", "11");
            }
        });
    }


    /* tempSaveData() {
         var data: any;
         data = {};
         data.userId = localStorage.getItem("loginUserId");
         data.categoryId = this.seelectedCategory._id;
         data.capacityId = this.selectedCapacity._id;
         data.numberOfRooms = this.numberOfRooms + "";
         data.numberOfRestRooms = this.numberOfRestRooms + "";
         data.squareFootArea = this.squareFoots + "";
         data.address = this.place;
         data.city = this.addressConponent.administrative_area_level_2;
         data.state = this.addressConponent.administrative_area_level_1;
         data.country = this.addressConponent.country;
         data.latitude = this.latitude + "";
         data.longitude = this.longitude + "";
         data.title = this.spacename;
         data.subTitle = this.subtitle;
         data.description = this.description;
         data.coverPictire = ""
         data.securityDeposit = "0";
         data.additionalFees = "0";
         data.aminities = this.selectedAminities;
         data.avaibilities = this.timings;
         data.spaceId = this.spaceId;
 
 
         this._spacesService.createSpace(data).subscribe(res => {
             if (res.data.createSpacse._id) {
                 //  this.spaceId = res.data.createSpacse._id;
                 // localStorage.setItem("tempSpaceId", this.spaceId);
                 console.log(this.spaceId);
 
                 this.wizard.goToNextStep();
             }
         }, error => {
             this.messageAlert('error', 'Email or password not match');
         })
 
     } */

    validatePrice1() {
        if (!this.price4hours && !this.price8hours && !this.price12hours) {
            this.messageAlert('error', 'Please enter hourly price');
            return;
        }
        /*else if (!this.price8hours) {
            this.messageAlert('error', 'Please enter 8 hours price');
            return;
        }
        if (!this.price12hours) {
            this.messageAlert('error', 'Please enter 12 hours price');
            return;
        } 
        if (this.price4hours.startsWith('$')) {
            this.price4hours = this.price4hours.slice(1)
        }
        if (this.price8hours.startsWith('$')) {
            this.price8hours = this.price8hours.slice(1)
        }
        if (this.price12hours.startsWith('$')) {
            this.price12hours = this.price12hours.slice(1)
        } */

        this.wizard.goToNextStep();
        window.scrollTo(0, 0);
    }

    validatePrice2() {
        if (!this.priceDay && !this.priceWeek && !this.priceMonth) {
            this.messageAlert('error', 'Please enter price'); 
            return;
        }
        /*else if (!this.priceWeek) {
            this.messageAlert('error', 'Please enter 1 week price');
            return;
        }
        if (!this.priceMonth) {
            this.messageAlert('error', 'Please enter 1 month price');
            return;
        } 
        if (this.priceDay.startsWith('$')) {
            this.priceDay = this.priceDay.slice(1)
        }
        if (this.priceWeek.startsWith('$')) {
            this.priceWeek = this.priceWeek.slice(1)
        }
        if (this.priceMonth.startsWith('$')) {
            this.priceMonth = this.priceMonth.slice(1)
        } */

        var selectedCategoryCount = 0;
        var isRetailSelected = false;
        for (var i = 0; i < this.categories.length; i++) {
            if (this.categories[i].isSelected) {
                if (this.categories[i].title == "Retail") {
                    isRetailSelected = true;
                }
                selectedCategoryCount++;
            }
        }

        var data: any;
        data = {};
        if (selectedCategoryCount == 1 && isRetailSelected) {
            data.pricing = [];
            if(this.priceDay){
                data.pricing.push({ "spacseId": this.spaceId, "timeFrame": "1", "timeFrameType": "Day", "rate": this.priceDay, "status": "Active" });
            }
            if(this.priceWeek){
                data.pricing.push({ "spacseId": this.spaceId, "timeFrame": "1", "timeFrameType": "Week", "rate": this.priceWeek, "status": "Active" });
            }
            if(this.priceMonth){
                data.pricing.push({ "spacseId": this.spaceId, "timeFrame": "1", "timeFrameType": "Month", "rate": this.priceMonth, "status": "Active" });
            }

        } else {
            data.pricing = [];
            if(this.price4hours){
            data.pricing.push({ "spacseId": this.spaceId, "timeFrame": "4", "timeFrameType": "Hours", "rate": this.price4hours, "status": "Active" });
            
            }
            if(this.price8hours){
                data.pricing.push({ "spacseId": this.spaceId, "timeFrame": "8", "timeFrameType": "Hours", "rate": this.price8hours, "status": "Active" });
            }
            if(this.price12hours){
                data.pricing.push({ "spacseId": this.spaceId, "timeFrame": "12", "timeFrameType": "Hours", "rate": this.price12hours , "status": "Active" });
            }
            
            if(this.priceDay){
                data.pricing.push({ "spacseId": this.spaceId, "timeFrame": "1", "timeFrameType": "Day", "rate": this.priceDay, "status": "Active" });
            }
            if(this.priceWeek){
                data.pricing.push({ "spacseId": this.spaceId, "timeFrame": "1", "timeFrameType": "Week", "rate": this.priceWeek, "status": "Active" });
            }
            if(this.priceMonth){
                data.pricing.push({ "spacseId": this.spaceId, "timeFrame": "1", "timeFrameType": "Month", "rate": this.priceMonth, "status": "Active" });
            }
        }

        this._spacesService.updatePrice(data).subscribe(res => {
            if (res.data.updatePrice.code == "200") {
                this.wizard.goToNextStep();
                window.scrollTo(0, 0);
                localStorage.setItem("spaceStep", "8");
            }
            else {
                this.messageAlert('error', "Please try again");
            }
        });
    }
    removeCoverImage() {
        this.coverImage = [];
    }
    deg(item) {

    }
    uploadImages() {
        var data: any;
        data = {};
        data.spacseId = this.spaceId;
        if (this.coverImage[0] && this.coverImage[0][0].responseStatus == 200) {
            data.coverPic = this.coverImage[0][0].response.path;
        } else if (this.coverPic) {
            data.coverPic = this.coverPic;
        } else {
            this.messageAlert('error', 'Please select cover pic');
            return false;
        }
        data.photoGellary = this.pastPhotoGallery;
        if (this.photoGallery) {
            for (var i = 0; i < this.photoGallery.length; i++) {
                if (this.photoGallery[i][0].responseStatus == 200) {
                    data.photoGellary.push(this.photoGallery[i][0].response.path);
                } else {
                    this.messageAlert('error', 'Please wait file uploading in process..');
                    return;
                }
            }
        }
        this.pastPhotoGallery = data.photoGellary;
        this.photoGallery = [];
        this._spacesService.uploadPictures(data).subscribe(res => {
            if (res.data.uploadImages.code == "200") {
                this.wizard.goToNextStep();
                window.scrollTo(0, 0);
            }
        });
    }
    submitForApproval() {
        var data: any;
        data = {};
        data.spacseId = this.spaceId;
        data.status = "Active";
        this._spacesService.submitForApproval(data).subscribe(res => {
            if (res.data.submitForApproval.code == "200") {
                this.isSubmitted = true;
                localStorage.removeItem("spaceStep");
                localStorage.removeItem("tempSpaceId");
                this.messageAlert("success", "Your space submitted for approval");
            }
        });
    }
    edit(entity) {
        if (entity == "location") {
            this.wizard.goToStep(3);
        } else if (entity == "name") {
            this.wizard.goToStep(5);
        } else if (entity == "photos") {
            this.wizard.goToStep(11);
        } else if (entity == "price") {
            this.wizard.goToStep(6);
        }

    }
    removeGalleryImage(index) {
        this.photoGallery.splice(index, 1);
    }
    removePastPhotoGallery(index) {
        this.pastPhotoGallery.splice(index, 1);
    }
    removeCoverPic() {
        this.coverPic = "";
    }
    getimages() {
        console.log(this.photoGallery);
        return this.photoGallery;
    }
    setPrivate() {
        var data: any;
        data = {};
        data.spacseId = this.spaceId;
        data.isPrivate = this.isPrivate ? "Yes" : "No";
        this._spacesService.setPrivate(data).subscribe(res => {
            if (res.data.setPrivate.code == "200") {
                this.wizard.goToStep(13);
            }
        });
    }
}
