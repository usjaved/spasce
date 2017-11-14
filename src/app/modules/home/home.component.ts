import { MapsAPILoader } from '@agm/core';
import { SpacesService } from '../../graphqls/services/space';
import { UsersService } from './users.service';
import { FormControl } from '@angular/forms';
import { UsersInterface } from './graphql/schema';
import { Component, OnInit, Input, Output, ElementRef, ViewChild, NgZone } from '@angular/core';
import { ApolloQueryObservable } from 'apollo-angular';
import { Subject } from 'rxjs/Subject';
import { RequestService } from '../../graphqls/services/request';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { Broadcaster } from '../../utility/broadcaster';

@Component({
    selector: 'home',  // <home></home>
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
    private noLoopSlides: boolean = true;
    public spaces: any;
    public eventSpaces: any;
    public creativeSpaces: any;
    public requests: any;
    public listPostFilter: string;
    @ViewChild("search")
    public searchElementRef: ElementRef;
    categories = [];
    addressConponent: any = {};
    location = "";
    category = ""
    filters = [];
    constructor(private _requestService: RequestService,
        public mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone,
        private router: Router,
        public modal: Modal,
        private _spaceService: SpacesService,
        private _broadcaster: Broadcaster, ) {

    }

    public ngOnInit() {

        this.mapsAPILoader.load().then(() => {
            let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                types: ["geocode"]
            });
            autocomplete.addListener("place_changed", () => {
                this.ngZone.run(() => {
                    for (var i = 0; i < this.filters.length; i++) {
                        if (this.filters[i].type == "location") {
                            this.filters.splice(i, 1);
                        }
                    }
                    let place: google.maps.places.PlaceResult = autocomplete.getPlace();
                    if (place.geometry === undefined || place.geometry === null) {
                        this.location = this.addressConponent.administrative_area_level_1 + ", " + this.addressConponent.country;
                        return;
                    }

                    this.addressConponent = [];
                    var filterName = [];
                    place.address_components.forEach(element => {
                        this.addressConponent[element.types[0]] = element.long_name;
                    });

                });
            });
        });

        var data = { loginUserId: localStorage.getItem("loginUserId") }
        this._spaceService.getHomePageDetails(data).subscribe(data => {
            this.spaces = data.data.getTopRatedSpaces;
            this.creativeSpaces = data.data.getTopCreativeSpaces;
            this.eventSpaces = data.data.getTopEventSpaces;
            this.requests = data.data.requests;
            this.categories = data.data.categories;

        });
    }

    filterData() {
        if (this.addressConponent.locality) {
            localStorage.setItem("filterCity", this.addressConponent.locality);
        }
        if (this.addressConponent.administrative_area_level_1) {
            localStorage.setItem("filterState", this.addressConponent.administrative_area_level_1);
        }
        if (this.category) {
            localStorage.setItem("filterCategory", this.category);
        }
        this.router.navigateByUrl('/spaces');
    }
    requestSpacse() {
        if (localStorage.getItem("loginUserId")) {
            this.router.navigate(['/requests/new']);
        }
        else {
            this._broadcaster.broadcast("loginOpen", "login");
        }
    }
    listSpacse() {
        if (localStorage.getItem("loginUserId")) {
            this.router.navigate(['/spaces/new']);
        }
        else {
            this._broadcaster.broadcast("loginOpen", "login");
        }

    }
}
