import { UserService } from '../../../graphqls/services/user';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'offer-message',
    templateUrl: 'offer-message.component.html',
})
export class OfferMessageComponent {

    success = false;
    error = false;
    alertMessage = "";
    _timer: any;
    requestedId: String;
    messageuser = [];
    messageList = [];
    usermessage = [];
    currentMessageUser: any = {};
    spacseoffers: any = {};
    messagevalue = "";

    constructor(private _userservice: UserService,
        private route: ActivatedRoute,
    ) {
        this.route.params.subscribe(params => {
            this.requestedId = params['id'];
            this.getOfferMessages();
        });

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
        }, 10000);
    }

    getOfferMessages() {
        this._userservice.getofferMessagesList().subscribe(res => {
            this.messageuser = res.data.getOfferMessages;
            console.log(this.messageuser);
            if (this.messageuser[0]) {
                this.getofferMeesageDetailByUser(this.messageuser[0]);
            }

        }, err => {
            this.messageAlert("error", err);
            console.log(err);

        });

    }
    getofferMeesageDetailByUser(message) {
        this.currentMessageUser = message;
        var data: any = {};
        data.senderId = message.senderId;
        data.receiverId = message.receiverId;
        data.requestedId = message.requestedId;
        console.log("Data"+ data.requestedId);
        data.time = (new Date()).getMilliseconds().toString();
        this._userservice.getFullOfferMessageHistories(data).subscribe(res => {
            this.usermessage = res.data.getFullOfferMessageHistoryForUser;
            this.spacseoffers = res.data.spacseoffers;
            this.messageList = [];
            this.usermessage.forEach(element => {
                this.messageList.push(element);
            });
        }, err => {
            debugger;
            this.messageAlert("error", err);

        });
    }

    sendMessage() {
        if (localStorage.getItem("loginUserId")) {

            if (this.messagevalue == "") {
                alert("Please enter message");
                return;
            }
            var data: any;
            data = {};

            data.senderId = localStorage.getItem("loginUserId");
            if (this.currentMessageUser.receiverId == data.senderId) {
                data.receiverId = this.currentMessageUser.senderId;
            } else {
                data.receiverId = this.currentMessageUser.receiverId;
            }
            data.requestedId = this.currentMessageUser.requestedId;
            data.message = this.messagevalue;

            this._userservice.createOfferMessage(data).subscribe(res => {
                if (res.data.createOfferMessage && res.data.createOfferMessage._id) {
                    this.messageList.push(res.data.createOfferMessage);
                    this.messagevalue = "";
                }
            }, err => {

            });
        }
    }
}
