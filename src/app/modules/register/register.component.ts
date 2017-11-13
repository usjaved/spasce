 //import { GoogleSignInSuccess } from 'angular-google-signin';
import { InitParams, FacebookService, LoginResponse, LoginOptions } from 'ngx-facebook';
import { LoginService } from './../../graphqls/services/login';
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { DialogRef, ModalComponent, CloseGuard } from 'ngx-modialog';
import { BSModalContext, Modal } from 'ngx-modialog/plugins/bootstrap';
import { LinkedInService } from 'angular-linkedin-sdk';

import { AuthService, AppGlobals } from '../../packages/angular2-google-login';

export class CustomModalContext extends BSModalContext {
  public num1: number;
  public num2: number;
}

@Component({
  selector: "app-login",
  templateUrl: "./register.component.html",
  providers: [AuthService]
})

export class RegisterComponent implements CloseGuard, ModalComponent<CustomModalContext> {
  context: CustomModalContext;
  public wrongAnswer: boolean;
  firstName;
  lastName;
  email;
  password;
  years = [];
  cpassword;
  day;
  month;
  year;
  error = false;
  success = false;
  alertMessage = "";
  showSignUpForm = false;
  _timer: any;
  googleClinetId;
  gogleTitle = "Google";
  @Output() notify: EventEmitter<string> = new EventEmitter<string>();
  constructor(
    public dialog: DialogRef<CustomModalContext>,
    private loginService: LoginService,
    private fb: FacebookService,
    private _googleAuth: AuthService,
    private _linkedInService: LinkedInService

  ) {
    this.context = dialog.context;
    this.wrongAnswer = true;
    this.firstName = "";
    this.lastName = ""
    this.email = "";
    this.password = "";
    this.cpassword = "";
    this.day = "";
    this.month = "";
    this.year = "";

    dialog.setCloseGuard(this);
    var currentYear = (new Date()).getFullYear();
    for (var i = 1930; i < currentYear; i++) {
      this.years.push(i);
    }
    let initParams: InitParams = {
      appId: '1716209558707178',
      xfbml: true,
      version: 'v2.8'
    };
    fb.init(initParams);

  }
  beforeDismiss(): boolean {
    return true;
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

  beforeClose(): boolean {
    return false;
  }

  close() {
    this.dialog.close();
  }

  loginWithEmail() {
    this.dialog.close();
  }
  signUpWithEmail() {

    if (this.firstName == "") {
      this.messageAlert('error', 'Please enter first name');
      return false;
    }
    if (this.lastName == "") {
      this.messageAlert('error', 'Please enter last name');
      return false;
    }
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
    if (this.password != this.cpassword) {
      this.messageAlert('error', 'Please enter Password and confirm password not match');
      return false;
    }
    if (this.month == "") {
      this.messageAlert('error', 'Please select month');
      return false;
    }
    if (this.day == "") {
      this.messageAlert('error', 'Please select day');
      return false;
    }
    if (this.year == "") {
      this.messageAlert('error', 'Please select year');
      return false;
    }

    var dob = this.month + "/" + this.day + "/" + this.year;
    var postData = { "firstName": this.firstName, "dateOfBirth": dob, "lastName": this.lastName, "email": this.email, "password": this.password, "status": "active" };
    this.loginService.signUp(postData).subscribe(res => {
      if (res.data.createUser.code == "400") {
        this.messageAlert('error', res.data.createUser.message);
      } else {
        this.messageAlert('sucess', 'Registration Successfull!');
        this.openLoginModel();
      }
    }, error => {
      this.messageAlert('error', 'Please try again');
    })
  }
  closeDialog() {
    this.dialog.close();
  }
  openLoginModel() {
    this.dialog.close("login");
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
              this.dialog.close("close");
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
          this.dialog.close("close");
        }, error => {
          this.messageAlert('error', 'Please try again');
        })
      }

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
          this.dialog.close("close");
        }, error => {
          this.messageAlert('error', 'Please try again');
        })
      }
}
