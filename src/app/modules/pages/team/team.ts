import { Component, OnInit } from "@angular/core";

@Component({
  selector: "team",
  templateUrl: "./team.html"
})

export class TeamPage {

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
