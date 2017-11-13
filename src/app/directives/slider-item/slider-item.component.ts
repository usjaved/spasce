import { RequestService } from '../../graphqls/services/request';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Broadcaster } from '../../utility/broadcaster';
import { Router } from '@angular/router';
import { routes } from '../../modules/user/user.routes';

@Component({
  selector: "slider-item",
  templateUrl: "./slider-item.component.html"
})

export class SliderItemComponent implements OnInit, OnDestroy {

  @Input() request: any;
  userId: String;
  constructor(private _requestservice: RequestService,
    private broadcaster: Broadcaster,
    private routes: Router) {
    this.userId = localStorage.getItem("loginUserId");
  }

  ngOnInit() {

  }

  requestcounter() {
    if (this.userId) {
      var data: any;
      data = {};
      data.requestId = this.request._id;
      data.userId = this.userId;
      this._requestservice.updateRequestCounter(data).subscribe(res => {
        console.log(res);
        debugger;
      })
    }
  }

  ngOnDestroy() {


  }

  sendmessage() {
    if (localStorage.getItem("loginUserId")) {
      this.routes.navigate(['/user/message']);
    }
    else {
      this.broadcaster.broadcast("loginOpen", "login");
    }
  }
}
