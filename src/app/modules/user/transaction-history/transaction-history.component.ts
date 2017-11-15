import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
    selector: 'transaction-history',
    templateUrl: 'transaction-history.component.html',
})
export class TransactionHistoryComponent {
    userId;
    loginWithEmail
    constructor(
        private router: Router
    ) { 
        this.userId = localStorage.getItem("loginUserId");
        // if(!this.userId){
        //   this.router.navigate(['/']);
        // }
        this.loginWithEmail = localStorage.getItem("loginWithEmail");
      }
}
