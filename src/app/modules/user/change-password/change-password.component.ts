import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../graphqls/services/user';
import { Broadcaster } from '../../../utility/broadcaster';
import { Router } from '@angular/router';

@Component({
    selector: 'change-password',
    templateUrl: 'change-password.component.html',
})
export class ChangePasswordComponent implements OnInit {

    oldpassword;
    newpassword;
    confirmpassword;
    success = false;
    error = false;
    alertMessage = "";
    _timer: any;
    userId
    constructor(private _userservice: UserService,
        private broadcaster: Broadcaster,
        private router: Router,
    ) 
    {
      this.userId = localStorage.getItem('loginUserId');
      // if(!this.userId){
      //   this.router.navigate(['/']);
      // }
    }
    ngOnInit() {
      if (!this.userId) {
        this.router.navigate(['/']);
      }
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
  

    updatePassword() {
        var data: any;
        data = {};

        if (this.newpassword != this.confirmpassword) {
              this.messageAlert('error','password and confirm password not match');
        }

        data.userId = localStorage.getItem("loginUserId")
        data.oldpassword = this.oldpassword;
        data.newpassword = this.newpassword;
        data.confirmpassword = this.confirmpassword;

        this._userservice.updatePassword(data).subscribe(res => {
            if(res.data.updatePassword.code=='200')
            {
              this.messageAlert('success',res.data.updatePassword.message);
            }
            else
            {
                this.messageAlert('error',res.data.updatePassword.message);
            }
        })
            
     
    }


}
