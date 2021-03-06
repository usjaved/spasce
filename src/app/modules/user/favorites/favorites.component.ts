import { Router } from '@angular/router';
import { Component, OnInit } from "@angular/core";
import { UserService } from '../../../graphqls/services/user';

@Component({
  selector: "user-favorites",
  templateUrl: "./favorites.component.html"
})

export class FavoritesComponent implements OnInit {

  userId: String;
  data = [];
  success = false;
  error = false;
  loading = false;
  alertMessage = "";
  _timer: any;
  like =false;
  constructor(private _userService: UserService,
    private router: Router,) {
    this.userId = localStorage.getItem("loginUserId");
    // if(!this.userId){
    //   this.router.navigate(['/']);
    // }
  }

  ngOnInit() {
    this.getFavourites();
    if(this.data.length>0)
    {
      this.like =true;
    }
  }

  messageAlert(type, message) {
    if (type == "error") {
      this.showError(message)
    }
    else if (type == "loading") {
      this.showloading(message);
    }
    else if (type == "hideLoader") {
      this.hideloader(message);
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

  getFavourites() {
    this.messageAlert("loading", "Loading");

    var data = { "userId" : this.userId }; 
    this._userService.getUserFavouriteSpacses(data).subscribe(res => {
    //  this.messageAlert("hideLoader", "hideloader");
      this.data = res.data.user.favourites;
      this.loading = false;
    });

  }

}
