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
    selector: 'spacse-edit',
    templateUrl: 'spacse-edit.component.html',

})
export class SpacseEditComponent implements OnInit {
    data: any;
    spaceId = "";
    firstName: String;
    lastName: String;
    spacename = "";
    subtitle = "";
    description = "";
    weekdaysTimes;
    weekendTimes;
    weekdays: boolean;
    weekend: boolean;
    price4hours = "";
    price8hours = "";
    price12hours = "";
    priceDay = "";
    priceWeek = "";
    priceMonth = "";
    timings: any;
    name = "";
    securityDeposit = "";
    additionalfees = "";
    timeOptions
    coverPic = "";
    success = false;
    error = false;
    alertMessage = "";
    _timer: any;
     selectedCategoryCount = 0;
     @ViewChild(WizardComponent)
    public wizard: WizardComponent
     coverImage: Array<any>;
    photoGallery: Array<any>;
    pastPhotoGallery = [];
    //categories: Array<any>;
    constructor(
        private _spacesService: SpacesService,
        private route: ActivatedRoute,
        private router: Router,
        private broadcaster: Broadcaster,

    ) {

        this.firstName = localStorage.getItem("firstName");
        this.lastName = localStorage.getItem("lastName");
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.spaceId = params['id'];
                this.getSpasceDetail()
               // this.getDetails();
            } else {
                this.router.navigate(["/"]);
            }
        });
    
        this.weekdaysTimes = [];
        this.weekendTimes = [];

        this.weekdaysTimes.push({ "startTime": "", "endTime": "" })
        this.weekendTimes.push({ "startTime": "", "endTime": "" })

        this.coverImage = [];
        this.photoGallery = [];

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
     getSpasceDetail() {
        this._spacesService.getEditSpaceDetail(this.spaceId).subscribe(res => {
            var spacse = res.data.spacseForEdit;
            if(spacse.category.title=="Retail")
            {
                this.selectedCategoryCount=1;
            }
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
            
            this.additionalfees = spacse.additionalFees;
            this.securityDeposit = spacse.securityDeposit;
            this.coverPic = spacse.coverPictire;
            for (var i = 0; i < spacse.spacsePhotoGallery.length; i++) {
                this.pastPhotoGallery.push(spacse.spacsePhotoGallery[i].imageUrl);
            }


        }, err => {
            this.spaceId = "";
            this.router.navigate(["/"]);
        })
    }
    back() {
        this.wizard.goToPreviousStep();
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
                localStorage.setItem("spaceStep", "2");
                this.broadcaster.broadcast('hideLoader');
                this.wizard.goToNextStep();
                 if(this.selectedCategoryCount== 1) {
                    this.wizard.goToNextStep();
                    localStorage.setItem("spaceStep", "4");
                } else {
                    localStorage.setItem("spaceStep", "3");
                }

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
                localStorage.setItem("spaceStep", "1");
                this.wizard.goToNextStep();
              } else {
                this.broadcaster.broadcast('hideLoader');
                this.messageAlert('error', 'Please try again');
            }

        }, err => {
            this.broadcaster.broadcast('hideLoader');
        });

    }

    // securitydeposit
    validatesecuritydeposit() {
        var data: any;
        if (this.securityDeposit) {

            data = {};
            data.spacseId = this.spaceId;
            data.securityDeposit = this.securityDeposit;

            this._spacesService.updatesecurityDeposit(data).subscribe(res => {
                if (res.data.updateSecurityDeposit.code == "200") {
                    this.wizard.goToNextStep();
                    localStorage.setItem("spaceStep", "6");
                }
            });
        }
        this.wizard.goToNextStep();
    }

    // addtional fees
    validateStep6() {
        var data: any;
        if (this.additionalfees) {
            data = {};
            data.spacseId = this.spaceId;
            data.additionalFees = this.additionalfees;
            this._spacesService.updateAdditionalFees(data).subscribe(res => {
                if (res.data.updateAdditionalFees.code == "200") {
                    this.wizard.goToNextStep();
                    localStorage.setItem("spaceStep", "7");
                }
            });
        }
        this.wizard.goToNextStep();
    }

    validatePrice1() {
        if (!this.price4hours) {
            this.messageAlert('error', 'Please enter 4 hours price');
            return;
        }
        else if (!this.price8hours) {
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
        }
        this.wizard.goToNextStep();
    }

    validatePrice2() {
        if (!this.priceDay) {
            this.messageAlert('error', 'Please enter 1 day price'); return;
        }
        else if (!this.priceWeek) {
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
        }

        var data: any;
        data = {};
        if (this.selectedCategoryCount==1) {
            data.pricing = [];
            data.pricing.push({ "spacseId": this.spaceId, "timeFrame": "1", "timeFrameType": "Day", "rate": this.priceDay, "status": "Active" });
            data.pricing.push({ "spacseId": this.spaceId, "timeFrame": "1", "timeFrameType": "Week", "rate": this.priceWeek, "status": "Active" });
            data.pricing.push({ "spacseId": this.spaceId, "timeFrame": "1", "timeFrameType": "Month", "rate": this.priceMonth, "status": "Active" });

        } else {
            data.pricing = [];
            data.pricing.push({ "spacseId": this.spaceId, "timeFrame": "4", "timeFrameType": "Hours", "rate": this.price4hours, "status": "Active" });
            data.pricing.push({ "spacseId": this.spaceId, "timeFrame": "8", "timeFrameType": "Hours", "rate": this.price8hours, "status": "Active" });
            data.pricing.push({ "spacseId": this.spaceId, "timeFrame": "12", "timeFrameType": "Hours", "rate": this.price12hours, "status": "Active" });
            data.pricing.push({ "spacseId": this.spaceId, "timeFrame": "1", "timeFrameType": "Day", "rate": this.priceDay, "status": "Active" });
            data.pricing.push({ "spacseId": this.spaceId, "timeFrame": "1", "timeFrameType": "Week", "rate": this.priceWeek, "status": "Active" });
            data.pricing.push({ "spacseId": this.spaceId, "timeFrame": "1", "timeFrameType": "Month", "rate": this.priceMonth, "status": "Active" });
        }

        this._spacesService.updatePrice(data).subscribe(res => {
            if (res.data.updatePrice.code == "200") {
                this.wizard.goToNextStep();
                localStorage.setItem("spaceStep", "5");
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
                localStorage.removeItem("spaceStep");
                localStorage.removeItem("tempSpaceId");
                this.messageAlert("success", "Your space submitted for approval");
            }
        });
    }
    edit(entity) {
        if (entity == "availibility") {
            this.wizard.goToStep(2);
        } else if (entity == "name") {
            this.wizard.goToStep(1);
        } else if (entity == "photos") {
            this.wizard.goToStep(6);
        } else if (entity == "price") {
            this.wizard.goToStep(3);
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
        return this.photoGallery;
    }
}
