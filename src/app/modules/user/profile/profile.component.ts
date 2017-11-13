import { UserService } from './../../../graphqls/services/user';
import { Component, OnInit } from "@angular/core";
import { Broadcaster } from '../../../utility/broadcaster';


@Component({
  selector: "user-profile",
  templateUrl: "./profile.component.html"
})

export class ProfileComponent implements OnInit {
  
  profilePic;
  uploadedFile;
  user: any;
  success = false;
  error = false;
  alertMessage = "";
  _timer: any;
  constructor(
    private _userService: UserService,
    private broadcaster: Broadcaster,
    
  ) { 
    this.profilePic= localStorage.getItem("serverPath") + "/uploads/person-img5.png"
    this.uploadedFile  = [];
    this.user = {};
    this.getProfileInfo();
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

  getProfileInfo(){
    var userId = localStorage.getItem("loginUserId");
    this._userService.getUserProfile(userId).subscribe(res => {
      for (var key in res.data.user) {
        if (res.data.user.hasOwnProperty(key)) {
          this.user[key] =  res.data.user[key];
        }
      }
      if(this.user.profilePic){
        this.profilePic = this.user.profilePic;
      }
    }, err => {

    })
  }
  getUploadeImage(){
    if(this.uploadedFile.length){
      if(this.uploadedFile[this.uploadedFile.length - 1][this.uploadedFile[this.uploadedFile.length - 1].length - 1].response){
        if(this.profilePic = this.uploadedFile[this.uploadedFile.length - 1][this.uploadedFile[this.uploadedFile.length - 1].length - 1].response){
          this.profilePic = this.uploadedFile[this.uploadedFile.length - 1][this.uploadedFile[this.uploadedFile.length - 1].length - 1].response.path
          this.user.profilePic = this.profilePic;
        }
       }
      return this.profilePic;
    }
    return this.profilePic;
    
   
}
  ngOnInit() {

  }
  updateProfile(){
    
    this._userService.updateUser(this.user).subscribe(res => {
      this.messageAlert('success', res.data.updateUser.message);
     

    }, err => {

    }) 
  }
}
