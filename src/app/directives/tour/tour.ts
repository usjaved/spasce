import { Component, Input } from '@angular/core';
import { BSModalContext } from 'ngx-modialog/plugins/bootstrap';
import { ModalComponent, DialogRef } from 'ngx-modialog';
import { RequestService } from '../../graphqls/services/request';
import { DateModel } from 'ng2-datepicker';
import { Broadcaster } from '../../utility/broadcaster';

export class TourComponentcontext extends BSModalContext {
    public requestId: String;
}

@Component({
    selector: 'tour',
    templateUrl: 'tour.html',
    providers: [RequestService]
})

export class TourComponent implements ModalComponent<TourComponentcontext> {
    context: TourComponentcontext;
    date: DateModel;
    startTime;
    endTime;
    success = false;
    error = false;
    alertMessage = "";
    _timer: any;
    constructor(public _requestervice: RequestService,
        private broadcaster: Broadcaster,
        public dialog: DialogRef<TourComponentcontext>) {
        this.context = dialog.context;
        this.startTime = "";
        this.endTime = "";
    }


    bookATour() {


        if (!this.date.formatted) {
            this.messageAlert('error','Please enter date');
            return false;
        }
        if (!this.startTime) {
        this.messageAlert('error','Please enter start time')
            return false;
        }
        if (!this.endTime) {
            this.messageAlert('error','Please enter end time')
            return false;
        }
        var data: any;
        data = {};
        data.userId = localStorage.getItem("loginUserId");
        data.requestId = this.context.requestId
        data.tourDate = this.date.formatted;
        data.startTime = this.startTime;
        data.endTime = this.endTime;
        this._requestervice.tourRequest(data).subscribe(res => {
            this.dialog.close(res.data.createSpacseTour._id);
        }, error => {

        }); 
    }
    closeModel() {
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
