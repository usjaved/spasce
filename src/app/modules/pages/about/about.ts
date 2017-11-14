import { Component, OnInit } from "@angular/core";

@Component({
  selector: "about-us",
  templateUrl: "./about.html"
})

export class AboutPage {

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
