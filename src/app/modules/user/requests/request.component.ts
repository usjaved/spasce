import { UserService } from '../../../graphqls/services/user';
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "user-request",
  templateUrl: "./request.component.html"
})

export class RequestComponent implements OnInit {
  listItems = [];
  userId;


  constructor(private _userservice: UserService) {
    this.userId = localStorage.getItem("loginUserId");
  }

  ngOnInit() {
      this._userservice.getUserRequests(this.userId).subscribe(res => {
      this.listItems = res.data.userRequests;
    });

  }
}
