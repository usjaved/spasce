import { ReviewsComponent } from '../../../directives/reviews/reviews';
import { AlertComponent } from './../../../directives/alert/alert.component';
import { Component, OnInit } from "@angular/core";
import { UserService } from '../../../graphqls/services/user';
import { ContactToHostComponent } from '../../../directives/contact-to-host/contact-to-host.component';
import { overlayConfigFactory, Modal } from 'ngx-modialog';
import { Broadcaster } from '../../../utility/broadcaster';
import { BSModalContext } from 'ngx-modialog/plugins/bootstrap';
import { Http } from '@angular/http';

@Component({
  selector: "user-bookings",
  templateUrl: "./bookings.component.html"
})

export class BookingsComponent implements OnInit {

  space = [];
  review = [];
  userId : String;
  success = false;
  error = false;
  isLoading = false;
  loading =false;
  alertMessage = "";
  _timer: any;
  showrate = true;
  constructor(private _userservice: UserService,
    public http: Http,
    private _broadcast: Broadcaster, private modal: Modal) {
    this.userId = localStorage.getItem('loginUserId');
   }

  ngOnInit() {
        this.getbookings();
   }
  getbookings()
  {
    this._userservice.getUserSpacseBooking(this.userId).subscribe(res => {
      this.space = res.data.user.bookings;
    });

   /* this._userservice.getReview(this.userId).subscribe(res => {
      this.review =res.data.user.reviews;
     });

     for(let i=0;i<this.space.length;i++){
       for(let j=0;j<this.review.length;j++){
            if(this.review[j].bookingId == this.space[i]._id && this.showrate == false){
              this.showrate =false;
            }
            else{
              this.showrate=true;
            }
       }
     }*/
   }
  openHostModal(id) {
    if (localStorage.getItem("loginUserId")) {
      var dialog = this.modal.open(ContactToHostComponent, overlayConfigFactory({ "spacseId": id }, BSModalContext));
    }
    else {
      this._broadcast.broadcast("loginOpen", "login");
    }
  }

  openreviewModal(spacseId,bookingId) {
    if (localStorage.getItem("loginUserId")) {
      var dialog = this.modal.open(ReviewsComponent, overlayConfigFactory({ "spacseId": spacseId ,"userId":this.userId,"bookingId":bookingId}, BSModalContext));
    }
    else {
      this._broadcast.broadcast("loginOpen", "login");
    }
  }

  



  confirmNow(item) {

    var dialog = this.modal.open(AlertComponent, overlayConfigFactory({
      "message": "Are you sure you want to confirm the booking, it will charge $ " + item.amount + " from your bank account",
      "yes": "Yes",
      "no": "No"
    }, BSModalContext)).then((resultPromise) => {
      resultPromise.result.then((result) => {
        if (result == "Yes") {
          this.updateStatus(item, "Paid");
        } else if (result == "No") {
          this.updateStatus(item, "Cancel");
        }
      }).catch(err => {

      });
    });

  }
  updateStatus(item, status) {
    var data: any = {};
    data.id = item._id;
    data.status = status;
    this.isLoading = true;
    this.http.post(localStorage.getItem("webUrl") + "/book-confirm", data).subscribe(res => {
      this.isLoading = false;
      if (res.status == 200) {
        this.messageAlert("success", "Booking registered!!")
      }
    }, err => {
      this.isLoading = false;
      this.messageAlert("error", "Please try again!!")
    })
  }
  payNow(item){
    var handler = (<any>window).StripeCheckout.configure({
      key: "pk_test_IPMpTb9d1TUz5rpKV1AzivHV",
      locale: 'auto',
        token: (token: any) => {
            this.processPayment(token, item);
        }
    });
    this.messageAlert("hideLoader", "Loading");
    handler.open({
        name: 'Booking Payment.',
        amount: item.amount
    });
  }

  processPayment(token, item) {
    this.messageAlert("loading", "Loading");
    var data: any;
    data = {};
    data.userId = localStorage.getItem("loginUserId");
    data.amount = item.amount;
    data.token = token.id;
    data.id = item._id;
    this.http.post(localStorage.getItem("webUrl") + "/pay-for-booking", data ).subscribe(res => {
         this.messageAlert("hideLoader", "Loading");
           if(res.status == 200){
                this.messageAlert("success", "Booking registered!!")       
           }
    }, err => {
        this.messageAlert("hideLoader", "Loading");
        this.messageAlert("error", "Please try again!!")
    })
   /* this._spaceService.bookSpacse(data).subscribe(res => {
        debugger;
    }, error => {

    }); */
}
  messageAlert(type, message) {
    if (type == "error") {
      this.showError(message)
    } else if (type == "loading") {
      this.showloading(message);
    }
    else if (type == "hideLoader") {
      this.showloading(message);
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
  showloading(message) {
    this.loading = true;
    this.success = false;
    this.error = false;
    this.alertMessage = message;
  }

  hideloader(message) {
    this.loading = false;
  }
}
