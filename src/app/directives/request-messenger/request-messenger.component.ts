import { TourComponent } from './../tour/tour';
import { OnInit } from '@angular/core';
import { LoginComponent } from './../../modules/login/login.component';
import { Component, Input } from '@angular/core';
import { RequestService } from '../../graphqls/services/request';
import { Modal, BSModalContext } from 'ngx-modialog/plugins/bootstrap';
import { overlayConfigFactory } from 'ngx-modialog';
import { PaymentRequest } from '../payment-request/payment-request';
import { Broadcaster } from '../../utility/broadcaster';
@Component({
    selector: 'request-messenger',
    templateUrl: 'request-messenger.component.html',
})
export class RequestMessengerComponent implements OnInit {
    @Input() requestId;
    @Input() messages;
    @Input() requestUserId;
    @Input() spaces;
    spacseId = "";
    spacse = [];
    messagesList = [];
    messageImage = [];
    messageValue = "";
    tourId = "";
    transactionId = "";
    sendImage = false;
    loginUserId;
    profilePic;
    userId;
    constructor(
        public modal: Modal,
        private broadcaster: Broadcaster,
        private _requestService: RequestService
    ) {
        this.messageImage = [];
        this.profilePic = localStorage.getItem("profilePic");
        this.userId = localStorage.getItem("loginUserId");
    }
    ngOnInit() {
        this.messagesList = [];
        debugger;
        for (var i = 0; i < this.messages.length; i++) {
            this.messagesList.push(this.messages[i]);
        }
        
    }
    sendMessage() {

        if (localStorage.getItem("loginUserId")) {

            if (this.messageValue == "") {
                alert("Please enter message");
                return;
            }
            if (!this.spacseId) {
                alert("Please select spacse");
                return;
            }
            
            var data: any;
            data = {};
            if(localStorage.getItem("loginUserId") != this.requestUserId){
                data.senderId = localStorage.getItem("loginUserId")
                data.receiverId = this.requestUserId;
            }else{
                for(var i = 0; i < this.spaces.length; i++){
                    if(this.spaces[i].spacse._id == this.spacseId){
                        data.receiverId = this.spaces[i].user._id;   
                    }
                }
                data.senderId = localStorage.getItem("loginUserId")
                
            }
            data.requestId = this.requestId;
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
            data.spacseId = this.spacseId;
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
            this.broadcaster.broadcast("loginOpen", "login");

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
        if (!this.spacseId) {
            alert("Please select spacse");
            return;
        }
        if (localStorage.getItem('loginUserId')) {
            
            var dialog = this.modal.open(TourComponent, overlayConfigFactory({ "requestId": this.requestId }, BSModalContext)).then((resultPromise) => {
                resultPromise.result.then((result) => {
                    if (result) {
                        this.messageValue = "Tour Scheduled!";
                        this.tourId = result;
                        this.sendMessage();
                    }
                });
            });
        }
        else
        {
            this.broadcaster.broadcast("loginOpen", "login");
        }
      
   }
    requestPayment() {
        if (!this.spacseId) {
            alert("Please select spacse");
            return;
        }
        if (localStorage.getItem('loginUserId')) {
            var dialog = this.modal.open(PaymentRequest, overlayConfigFactory({ "requestId": this.requestId }, BSModalContext)).then((resultPromise) => {
                resultPromise.result.then((result) => {
                    if (result) {
                        this.messageValue = "Payment Requested!";
                        this.transactionId = result;
                        this.sendMessage();
                    }
                });
            });
        }
        else {
            this.broadcaster.broadcast("loginOpen", "login");
        }
     }
}
