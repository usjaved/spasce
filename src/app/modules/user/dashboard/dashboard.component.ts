import { Router } from '@angular/router';
import { PagerService } from './../../../utility/pagination';
import { Component, OnInit } from "@angular/core";
import { SpacesService } from '../../../graphqls/services/space';
import { UserService } from '../../../graphqls/services/user';
import { AlertComponent } from '../../../directives/alert/alert.component';
import { Modal, BSModalContext } from 'ngx-modialog/plugins/bootstrap';
import { overlayConfigFactory } from 'ngx-modialog';

@Component({
  selector: "user-dashboard",
  templateUrl: "./dashboard.component.html"
})

export class DashboardComponent implements OnInit {

  images;
  statistics;
  booking;
  listing;
  calender;
  userId;
  data;
  total;
  monthly;
  lastmonth;
  yearly;
  approvedSpaces: any = [];
  pendingSpaces: any = [];
  inProcessSpaces: any = [];
  bookings = [];
  bookingStatastics = [];
  pager: any = {};
  pagedItems: any = [];
  constructor(
    private _spaceService: SpacesService,
    private _userservice: UserService,
    private pagerService: PagerService,
    private router: Router,
    public modal: Modal
  ) {
    this.images = [];
    this.images.push('/assets/images/art-img1.jpg');
    this.images.push('/assets/images/art-img2.jpg');
    this.images.push('/assets/images/art-img3.jpg');

    this.statistics = true;
    this.calender = false;
    this.booking = false;
    this.listing = false;
    this.userId = localStorage.getItem('loginUserId');
    // if(!this.userId){
    //   this.router.navigate(['/']);
    // }
  }

  ngOnInit() {

    if (!this.userId) {
      this.router.navigate(['/']);
    }else{
      this.getspacseoffer();
      this.getstatistics()
      this.getListings();
    }
  }
  showStatistics() {
    this.statistics = true;
    this.calender = false;
    this.booking = false;
    this.listing = false;
  }

  showBookings() {
    this.statistics = false;
    this.calender = false;
    this.listing = false;
    this.booking = true;

  }
  showListings() {
    this.statistics = false;
    this.calender = false;
    this.booking = false;
    this.listing = true;
  }
  showCalendar() {
    this.statistics = false;
    this.booking = false;
    this.listing = false;
    this.calender = true;
  }
  getListings() {
    var data = { "userId": localStorage.getItem("loginUserId") }
    this._spaceService.usersListing(data).subscribe(res => {
      this.inProcessSpaces = res.data.getInProcessSpace;
      this.approvedSpaces = res.data.getApprovedSpace;
      this.pendingSpaces = res.data.getPendingSpace;
    })

    this._spaceService.getSpacebookings(data).subscribe(res => {
      this.bookings = res.data.getSpacebookings.map((item) => { return Object.assign({}, item); });
      this.bookingStatastics = res.data.getBookingStatistics;
      this.setPage(1);
    })

  }
  getImage(item) {
    if (item.coverPictire) {
      return item.coverPictire;
    } else {
      return "uploads/no-image.png";
    }
  }
  getspacseoffer() {
    this._userservice.getUserSpacseOffers(this.userId).subscribe(res => {
      this.data = res.data.user.spacseOffers;
    });
  }
  getstatistics() {
    this.data = {};
    this._userservice.getUserStatistics(this.userId).subscribe(res => {
      this.total = res.data.getStatistics;
      this.monthly = res.data.getStatisticsByMonth;
      this.lastmonth = res.data.getStatisticsByLastMonth;
      this.yearly = res.data.getStatisticsByYear;
      console.log("total" + this.total);
      console.log("month" + this.monthly);
      console.log("year" + this.yearly);
      console.log("lastmonth" + this.lastmonth);
    })
  }



  setPage(page: number) {

    if (!this.pager) {
      this.pager = this.pagerService.getPager(this.bookings.length, 1);
    }
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.pagerService.getPager(this.bookings.length, page, 5);
    this.pagedItems = this.bookings.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
  approveStatus(item) {
    if (item.status == "Pending") {
      var dialog = this.modal.open(AlertComponent, overlayConfigFactory({
        "message": "What you want to do with this booking request ?",
        "yes": "Accept Booking",
        "no": "Reject Booking"
      }, BSModalContext)).then((resultPromise) => {
        resultPromise.result.then((result) => {
          if (result == "Accept Booking") {
            this.updateStatus(item, "Accepted");
          } else if (result == "Reject Booking") {
            this.updateStatus(item, "Rejected");
          }
        }).catch(err => {

        });
      });
    }
  }
  updateStatus(item, status) {

    var data: any = {};
    data.id = item._id;
    data.status = status;
    this._spaceService.updateBookingStatus(data).subscribe(res => {
      item.status = status
    }, err => {

    })

  }
}
