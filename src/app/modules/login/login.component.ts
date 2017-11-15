import { Component, OnInit, EventEmitter, Input, Output } from "@angular/core";
import { DialogRef, ModalComponent, CloseGuard } from 'ngx-modialog';
import { BSModalContext } from 'ngx-modialog/plugins/bootstrap';
import { LoginService } from '../../graphqls/services/login';
import { Broadcaster } from '../../utility/broadcaster';
import { FacebookService, InitParams, LoginResponse, LoginOptions, UIResponse, UIParams, FBVideoComponent } from 'ngx-facebook';

import { AuthService, AppGlobals } from '../../packages/angular2-google-login';

import {
  LinkedInService
} from 'angular-linkedin-sdk';

export class CustomModalContext extends BSModalContext {
  public num1: number;
  public num2: number;
}


@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  providers: [AuthService]
})

export class LoginComponent implements CloseGuard, ModalComponent<CustomModalContext> {
  context: CustomModalContext;
  email: string;
  password: string;
  needToClose;
  success = false;
  error = false;
  alertMessage = "";
  _timer: any;
  googleClinetId;
  gogleTitle = "Google";
  @Output() notify: EventEmitter<string> = new EventEmitter<string>();
  constructor(public dialog: DialogRef<CustomModalContext>,
    private loginService: LoginService,
    private _googleAuth: AuthService,
    private broadcaster: Broadcaster,
    private fb: FacebookService,
    private _linkedInService: LinkedInService
  ) {

    this.context = dialog.context;
    this.needToClose = false;
    this.email = "";
    this.password = "";
    dialog.setCloseGuard(this);

    let initParams: InitParams = {
      appId: '1716209558707178',
      xfbml: true,
      version: 'v2.8'
    };
    fb.init(initParams);
    //
  }
  close() {
    this.dialog.close();
  }
  ngOnInit() {
    this.googleClinetId = '964782912272-fkbqvt1roou1dn3plap45sr190o62v54.apps.googleusercontent.com';
    AppGlobals.GOOGLE_CLIENT_ID = '964782912272-fkbqvt1roou1dn3plap45sr190o62v54.apps.googleusercontent.com';
    this._googleAuth.authenticateUser((result)=>{
      if(result){
        this.loginWithGoogle(result)
      }
   });
  }

  loginWithEmail() {
    this.dialog.close();
  }

  beforeDismiss(): boolean {
    return true;
  }

  beforeClose(): boolean {
    return this.needToClose;
  }
  doLogin() {

    if (this.email == "") {
      this.messageAlert('error', 'Please enter email address');
      return false;
    }
    if (! /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
      this.messageAlert('error', 'Please enter valid email address');
      return false;
    }
    if (this.password == "") {
      this.messageAlert('error', 'Please enter Password');
      return false;
    }

    this.loginService.execute(this.email, this.password).subscribe(res => {
      localStorage.setItem("loginSession", res.data.login._id);
      this.notify.emit('login');
      localStorage.setItem("loginWithEmail" , "true");
      this.dialog.close("login");
    }, error => {
      this.messageAlert('error', 'Email or password not match');
    })
  }

  closeDialog() {
    this.dialog.close();
  }
  openSignUp() {
    this.dialog.close("signup");
  }
  messageAlert(type, message) {
    if (type == "error") {
      this.showError(message)
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

  loginWithFacebook(): void {

    const loginOptions: LoginOptions = {
      enable_profile_selector: false,
      return_scopes: true,
      scope: "public_profile,email,user_birthday"
    };

    this.fb.login(loginOptions)
      .then((res: LoginResponse) => {
        console.log('Logged in', res);
        this.getProfileInfo();
      })
      .catch(err => {

      });
  }

  getProfileInfo() {
    this.fb.api('/me', "get", { locale: 'en_US', fields: 'last_name, birthday, first_name, email' })
      .then((res: any) => {
        console.log('Got the users profile', res);

        var dob = res.birthday;
        var postData = { "firstName": res.first_name, "dateOfBirth": dob, "lastName": res.last_name, "email": res.email, "status": "active", "fbid": res.id };
        this.loginService.signUpFacebook(postData).subscribe(res => {
          localStorage.setItem("loginSession", res.data.loginWithFacebook._id);
          this.notify.emit('login');
          this.dialog.close("login");
        }, error => {
          this.messageAlert('error', 'Please try again');
        })


      })
      .catch(err => {

      });
  }

  loginWithGoogle(profile){
    
    var postData = { "firstName": profile.ofa, "dateOfBirth": "", "lastName": profile.wea, "email": profile.U3, "status": "active", "gid": profile.Eea, "profilePic": profile.Paa };
    this.loginService.signUpGoogle(postData).subscribe(res => {
      localStorage.setItem("loginSession", res.data.loginWithGoogle._id);
      this.notify.emit('login');
      this.dialog.close("login");
    }, error => {
      this.messageAlert('error', 'Please try again');
    })
  }
 /* onGoogleSignInSuccess(event: GoogleSignInSuccess) {
    let googleUser: gapi.auth2.GoogleUser = event.googleUser;
    let id: string = googleUser.getId();
    let profile: gapi.auth2.BasicProfile = googleUser.getBasicProfile();
    var name = profile.getName().split(" ");


    var postData = { "firstName": name[0], "dateOfBirth": "", "lastName": name[1], "email": profile.getEmail(), "status": "active", "gid": profile.getId(), "profilePic": profile.getImageUrl() };
    this.loginService.signUpGoogle(postData).subscribe(res => {
      localStorage.setItem("loginSession", res.data.loginWithGoogle._id);
      this.notify.emit('login');
      this.dialog.close("login");
    }, error => {
      this.messageAlert('error', 'Please try again');
    })

  } */
  
  loginWithLinkedIn(){
    this._linkedInService.login().subscribe({
      next: (state) => {
          this.getLinkedInProfile();
      },
      complete: () => {
        
      }
    });
  }
  getLinkedInProfile(){
    const url = '/people/~:(id,firstName,lastName,picture-url,email-address,date-of-birth)?format=json';
    this._linkedInService.raw(url)
      .asObservable()
        .subscribe({
          next: (data) => {
            this.registerLinkedinUser(data);
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            console.log('RAW API call completed');
          }
        });

  }
  registerLinkedinUser(user){
    var postData = { "firstName": user.firstName, "dateOfBirth": "", "lastName": user.lastName , "email": user.emailAddress, "status": "active", "likedInId": user.id, "profilePic": user.pictureUrl };
    this.loginService.signUpLinkedIN(postData).subscribe(res => {
      localStorage.setItem("loginSession", res.data.signUpLinkedIN._id);
      this.notify.emit('login');
      this.dialog.close("login");
    }, error => {
      this.messageAlert('error', 'Please try again');
    })
  }

}

//https://www.facebook.com/login.php?skip_api_login=1&api_key=1716209558707178&signed_next=1&next=https%3A%2F%2Fwww.facebook.com%2Fv2.8%2Fdialog%2Foauth%3Fchannel%3Dhttp%253A%252F%252Fstaticxx.facebook.com%252Fconnect%252Fxd_arbiter%252Fr%252F5oivrH7Newv.js%253Fversion%253D42%2523cb%253Df3ba80fb663a638%2526domain%253Dlocalhost%2526origin%253Dhttp%25253A%25252F%25252Flocalhost%25253A4200%25252Ff3d6db29a7eb7c4%2526relation%253Dopener%26redirect_uri%3Dhttp%253A%252F%252Fstaticxx.facebook.com%252Fconnect%252Fxd_arbiter%252Fr%252F5oivrH7Newv.js%253Fversion%253D42%2523cb%253Df32dcf3ed33c2%2526domain%253Dlocalhost%2526origin%253Dhttp%25253A%25252F%25252Flocalhost%25253A4200%25252Ff3d6db29a7eb7c4%2526relation%253Dopener%2526frame%253Df231ac9de1216e8%26display%3Dpopup%26scope%3Dpublic_profile%252Cemail%26response_type%3Dtoken%252Csigned_request%26domain%3Dlocalhost%26return_scopes%3Dtrue%26origin%3D1%26client_id%3D1716209558707178%26ret%3Dlogin%26sdk%3Djoey%26logger_id%3D3388e313-4cc7-252f-d96a-0eabbe4dd2bf&cancel_url=http%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter%2Fr%2F5oivrH7Newv.js%3Fversion%3D42%23cb%3Df32dcf3ed33c2%26domain%3Dlocalhost%26origin%3Dhttp%253A%252F%252Flocalhost%253A4200%252Ff3d6db29a7eb7c4%26relation%3Dopener%26frame%3Df231ac9de1216e8%26error%3Daccess_denied%26error_code%3D200%26error_description%3DPermissions%2Berror%26error_reason%3Duser_denied%26e2e%3D%257B%257D&display=popup&locale=en_GB&logger_id=3388e313-4cc7-252f-d96a-0eabbe4dd2bf
