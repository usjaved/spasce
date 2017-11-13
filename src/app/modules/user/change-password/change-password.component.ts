import { Component } from '@angular/core';
import { UserService } from '../../../graphqls/services/user';
import { Broadcaster } from '../../../utility/broadcaster';

@Component({
    selector: 'change-password',
    templateUrl: 'change-password.component.html',
})
export class ChangePasswordComponent {

    oldpassword;
    newpassword;
    confirmpassword;
    success = false;
    error = false;
    alertMessage = "";
    _timer: any;


    constructor(private _userservice: UserService,
        private broadcaster: Broadcaster,
    ) 
    {

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
