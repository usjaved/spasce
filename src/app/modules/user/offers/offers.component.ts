import { Router } from '@angular/router';
import { PagerService } from './../../../utility/pagination';
import { Component, OnInit } from "@angular/core";
import { SpacesService } from '../../../graphqls/services/space';
import { UserService } from '../../../graphqls/services/user';
import { AlertComponent } from '../../../directives/alert/alert.component';
import { Modal, BSModalContext } from 'ngx-modialog/plugins/bootstrap';
import { overlayConfigFactory } from 'ngx-modialog';

@Component({
  selector: "user-offers",
  templateUrl: "./offers.component.html"
})

export class OffersComponent implements OnInit {

  offers = [];
  userId;
  constructor(
    private _spaceService: SpacesService,
    private _userservice: UserService,
    private pagerService: PagerService,
    private router: Router,
    public modal: Modal
  ) {
   
    this.userId = localStorage.getItem('loginUserId');
   
  }

  ngOnInit() {

    if (!this.userId) {
      this.router.navigate(['/']);
    }else{
      this.getspacseoffer();
     
    }
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
      this.offers = res.data.user.spacseOffers;
    });
  }
}
