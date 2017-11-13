import { Component, Input } from '@angular/core';
import { BSModalContext } from 'ngx-modialog/plugins/bootstrap';
import { ModalComponent, DialogRef } from 'ngx-modialog';
import { RequestService } from '../../graphqls/services/request';
import { DateModel } from 'ng2-datepicker';
import { Broadcaster } from '../../utility/broadcaster';

export class PayNowContext extends BSModalContext {
    public requestId: String;
    public message: any;
    public payment : any
}

@Component({
    selector: 'pay-now',
    templateUrl: 'pay-now.html',
    providers: [RequestService]
})

export class PayNowModel implements ModalComponent<PayNowContext> {
    context: PayNowContext;
    amount;
    reason;
    success = false;
    error = false;
    alertMessage = "";
    ccname = "";
    ccnumber = "";
    _timer: any;
    
    constructor(public _requestervice: RequestService,
        private broadcaster: Broadcaster,
        public dialog: DialogRef<PayNowContext>) {
        this.context = dialog.context;
        this.amount = "";
        this.reason = "";
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
    closeModel() {
        this.dialog.close();
    }
    close(){
        this.dialog.close();
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

}
