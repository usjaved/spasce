import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../../../graphqls/services/user';
import { Component, OnInit } from "@angular/core";
import { Broadcaster } from '../../../utility/broadcaster';


@Component({
  selector: "user-publicprofile",
  templateUrl: "./publicprofile.component.html"
})

export class PublicProfileComponent {

  profilePic;
  uploadedFile;
  spacse = [];
  user: any;
  success = false;
  error = false;
  submittedReview  = [];
  recievedReview  = [];
  alertMessage = "";
  _timer: any;
  userId
  constructor(
    private _userService: UserService,
    private broadcaster: Broadcaster,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.profilePic = localStorage.getItem("serverPath") + "/uploads/person-img5.png"
    this.uploadedFile = [];
    this.user = {};

    this.route.params.subscribe(params => {
      this.userId = params['id'];
      this.getProfileInfo();
    });
  }
  getProfileInfo() {

    this._userService.userPublicInfoProfile(this.userId).subscribe(res => {
      this.spacse  = res.data.getApprovedSpace;
      this.submittedReview = res.data.submittedReviews;
      this.recievedReview = res.data.receivedReview;
      for (var key in res.data.user) {
        if (res.data.user.hasOwnProperty(key)) {
          this.user[key] = res.data.user[key];
        }
      }
      if (this.user.profilePic) {
        this.profilePic = this.user.profilePic;
      }
    }, err => {

    })
  }
  getImage(item) {
    if (item.coverPictire) {
      return item.coverPictire;
    } else {
      return "uploads/no-image.png";
    }
  }
  timeToDate(createdAt){
    if(createdAt){
        var  createdAt;
        let now = new Date();
        now.setTime(parseInt(createdAt));
        return "Joined in " + now.toLocaleString( "en-us" , {month: "long"}) + " " + now.getFullYear()
    }
    
}
}
