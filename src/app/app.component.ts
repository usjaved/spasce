import { SpacesService } from './graphqls/services/space';

import { Broadcaster } from './utility/broadcaster';
import { RegisterComponent } from './modules/register/register.component';
import { LoginComponent } from './modules/login/login.component';
import { Component, NgZone } from '@angular/core';
import { Modal, BSModalContext } from 'ngx-modialog/plugins/bootstrap';
import { LoginService } from './graphqls/services/login';
import { OnInit, ViewEncapsulation } from '@angular/core';
import { gatAllSpace } from './graphqls/queries/space';
import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router'
@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [Modal, Broadcaster]
})
export class AppComponent {
  title = 'app';
  hidesearch: boolean;
  loginUserId = "";
  loginUserName = "";
  showMobileMenu = false;
  profilePic = "uploads/person-img5.png";
  isUserLoggedIn = false;
  loading = true;
  success = false;
  isLoginOpen = false;
  error = false;
  alertMessage = "";
  searchKeyWord = "";
  showResult = false;
  _timer: any;
  searchResult = [];
  // googleUser: gapi.auth2.GoogleUser;
  googleClinetId;
  constructor(
    public modal: Modal,
    public loginService: LoginService,
    public spaceService: SpacesService,
    private router: Router,
    private broadcaster: Broadcaster,
    private zone: NgZone
  ) {

    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event)
    })
    this.login();
  }
  ngOnInit() {
    this.googleClinetId = '964782912272-fkbqvt1roou1dn3plap45sr190o62v54.apps.googleusercontent.com';

    if (!localStorage.getItem("loginUserId")) {
      this.broadcaster.broadcast("loginOpen", "login");
    }
  }
  ngAfterViewChecked() {
    this.broadcaster.on<string>('success')
      .subscribe(message => {
        this.success = false;
        this.error = false;
        this.alertMessage = message;
        this.success = true;
        this.loading = false;
        this._timer = setTimeout(() => {
          this.alertMessage = '';
          this.success = false;
          this._timer = null;
        }, 3000);
      });

    this.broadcaster.on<string>('error')
      .subscribe(message => {
        console.log("hi");
        this.success = false;
        this.error = false;
        this.alertMessage = message;
        this.error = true;
        this.loading = false;
        this._timer = setTimeout(() => {
          this.alertMessage = '';
          this.error = false;
          this._timer = null;
        }, 3000);
      });
    this.broadcaster.on<string>('loading')
      .subscribe(message => {
        this.success = false;
        this.error = false;
        this.loading = false;
        this.alertMessage = message;
        this.loading = true;
      });
    this.broadcaster.on<string>('hideLoader')
      .subscribe(message => {
        this.success = false;
        this.error = false;
        this.loading = false;
      });

    this.broadcaster.on<string>('loginOpen')
      .subscribe(message => {
        if (!this.isLoginOpen) {
          this.isLoginOpen = true;
          this.openLoginModal();
        }

      });


  }
  ngOnChange(val: boolean) {
    if (val) {
      this.login();
    } else {
      this.logout();
    }
  }

  openLoginModal() {
    var dialog = this.modal.open(LoginComponent).then((resultPromise) => {
      resultPromise.result.then((result) => {
        this.isLoginOpen = false;
        if (result == "signup") {
          this.openSignUpModal();
        } else {
          this.login();
        }
      });
    });
  }
  openSignUpModal() {
    var dialog = this.modal.open(RegisterComponent).then((resultPromise) => {
      resultPromise.result.then((result) => {
        if (result == "login") {
          this.openLoginModal();
        } else {
          this.login();
        }
      });
    });
  }
  login() {
    if (localStorage.getItem("loginSession")) {
      this.loginService.loginWithSticky().subscribe(res => {
        this.loginUserId = res.data.loginSession.user._id;
        localStorage.setItem("firstName", res.data.loginSession.user.firstName);
        localStorage.setItem("lastName", res.data.loginSession.user.lastName);
        localStorage.setItem("loginUserId", res.data.loginSession.user._id);
        var picture = res.data.loginSession.user.profilePic;

        var picture = res.data.loginSession.user.profilePic;
        if (picture == null) {
          this.profilePic = 'uploads/person-default.png';
          localStorage.setItem("profilePic", this.profilePic)
        }
        else {
          this.profilePic = picture;
          localStorage.setItem("profilePic", res.data.loginSession.user.profilePic)
        }
        this.isUserLoggedIn = true;
      }, error => {

      });
    }
  }
  logout() {
    localStorage.clear();
    this.zone.runOutsideAngular(() => {
      location.reload();
      this.router.navigate(['../']);

    });

  }

  listSpacse() {
    if (localStorage.getItem("loginUserId")) {
      this.router.navigate(['/spaces/new']);
    }
    else {
      this.broadcaster.broadcast("loginOpen", "login");
    }
  }

  navigationInterceptor(event: RouterEvent): void {

    if (event instanceof NavigationStart) {
      if(event.url =="" || event.url == "/" ){
        this.hidesearch = true;
      }else {
        this.hidesearch = false;
      }
      this.loading = true
      this.showResult = false;
      this.showMobileMenu = false;
      window.scrollTo(0, 0);
    }
    if (event instanceof NavigationEnd) {
      this.loading = false;

    }

    if (event instanceof NavigationCancel) {
      this.loading = false
    }
    if (event instanceof NavigationError) {
      this.loading = false
    }
  }
  /*
    onGoogleSignInSuccess(event: GoogleSignInSuccess) {
      this.googleUser = event.googleUser;
      let id: string = this.googleUser.getId();
      let profile: gapi.auth2.BasicProfile = this.googleUser.getBasicProfile();
      var name = profile.getName().split(" ");
  
  
      var postData = { "firstName": name[0], "dateOfBirth": "", "lastName": name[1], "email": profile.getEmail(), "status": "active", "gid": profile.getId(), "profilePic": profile.getImageUrl() };
      this.loginService.signUpGoogle(postData).subscribe(res => {
        localStorage.setItem("loginSession", res.data.loginWithGoogle._id);
        this.login();
      }, error => {
        
      })
  
    } */
  doSearch(event) {
    var keyword = event.target.value
    this.spaceService.searchSpaceByTitle(keyword).subscribe(res => {
      this.showResult = true;
      this.searchResult = res.data.searchSpaceByTitle;
    }, err => {

    })
  }
  onChange() {
    // this.showResult = false;
  }
}
