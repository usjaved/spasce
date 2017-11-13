import { Component, OnInit } from "@angular/core";
import { UserService } from '../../../graphqls/services/user';
import { getAccountSetting } from '../../../graphqls/queries/user';
import { Broadcaster } from '../../../utility/broadcaster';

@Component({
  selector: "user-account",
  templateUrl: "./account.component.html"
})

export class AccountComponent implements OnInit {

  recievesms = false;
  generalandpromotional = false;
  reservationandreview = false;
  accountacivity = false;
  userId;
  accountsetting = "";
  success = false;
  error = false;
  loading = false;
  alertMessage = "";
  _timer: any;


  constructor(private _userService: UserService,
    private broadcaster: Broadcaster,
  ) {
    this.userId = localStorage.getItem("loginUserId");
  }
  messageAlert(type, message) {
    if (type == "error") {
      this.showError(message)
    }
    else if (type == "loading") {
      this.showloading(message);
    }
    else if (type == "hideLoader") {
      this.showloading(message);
    }
    else {
      this.showSuccess(message);
    }
  }
  showError(message) {
    this.loading = false;
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
    this.loading = false;
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
  showloading(message) {
    this.loading = true;
    this.success = false;
    this.error = false;
    this.alertMessage = message;
  }

  hideloader(message) {
    this.loading = false;
  }


  ngOnInit() {
    this._userService.getAccountSetting(this.userId).subscribe(res => {
      this.accountsetting = res.data.user.accountsetting;
      this.recievesms = res.data.user.accountsetting.smsNotification == "true" ? true : false;
      this.generalandpromotional = res.data.user.accountsetting.generalNotification == "true" ? true : false;
      this.reservationandreview = res.data.user.accountsetting.reservationNotification == "true" ? true : false;
      this.accountacivity = res.data.user.accountsetting.accountNotification == "true" ? true : false;
    });
  }

  saveChanges() {
    this.messageAlert("loading", "Loading");
    var data: any;
    data = {};
    data.userId = this.userId;
    data.recievesmsNotification = this.recievesms;
    data.generalNotification = this.generalandpromotional;
    data.reservationNotification = this.reservationandreview;
    data.accountactivityNotification = this.accountacivity;

    this._userService.createUserAccountSetting(data).subscribe(res => {
      this.messageAlert("hideLoader", "hideloader");
      if (res.data.createUserAccountSetting.code == '200') {
        this.messageAlert('success', res.data.createUserAccountSetting.message);
      }
    });
  }
}
