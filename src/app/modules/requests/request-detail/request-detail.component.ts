import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from '../../../graphqls/services/request';
import { Modal, BSModalContext } from 'ngx-modialog/plugins/bootstrap';
import { Overlay, overlayConfigFactory } from 'ngx-modialog';
import { FlagComponent } from '../../../directives/flag/flag.component';
import { Broadcaster } from '../../../utility/broadcaster';

@Component({

    selector: 'request-detail',
    templateUrl: 'request-detail.component.html',
    providers: [Modal]

})

export class RequestDetailComponent {

    requestId: any; 
    request: any;
    isLoading = false;
   


    showMesseges = false;
    showCommentBox = true;
    constructor(private route: ActivatedRoute,
        public modal: Modal,
        private broadcaster: Broadcaster,
        private _requestService: RequestService) {
        this.route.params.subscribe(params => {
            this.requestId = params['id'];
        });
        this.request = [];
    }
  
    public ngOnInit() {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        var data = { loginUserId: localStorage.getItem("loginUserId"), id: this.requestId };
        this._requestService.getRequestDetail(data).subscribe(data => {

            this.request = data.data.request;
            this.isLoading = true;
        })

    }
    openFlagModal(id) {
        if(localStorage.getItem('loginUserId'))
        {
            var dialog = this.modal.open(FlagComponent, overlayConfigFactory({ "requestId": id }, BSModalContext));
         }
         else
         {
            this.broadcaster.broadcast("loginOpen", "login");
         }
    }
    showComments() {
        this.showCommentBox = true;
        this.showMesseges = false;
    }
    showMessage() {
        this.showMesseges = true;
        this.showCommentBox = false;
    }
    
}
