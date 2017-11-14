import { Component, OnInit } from "@angular/core";

@Component({
  selector: "term-us",
  templateUrl: "./term.html"
})

export class TermPage {

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
