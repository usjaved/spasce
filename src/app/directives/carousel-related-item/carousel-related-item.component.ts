import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { UserService } from '../../graphqls/services/user';
import { Broadcaster } from '../../utility/broadcaster';

@Component({
    selector: "carousel-related-item",
    templateUrl: "./carousel-related-item.component.html"
})

export class CarouselRelatedItem implements OnInit, OnDestroy {

    userId: String;
    like = false;
    @Input() space: any;
    constructor(private _userservice: UserService, private _broadcast: Broadcaster) {
        this.userId = localStorage.getItem("loginUserId");
    }

    ngOnInit() {
        if(this.space.favourites && this.space.favourites.length >= 1){
            this.like = true;
        }
    }
    ngOnDestroy() {

    }

    add() {
        var data: any;
        data = {};
        data.userId = this.userId;
        data.spacseId = this.space._id;
        console.log(data);
        this._userservice.createUserFavouriteSpacse(data).subscribe(res => {
            if (res.data.createFavourite.code == "200") {
                this.like = true
            }
            else {
                this.like = false;
            }
        });
    }

}
