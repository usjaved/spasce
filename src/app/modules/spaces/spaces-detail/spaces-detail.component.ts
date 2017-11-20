import { BSModalContext } from 'ngx-modialog/plugins/bootstrap';
import { MakeOfferComponent } from '../../../directives/make-offer/make-offer.component';
import { Data } from '@agm/core/services/google-maps-types';
import { Component, Input } from '@angular/core';
import { SpacesService } from '../../../graphqls/services/space';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../home/users.service';
import { getSpacessQuery } from '../../../graphqls/queries/space';
import { ContactToHostComponent } from '../../../directives/contact-to-host/contact-to-host.component';
import { overlayConfigFactory, Modal } from 'ngx-modialog';
import { LoginComponent } from '../../login/login.component';
import { Broadcaster } from '../../../utility/broadcaster';
import { DateModel, DatePickerOptions } from 'ng2-datepicker';
import { Http } from '@angular/http';
import { TourComponent } from '../../../directives/tour/tour';

@Component({
    selector: 'spaces-detail',
    templateUrl: 'spaces-detail.component.html'
    //  styleUrls: ['spaces-detail.component.scss']
})
export class SpacesDetailComponent {

    spacse: any;
    spaceId: string;
    isDataLoading = true;
    public spaces: any;
    isLoading = false;
    showlocation;
    selectedPriceLayer: any = null;
    showhost;
    showreview;
    showoverview;
    images = [];
    latitude: Number = 0;
    longitude: Number = 0;
    zoom = 18;
    pricePlan = [];
    showImageGallery = false;
    startDate: DateModel;
    endDate: DateModel;
    options: DatePickerOptions;
    success = false;
    error = false;
    alertMessage = "";
    _timer: any;
    loginUserId = localStorage.getItem("loginUserId");
    constructor(private _spaceService: SpacesService,
        private route: ActivatedRoute,
        private modal: Modal,
        public http: Http,
        private router: Router,
        private _broadcast: Broadcaster,
        private _userService: UsersService) {

        this.showhost = false;
        this.showreview = false;
        this.showoverview = true;
        this.showlocation = false;
        this.options = new DatePickerOptions();
        this.route.params.subscribe(params => {
            this.spaceId = params['id'];
            this.loadSpace();
        });

        this.spacse = [];
    
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



    public loadSpace() {
        this._spaceService.getSpaceDetail(this.spaceId).subscribe(data => {
            this.spacse = data.data.spacse;
            this.latitude = parseFloat(this.spacse.latitude);
            this.longitude = parseFloat(this.spacse.longitude);
            this.pricePlan = this.spacse.pricingLayer.map((item) => { return Object.assign({}, item, { isSelected: false }); }
            )
            this.zoom = 18;
            this.setSliderImage();
            this.isLoading = true;
        }, error => {

        });
        this._spaceService.getSpaces().subscribe(data => {
            this.spaces = data.data.spacses;
        })
    }
    

    showLocationSection() {
        this.showlocation = true;
        this.showhost = false;
        this.showreview = false;
        this.showoverview = false;
    }

    showHostSection() {
        this.showhost = true;
        this.showreview = false;
        this.showoverview = false;
        this.showlocation = false;
    }

    showReviewSection() {
        this.showreview = true;
        this.showoverview = false;
        this.showhost = false;
        this.showlocation = false;

    }

    showOverView() {
        this.showoverview = true;
        this.showhost = false;
        this.showreview = false;
        this.showlocation = false;

    }

    setSliderImage() {
        this.images = [];
        for (var i = 0; i < this.spacse.spacsePhotoGallery.length; i++) {
            if (this.spacse.spacsePhotoGallery[i].imageUrl) {
                this.images.push(this.spacse.spacsePhotoGallery[i].imageUrl);
            }
        }
    }
    openImageGallery() {
        this.showImageGallery = true;
    }
    hideImageGallery() {
        this.showImageGallery = false;
    }
    openHostModal(id) {
        if (localStorage.getItem("loginUserId")) {
            var dialog = this.modal.open(ContactToHostComponent, overlayConfigFactory({ "spacseId": id }, BSModalContext));
        }
        else {
            this._broadcast.broadcast("loginOpen", "login");
        }
    }
    selectPricePlan(plan) {
        if (plan.isSelected) {
            plan.isSelected = false;
            this.selectedPriceLayer = null;
        } else {
            if (this.selectedPriceLayer) {
                this.selectedPriceLayer.isSelected = false;
            }
            plan.isSelected = true;
            this.selectedPriceLayer = plan;
        }
    }
    bookNow() {
        if (!localStorage.getItem("loginUserId")) {
            this._broadcast.broadcast("loginOpen", "login");
        }

        
        if (!this.startDate || !this.startDate.formatted) {
            this.messageAlert("error", "Please select start date")
            return;
        }

        if (!this.endDate || !this.endDate.formatted) {
            this.messageAlert("error", "Please select end date")
            return;
        }
        var _startTime = Number(this.startDate.momentObj.format("x"));
        var _endTime = Number(this.endDate.momentObj.format("x"));
        var date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        var _diffInDays = 1;
        var _currentTime = date.getTime() - date.getMilliseconds();
        this.messageAlert("loading", "Loading");

        if (_currentTime > _startTime) {
            this.messageAlert("error", "Sorry!! You can not book for the past date.")
            return;
        }
        if (_startTime > _endTime) {
            this.messageAlert("error", "Sorry!! To date greater or equals to From date .")
            return;
        }

        if (_startTime == _endTime) {
            if (!this.selectedPriceLayer) {
                this.messageAlert("error", "Please select time.")
                return;
            }
            if (this.selectedPriceLayer.timeFrameType == "Week" || this.selectedPriceLayer.timeFrameType == "Month") {
                this.messageAlert("error", "Please select valid package which will per day / per hour.")
                return;
            }
        } else {
            var _diff = _endTime - _startTime;
            _diffInDays = _diff / (24 * 60 * 60 * 1000);
            if ( this.selectedPriceLayer.timeFrameType != "Day" && this.selectedPriceLayer.timeFrameType != "Week" && this.selectedPriceLayer.timeFrameType != "Month") {
                this.messageAlert("error", "Please select valid package.")
                return;
            }

        }
        _diffInDays = Math.round(_diffInDays * 100) / 100;
        var price = Math.round(_diffInDays * this.selectedPriceLayer.rate * 100);
        var handler = (<any>window).StripeCheckout.configure({
            key: "pk_test_IPMpTb9d1TUz5rpKV1AzivHV",
            locale: 'auto',
            token: (token: any) => {
                this.processPayment(token, price);
            }
        });
        this.messageAlert("hideLoader", "Loading");
        handler.open({
            name: 'Booking Payment.',
            description: "For " + (_diffInDays * this.selectedPriceLayer.timeFrame) + " " + this.selectedPriceLayer.timeFrameType.toLowerCase() + " rate $" + this.selectedPriceLayer.rate + " / " + this.selectedPriceLayer.timeFrame + " " + this.selectedPriceLayer.timeFrameType.toLowerCase(),
            amount: price
        });

    }

    selectPackageByTimeFrame(timeFrame) {
        for (var i = 0; i < this.pricePlan.length; i++) {
            if (this.pricePlan[i].timeFrameType == timeFrame) {
                this.pricePlan[i].isSelected = true;
                this.selectedPriceLayer = this.pricePlan[i];
            } else {
                this.pricePlan[i].isSelected = false;
            }
        }
    }
    openOfferModal(spacseid,receiverId) {
        if (localStorage.getItem("loginUserId")) {
            var dialog = this.modal.open(MakeOfferComponent, overlayConfigFactory({ "spacseId": spacseid , "senderId":this.loginUserId,"receiverId": receiverId }, BSModalContext));
        }
        else {
            this._broadcast.broadcast("loginOpen", "login");
        }
    }
    processPayment(token, payment) {
        this.messageAlert("loading", "Loading");
        var data: any;
        data = {};
        data.userId = localStorage.getItem("loginUserId");
        data.spaceId = this.spaceId;
        data.amount = payment;
        data.reason = "Spacse Booking";
        data.token = token.id;
        data.spaceUserId = this.spacse.userId;
        data.startDate = this.startDate.formatted;
        data.endDate = this.endDate.formatted;
        data.timeFrame = this.selectedPriceLayer.timeFrame;
        data.timeFrameType = this.selectedPriceLayer.timeFrameType;
        data.rate = this.selectedPriceLayer.rate;
        this.http.post(localStorage.getItem("webUrl") + "/book-space", data).subscribe(res => {
            this.messageAlert("hideLoader", "Loading");
            if (res.status == 200) {
                this.messageAlert("success", "Booking registered!!")
            }
        }, err => {
            this.messageAlert("hideLoader", "Loading");
            this.messageAlert("error", "Please try again!!")
        })
    }

    sendTourRequest() {
        if (localStorage.getItem('loginUserId')) {

            var dialog = this.modal.open(TourComponent, overlayConfigFactory({ "requestId": this.spaceId }, BSModalContext))
        }
        else {
            this._broadcast.broadcast("loginOpen", "login");
        }
    }
    timeToDate(createdAt){
        if(createdAt){
            var  createdAt;
            let now = new Date();
            now.setTime(parseInt(createdAt));
            return "Joined in " + now.toLocaleString( "en-us" , {month: "long"}) + " " + now.getFullYear()
        }
        
    }
}


