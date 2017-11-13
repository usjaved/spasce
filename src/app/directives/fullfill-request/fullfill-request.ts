import { Component, Input } from '@angular/core';
import { FlagService } from '../../graphqls/services/flag';
import { BSModalContext, Modal } from 'ngx-modialog/plugins/bootstrap';
import { ModalComponent, DialogRef } from 'ngx-modialog';
import { Broadcaster } from '../../utility/broadcaster';
import { LoginComponent } from '../../modules/login/login.component';
import { SpacesService } from '../../graphqls/services/space';
import { RequestService } from '../../graphqls/services/request';

export class FlagComponentcontext extends BSModalContext {
    public requestId: String;
}

@Component({
    selector: 'fullfill-request',
    templateUrl: 'fullfill-request.html'
})

export class FullFillComponent implements ModalComponent<FlagComponentcontext> {
    context: FlagComponentcontext;
    flagReason: any;
    requestId: String;
    success = false;
    error = false;
    alertMessage = "";
    _timer: any;
    approvedSpaces: any = [];
    showSpaces = false;
    spaceLink = "";
    description = "";
    constructor(
        private broadcaster: Broadcaster,
        public modal: Modal,
        private _spaceService: SpacesService,
        private _requestService : RequestService,
        public dialog: DialogRef<FlagComponentcontext>) {
        this.context = dialog.context;
        this.flagReason = "";
    }

    ngOnInit() {
        this.getSpaces();
    }
    getSpaces(){

        var data: any;
        data = {};
        data.userId = localStorage.getItem("loginUserId");
        this._spaceService.getUsersActiveSpace(data).subscribe(res =>{
            this.approvedSpaces = res.data.getApprovedSpace.map((item) => { return Object.assign({}, item, { isSelected: false });   });
        })
    }
    submitSpaces() {

      /*  if(!this.spaceLink){
            this.messageAlert('error', 'Please copy and paste your sapce link');
            return;
        } */

        var pattern = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}[:\d]?/;
        /*if(!pattern.test(this.spaceLink)){
            this.messageAlert('error', 'Please enter valid link');
            return;
        } */

       /* if(this.spaceLink.indexOf(window.location.host) == -1){
            this.messageAlert('error', 'You can not add external url..');
            return;
        }
        
        if(!this.description){
            this.messageAlert('error', 'Please enter description');
            return;
        } */
        

        var data: any;
        data = {spacsesId : [] };
        for(var i = 0; i < this.approvedSpaces.length; i++){
            if(this.spaceLink.indexOf(this.approvedSpaces[i]._id) != -1){
                data.spacsesId.push(this.approvedSpaces[i]._id);
            }
            if(this.approvedSpaces[i].isSelected){
                data.spacsesId.push(this.approvedSpaces[i]._id);
            }
        }
        if (data.spacsesId.length == 0) {
            this.messageAlert('error', 'Please verify your space url');
        }
        else {
            data.userId = localStorage.getItem("loginUserId");
            data.requestId = this.context.requestId;
            data.spaceLink = this.spaceLink;
            data.description = this.description;
            
            this._requestService.submitSpaces(data).subscribe(res => {
                this.messageAlert('sucess', 'Your spaces has been delivered');
            }, err =>{
                this.messageAlert('error', 'Please try again!!!');
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
            this.close();
        }, 3000);
    }
    chooseExisting(){
        this.showSpaces = true;
    }
    selectSpace(item){
        item.isSelected = !item.isSelected;
    }
}
