import { Component, Input } from '@angular/core';
import { FlagService } from '../../graphqls/services/flag';
import { BSModalContext, Modal } from 'ngx-modialog/plugins/bootstrap';
import { ModalComponent, DialogRef } from 'ngx-modialog';
import { Broadcaster } from '../../utility/broadcaster';
import { LoginComponent } from '../../modules/login/login.component';

export class FlagComponentcontext extends BSModalContext {
    public flagId: String;
    public type: String;
}

@Component({
    selector: 'flag',
    templateUrl: 'flag.component.html',
    providers: [FlagService]
})

export class FlagComponent implements ModalComponent<FlagComponentcontext> {
    context: FlagComponentcontext;
    flagReason: any;
    requestId: String;
    success = false;
    error = false;
    alertMessage = "";
    _timer: any;
    constructor(public _flagservice: FlagService,
        private broadcaster: Broadcaster,
        public modal: Modal,
        public dialog: DialogRef<FlagComponentcontext>) {
        this.context = dialog.context;
        this.flagReason = ""
    }

    addFlag() {
        var data: any;
        data = {};
        if (!this.flagReason) {
            this.messageAlert('error', 'Select FlagReasons');
        }
        else {
            data.userId = localStorage.getItem("loginUserId");
            data.flagId = this.context.flagId;
            data.type = this.context.type;
            data.flagReason = this.flagReason;
            this._flagservice.createRequestFlag(data).subscribe(res => {
                this.dialog.close(res.data.createRequestFlag._id);
            })
        }
    }
    close() {
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
