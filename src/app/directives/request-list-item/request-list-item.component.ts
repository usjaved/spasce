import { FullFillComponent } from './../fullfill-request/fullfill-request';
import { RequestService } from '../../graphqls/services/request';
import { Component, OnInit, Input } from "@angular/core";
import { Modal, BSModalContext } from 'ngx-modialog/plugins/bootstrap';
import { Overlay, overlayConfigFactory } from 'ngx-modialog';
import { FlagComponent } from '../flag/flag.component';
import { LoginComponent } from '../../modules/login/login.component';
import { Broadcaster } from '../../utility/broadcaster';

@Component({
  selector: "request-list-item",
  templateUrl: "./request-list-item.component.html",
  providers: [Modal]

})

export class RequestListItemComponent implements OnInit {
  @Input() itemDetail: any;
  @Input() userId: String;
  showCommentBox;
  showMesseges;
  unReadMessageCount = 0;
  constructor(public modal: Modal,
    private _requestservice: RequestService,
    private broadcaster: Broadcaster
  ) {
    this.showCommentBox = false;
    this.showMesseges = false;
  }

  ngOnInit() {
    this.unReadMessageCount = this.itemDetail.unReadMessageCount;
  }
  toggleCommentBox() {
    this.showCommentBox = !this.showCommentBox;
    if (this.showMesseges = true) {
      this.showMesseges = !this.showMesseges;
    }
  }
  showMessegeBox() {
    if (localStorage.getItem("loginUserId") == this.itemDetail.userId) {
      this.showMesseges = !this.showMesseges;
      this.showCommentBox = false;
      this.clearReadCount()
    } else if (this.itemDetail.spaces.length > 0) {
      this.showMesseges = !this.showMesseges;
      this.showCommentBox = false;
      this.clearReadCount()
    } else if (localStorage.getItem("loginUserId")) {
      var dialog = this.modal.open(FullFillComponent, overlayConfigFactory({ "requestId": this.itemDetail._id }, BSModalContext));
    }
    else {
      this.broadcaster.broadcast("loginOpen", "login");
    }
  }
  messgaeTitle() {
    if (localStorage.getItem("loginUserId") == this.itemDetail.userId) {
      return "View Messages"
    } else if (this.itemDetail.spaces.length > 0) {
      return "View Messages"
    } else if (localStorage.getItem("loginUserId")) {
      return  "Fulfill this request"
    }
    else {
      return  "Fulfill this request"
    }
  }

  openFlagModal(id) {
    if (localStorage.getItem("loginUserId")) {
      var dialog = this.modal.open(FlagComponent, overlayConfigFactory({ "flagId": id, "type": "For Request" }, BSModalContext));
    }
    else {
      this.broadcaster.broadcast("loginOpen", "login");
    }
  }
  requestcounter() {
    if (localStorage.getItem("loginUserId")) {
      var data: any;
      data = {};
      data.requestId = this.itemDetail._id;
      data.userId = localStorage.getItem("loginUserId")
      this._requestservice.updateRequestCounter(data).subscribe(res => {
        console.log(res);
      })
    }
  }

  clearReadCount(){
    
    var data : any = {};
    data.requestId = this.itemDetail._id;
    data.userId = localStorage.getItem("loginUserId");
    this._requestservice.clearReadCount(data).subscribe(res => {
      this.unReadMessageCount = 0;
    });
  }

}
