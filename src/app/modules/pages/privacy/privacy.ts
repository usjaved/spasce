import { Component, OnInit } from "@angular/core";

@Component({
  selector: "privacy-us",
  templateUrl: "./privacy.html"
})

export class PrivacyPage {

  recievesms = false;
  generalandpromotional = false;
  reservationandreview = false;
  accountacivity = false;
  userId;
  accountsetting = "";
  success = false;
  error = false;
  loading = false;
  alertMessage = "";
  _timer: any;


  constructor(
  ) {
    
  }
  
}
