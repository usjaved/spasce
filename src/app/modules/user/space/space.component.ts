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
  constructor(private _spaceService: SpacesService) { 

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
