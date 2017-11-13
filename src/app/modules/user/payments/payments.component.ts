import { Component, Output, EventEmitter, Input } from '@angular/core';
import { UserService } from '../../../graphqls/services/user';

@Component({

    selector: 'payments',
    templateUrl: 'payments.component.html',
})
export class PaymentsComponent {
    showPayment = false;
    showpaymentMethod = false;
    accounttype: String;
    firstName: String;
    lastName: String;
    routingNo: String;
    accountNo: String;
    success = false;
    error = false;
    loading = false;
    alertMessage = "";
    _timer: any;
    userId = "";
    data = [];
    paymentmethods = [] ;
   @Output() newmethods = new EventEmitter();


    constructor(private _userservice: UserService) {
        this.userId = localStorage.getItem("loginUserId");
        this.getPaymentMethod() ;
    }
    messageAlert(type, message) {
        if (type == "error") {
            this.showError(message)
        }
        else if (type == "loading") {
            this.showloading(message);
        }
        else if (type == "hideLoader") {
            this.hideloader(message);
        }
        else {
            this.showSuccess(message);
        }
    }
    showError(message) {
        this.loading = false;
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
        this.loading = false;
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

    getPaymentMethod() {
        this._userservice.getUserPaymentMethods(this.userId).subscribe(res => {
            this.data = res.data.user.paymentmethods;
            if(this.data.length > 0){
                for (var i = 0; i < this.data.length; i++) {
                    this.paymentmethods.push(this.data[i]);
                }
           } });
   } 
 
    addPayment() {
        this.showPayment = !this.showPayment;
    }
    receivePayment() {
        this.messageAlert("loading", "Loading");

        if (!this.accounttype) {
            this.messageAlert('error', "Select the appropriate account type");
            return false;
        }
        if (!this.firstName) {
            this.messageAlert('error', "Enter the firstName");
            return false;
        }
        if (!this.lastName) {
            this.messageAlert('error', "Enter the lastName");
            return false;
        }
        if (!this.routingNo) {
            this.messageAlert('error', "Enter the RoutingNo");
            return false;
        }
        if (!this.accountNo) {
            this.messageAlert('error', "Enter the accountNo");
            return false;
        }
        var data: any;
        data = {};
        data.userId = localStorage.getItem("loginUserId");
        data.accounttype = this.accounttype;
        data.firstName = this.firstName;
        data.lastName = this.lastName;
        data.routingNo = this.routingNo;
        data.accountNo = this.accountNo;
        this._userservice.createPaymentMethod(data).subscribe(res => {
            if (res.data.createPaymentMethod._id) {
                this.messageAlert("success", "PaymentMethod added Successfully");
                this.messageAlert("hideLoader", "hideloader");
                 this.paymentmethods = [res.data.createPaymentMethod].concat(this.paymentmethods);
                 // console.log("Payment method"+ this.paymentmethods);
                 this.newmethods.emit(this.paymentmethods);
                 // console.log("Event emit" + this.newmethods);
            
                 if (this.showPayment = true) {
                    this.showPayment = false;
                } 
                
            } 
        });
    }
}
