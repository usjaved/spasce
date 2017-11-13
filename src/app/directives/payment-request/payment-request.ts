import { Component, Input } from '@angular/core';
import { BSModalContext } from 'ngx-modialog/plugins/bootstrap';
import { ModalComponent, DialogRef } from 'ngx-modialog';
import { RequestService } from '../../graphqls/services/request';
import { DateModel } from 'ng2-datepicker';
import { Broadcaster } from '../../utility/broadcaster';

export class PaymentRequestContext extends BSModalContext {
    public requestId: String;
}

@Component({
    selector: 'payment-request',
    templateUrl: 'payment-request.html',
    providers: [RequestService]
})

export class PaymentRequest implements ModalComponent<PaymentRequestContext> {
    context: PaymentRequestContext;
    amount;
    reason;
    success = false;
    error = false;
    alertMessage = "";
    _timer: any;
    
    constructor(public _requestervice: RequestService,
        private broadcaster: Broadcaster,
        public dialog: DialogRef<PaymentRequestContext>) {
        this.context = dialog.context;
        this.amount = "";
        this.reason = "";
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
    


    doPayment() {
        
        if (this.amount == "") {
            this.messageAlert('error','Please enter start time');
            return false;
        }
        if (this.reason == "") {
            this.messageAlert('error','Please enter end time');
            return false;
        }
        var data: any;
        data = {};
        data.userId = localStorage.getItem("loginUserId");
        data.requestId = this.context.requestId
        data.amount = this.amount;
        data.reason = this.reason;
        data.status = "Pending";
        this._requestervice.paymentRequest(data).subscribe(res => {
            this.dialog.close(res.data.createRequestTransaction._id);
        }, error => {

        }); 
    }
    close() {
        this.dialog.close();
    }

}
