import { Component, OnInit } from "@angular/core";

@Component({
  selector: "blog",
  templateUrl: "./blog.html"
})

export class BlogPage {

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
