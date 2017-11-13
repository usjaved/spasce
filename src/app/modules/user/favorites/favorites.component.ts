import { Component, OnInit } from "@angular/core";
import { UserService } from '../../../graphqls/services/user';

@Component({
  selector: "user-favorites",
  templateUrl: "./favorites.component.html"
})

export class FavoritesComponent implements OnInit {
  
  userId: String;
  data = [];
  constructor(private _userService: UserService) { 
    this.userId= localStorage.getItem("loginUserId")
}

  ngOnInit() {
    this.getFavourites();
  }
  getFavourites()
  {
    
    this._userService.getUserFavouriteSpacses(this.userId).subscribe(res => {
      console.log(res);
            this.data=res.data.user.favourites;
    });
    
  }
  
}
