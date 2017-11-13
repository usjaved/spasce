import { Injectable } from '@angular/core';
import { AppGlobals } from './app-globals';

declare const gapi: any;

@Injectable()
export class AuthService {
  constructor() { }

  /**
   * Calling Google login API and fetching account details.
   * @param callback Callback to function
   */
  public authenticateUser(callback) {
    let auth2: any;
    let result: any;
    let error: any;
    gapi.load('auth2', () => {
      auth2 = gapi.auth2.init({
        client_id: AppGlobals.GOOGLE_CLIENT_ID,
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      //Login button reference
      let loginButton: any = document.getElementById('google-login-button');
      auth2.attachClickHandler(loginButton, {},
        userDetails => {
          //Getting profile object
          let profile = userDetails.getBasicProfile();

          //Setting data to localstorage.
          localStorage.setItem('token', userDetails.getAuthResponse().id_token);
          localStorage.setItem('image', profile.getImageUrl());
          localStorage.setItem('name', profile.getName());
          localStorage.setItem('email', profile.getEmail());

          
          callback(profile);
        }, error => {
          callback(false);
        });
    });
  }

  /**
   * Logout user from Google
   * @param callback Callback to function
   */
  userLogout(callback) {
    let homeUrl = "http://localhost:4200";
    let logoutUrl = "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=" + homeUrl;
    document.location.href = logoutUrl;
    callback();
  }
}
