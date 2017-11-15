import { Router } from '@angular/router';
import { PayNowModel } from './../../../directives/pay-now/pay-now';
import { PaymentRequest } from './../../../directives/payment-request/payment-request';
import { LoginComponent } from './../../login/login.component';
import { Broadcaster } from './../../../utility/broadcaster';
import { Component, OnInit } from "@angular/core";
import { UserService } from '../../../graphqls/services/user';
import { RequestService } from '../../../graphqls/services/request';
import { Modal, BSModalContext } from 'ngx-modialog/plugins/bootstrap';
import { TourComponent } from '../../../directives/tour/tour';
import { overlayConfigFactory } from 'ngx-modialog';
import { element } from 'protractor';
import {Http} from '@angular/http';


@Component({
    selector: "user-message",
    templateUrl: "./message.component.html"
})

export class MessageComponent implements OnInit {
    messageUsers = [];
    userMessage = [];
    loginUserId;
    messagesList = [];
    messageImage = [];
    messageValue = "";
    tourId = "";
    request: any = {};
    transactionId;
    sendImage = false;
    success = false;
    error = false;
    alertMessage = "";
    _timer: any;
    currentMessageUser: any = {};

    constructor(private _userService: UserService,
        private _requestService: RequestService,
        public modal: Modal,
        private router: Router,
        public http : Http,
        private _broadcaster: Broadcaster) {
        this.loginUserId = localStorage.getItem("loginUserId");
        // if(!this.loginUserId){
        //     this.router.navigate(['/']);
        //   }
    }


    ngOnInit() {
        if (!localStorage.getItem("loginUserId")) {
            this._broadcaster.broadcast("loginOpen", "login");
        }
        else {
            this.getMessageListByUser();
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

    getMessageListByUser() {
        this._userService.getMessageListByUser().subscribe(res => {
            this.messageUsers = res.data.profileMessages;
            if (this.messageUsers[0]) {
                this.getMeesageDetailByUser(this.messageUsers[0]);
            }

        }, err => {
            this.messageAlert("error", "Please try again");
        })
    }
    getMeesageDetailByUser(message) {
        this.currentMessageUser = message
        var data: any = {};
        data.senderId = message.senderId;
        data.receiverId = message.receiverId;
        data.requestId = message.requestId;
        data.time = (new Date()).getMilliseconds().toString();
        this._userService.getFullMessageHistoryForUser(data).subscribe(res => {
            this.userMessage = res.data.getFullMessageHistoryForUser;
            this.request = res.data.request;
            this.messagesList = [];
            this.userMessage.forEach(element => {
                this.messagesList.push(element);
            });
        }, err => {
            debugger;
            this.messageAlert("error", err);
        })
    }

    sendMessage() {

        if (localStorage.getItem("loginUserId")) {

            if (this.messageValue == "") {
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
            data.requestId = this.currentMessageUser.requestId;
            data.comment = this.messageValue;
            data.propertyType = "Request";
            if (this.messageImage.length > 0) {
                data.photoUrl = this.messageImage[0][0].response.path;
            }

            if (this.tourId) {
                data.tourId = this.tourId;
            }

            if (this.transactionId) {
                data.transactionId = this.transactionId;
            }

            this._requestService.sendMessage(data).subscribe(res => {
                if (res.data.createMessage && res.data.createMessage._id) {
                    this.messagesList.push(res.data.createMessage);
                    this.messageImage = [];
                    this.sendImage = false;
                    this.messageValue = "";
                    this.tourId = "";
                    this.transactionId = "";
                }
            }, err => {

            })
        } else {

            this._broadcaster.broadcast("loginOpen", "login");
        }
    }
    removeImage() {
        this.messageImage = [];
    }
    toggleImageBox() {
        this.sendImage = !this.sendImage;
    }
    cancelImageModel() {

    }
    sendTourRequest() {
        var dialog = this.modal.open(TourComponent, overlayConfigFactory({ "requestId": this.currentMessageUser.requestId }, BSModalContext)).then((resultPromise) => {
            resultPromise.result.then((result) => {
                if (result) {
                    this.messageValue = "Tour Scheduled!";
                    this.tourId = result;
                    this.sendMessage();
                }
            });
        });
     }
    requestPayment() {
        var dialog = this.modal.open(PaymentRequest, overlayConfigFactory({ "requestId": this.currentMessageUser.requestId }, BSModalContext)).then((resultPromise) => {
            resultPromise.result.then((result) => {
                if (result) {
                    this.messageValue = "Payment Requested!";
                    this.transactionId = result;
                    this.sendMessage();
                }
            });
        });
    }

    doPayment(message, payment) {

        var handler = (<any>window).StripeCheckout.configure({
            key: "pk_test_IPMpTb9d1TUz5rpKV1AzivHV",
            locale: 'auto',
            token: (token: any) => {
                this.processPayment(token, payment);
            }
        });
        handler.open({
            name: 'Spacse.',
            description: payment.reason,
            amount: payment.amount * 100
        });
    }
    processPayment(token, payment) {

        var data: any;
        data = {};
        data.userId = localStorage.getItem("loginUserId");
        data.requestId = this.currentMessageUser.requestId;
        data.amount = payment.amount * 100;
        data.reason = payment.reason;
        data.token = token.id;
        data.requestTransactionId = payment._id


        this.http.post(localStorage.getItem("webUrl") + "/pay-invoice", data ).subscribe(res => {
            this.messageAlert("hideLoader", "Loading");
              if(res.status == 200){
                   this.messageAlert('success', "Booking registered!!")       
              }
       }, err => {
           this.messageAlert("hideLoader", "Loading");
           this.messageAlert('error', "Please try again!!")
       })
       /*
        this._requestService.doPayment(data).subscribe(res => {

            this.getMeesageDetailByUser(this.currentMessageUser);

        }, error => {

        }); */
        //  this._requestService.doPayment().subsc
    }


}
