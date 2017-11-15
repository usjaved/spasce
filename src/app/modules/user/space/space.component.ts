import { Router } from '@angular/router';
import { Component, OnInit } from "@angular/core";
import { SpacesService } from '../../../graphqls/services/space';

@Component({
  selector: "user-space",
  templateUrl: "./space.component.html"
})

export class UserSpaceComponent implements OnInit {
  
  inProcessSpaces: any = [];
  approvedSpaces: any = [];
  pendingSpaces: any = [];
  userId
  constructor(private _spaceService: SpacesService,
    private router: Router) { 
    this.userId = localStorage.getItem("loginUserId");
    // if(!this.userId){
    //   this.router.navigate(['/']);
    // }
  }

  ngOnInit() {
    this.getListings();
  }

  getListings() {
    var data = { "userId": localStorage.getItem("loginUserId") }
    this._spaceService.usersListing(data).subscribe(res => {
    //  this.inProcessSpaces = res.data.getInProcessSpace;
      this.approvedSpaces = res.data.getApprovedSpace;
   //   this.pendingSpaces = res.data.getPendingSpace;
    })
  }
  getImage(item) {
    if (item.coverPictire) {
      return item.coverPictire;
    } else {
      return "uploads/no-image.png";
    }
  }
}
