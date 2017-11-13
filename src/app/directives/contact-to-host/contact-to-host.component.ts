import { DatePickerOptions } from 'ng2-datepicker';
import { Component } from '@angular/core';
import { BSModalContext, Modal } from 'ngx-modialog/plugins/bootstrap';
import { ModalComponent, DialogRef } from 'ngx-modialog';
import { Broadcaster } from '../../utility/broadcaster';
import { ContactToHostService } from '../../graphqls/services/contacthost';

export class ContactToHostcontext extends BSModalContext {
    public spacseId: String;
}
@Component({
    selector: 'contact-to-host',
    templateUrl: 'contact-to-host.component.html',
    providers: [ContactToHostService]

})
export class ContactToHostComponent implements ModalComponent<ContactToHostcontext> {
    context: ContactToHostcontext;
    spacseId: any;
    success = false;
    error = false;
    alertMessage = "";
    startDate;
    endDate;
    dateFlexible;
    comment;
    _timer: any;
    options: DatePickerOptions;
    constructor(public dialog: DialogRef<ContactToHostcontext>,
        private broadcaster: Broadcaster,
        public modal: Modal,
        private _hostservice: ContactToHostService) {
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
    sendMesssage() {
        var data: any;
        data = {};
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
        if (!this.startDate) {
            this.messageAlert('error', 'Please select startDate');
            return false;
        }
        if (!this.endDate) {
            this.messageAlert('error', 'Please select endDate');
            return false;
        }
        if (!this.dateFlexible) {
            this.messageAlert('error', 'check if you want to contact with host');
            return false;
        }
        if (!this.comment) {
            this.messageAlert('error', 'enter the comment');
            return false;
        }
        data.spacseId = this.context.spacseId;
        data.userId = localStorage.getItem("loginUserId");
        data.startDate = this.startDate.formatted;
        data.endDate = this.endDate.formatted;
        data.isDateFlexible = this.dateFlexible;
        data.comment = this.comment;
        data.status = "Pending";

        this._hostservice.createContactToHost(data).subscribe(res => {
            if (res.data.createContactToHost._id) {
                this.dialog.close();
            }
         });

    }



}
