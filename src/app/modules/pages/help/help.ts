import { Component, OnInit } from "@angular/core";

@Component({
  selector: "help",
  templateUrl: "./help.html"
})

export class HelpPage {

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
