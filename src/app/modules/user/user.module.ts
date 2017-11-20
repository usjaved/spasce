import { PublicProfileComponent } from './publicprofile/publicprofile.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { BookingsComponent } from './bookings/bookings.component';
import { MessageComponent } from './message/message.component';
import { RequestComponent } from './requests/request.component';
import { ProfileComponent } from './profile/profile.component';
import { AgmCoreModule } from '@agm/core';
import { SwiperModule } from 'angular2-useful-swiper';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { routes } from './user.routes';
import { SharedModule } from '../../directives/shared.module';
import { WizardModule } from 'ng2-archwizard';
import { MapsAPILoader } from '@agm/core';
import { AccountComponent } from './account/account.component';
import { UserSpaceComponent } from './space/space.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PaymentsComponent } from './payments/payments.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PagerService } from '../../utility/pagination';
import { OfferMessageComponent } from './offer-message/offer-message.component';


@NgModule({
  declarations: [
    ProfileComponent,
    AccountComponent,
    UserSpaceComponent,
    RequestComponent,
    MessageComponent,
    DashboardComponent,
    BookingsComponent,
    FavoritesComponent,
    PaymentsComponent,
    OfferMessageComponent,
    TransactionHistoryComponent,
    ChangePasswordComponent,
    PublicProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    RouterModule,
    SwiperModule,
    SharedModule,
    WizardModule,
    HttpModule,
 ],
  providers: [PagerService]
})
export class UserModule {
  public static routes = routes;
}