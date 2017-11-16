import { Component } from '@angular/core';
import { DialogRef } from 'ngx-modialog';
import { Broadcaster } from '../../utility/broadcaster';
import { BSModalContext } from 'ngx-modialog/plugins/bootstrap';
import { MakeOfferService } from '../../graphqls/services/makeoffer';
import { DatePickerOptions } from 'ng2-datepicker';

export class MakeOffercontext extends BSModalContext {
    public spacseId: String;
}

@Component({
    selector: 'make-offer',
    templateUrl: 'make-offer.component.html',
    providers: [MakeOfferService]
})

export class MakeOfferComponent {
    context: MakeOffercontext;
    success = false;
    error = false;
    alertMessage = "";
    startDate;
    endDate;
    HoursNeeded;
    ProposedOffer;
    _timer: any;
    options : DatePickerOptions;
    constructor(public dialog: DialogRef<MakeOffercontext>,
        private broadcaster: Broadcaster,
        private _offerservice: MakeOfferService
    ) {
        this.context = dialog.context;
        this.options = new DatePickerOptions();
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

    close() {
        this.dialog.close();
    }

    makeOffer() {
        var data: any;
        data = {};
        
        if(!this.startDate){
            this.messageAlert("error", "Please select check in.")
            return;
        }
        if(!this.endDate){
            this.messageAlert("error", "Please select check out.")
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

        if (_currentTime > _startTime) {
            this.messageAlert("error", "Sorry!! You can not select past date.")
            return;
        }
        if (_startTime > _endTime) {
            this.messageAlert("error", "Sorry!! Checkout date greater or equals to Check In date .")
            return;
        }
        
        if (!this.HoursNeeded) {
            this.messageAlert('error', 'Enter  the required Hours Needed');
            return false;
        }
        if (!this.ProposedOffer) {
            this.messageAlert('error', 'Enter the Proposed Offer');
            return false
        }
        if (this.ProposedOffer.startsWith('$')) {
            this.ProposedOffer = this.ProposedOffer.slice(1);
        }

        data.spacseId = this.context.spacseId;
        data.userId = localStorage.getItem('loginUserId');
        data.startDate = this.startDate.formatted;
        data.endDate = this.endDate.formatted;
        data.hoursNeeded = this.HoursNeeded;
        data.offerPrice = this.ProposedOffer;
        console.log(data);
        debugger
        this._offerservice.CreateSpacseOffer(data).subscribe(res => {
            if (res.data.createSpacseOffer._id) {
                this.dialog.close();
            }
        });

    }
}
