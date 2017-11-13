import { Component, Input } from '@angular/core';
import { FlagService } from '../../graphqls/services/flag';
import { BSModalContext, Modal } from 'ngx-modialog/plugins/bootstrap';
import { ModalComponent, DialogRef } from 'ngx-modialog';
import { Broadcaster } from '../../utility/broadcaster';
import { LoginComponent } from '../../modules/login/login.component';

export class AlertComponentcontext extends BSModalContext {
    public message: any;
    public yes : string;
    public no : string;
}

@Component({
    selector: 'alert',
    templateUrl: 'alert.component.html'
})

export class AlertComponent implements ModalComponent<AlertComponentcontext> {
    context: AlertComponentcontext;
    message: any;
    yesButton : string;
    noButton : string;
    constructor(
        private broadcaster: Broadcaster,
        public modal: Modal,
        public dialog: DialogRef<AlertComponentcontext>) {
        this.context = dialog.context;
        this.message = this.context.message;
        this.yesButton = this.context.yes;
        this.noButton = this.context.no;
    }
    yes() {
        this.dialog.close(this.yesButton);
    }

    no() {
        this.dialog.close(this.noButton);
    }
}
