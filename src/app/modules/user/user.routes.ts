import { RequestComponent } from './requests/request.component';
import { MessageComponent } from './message/message.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { BookingsComponent } from './bookings/bookings.component';
import { AccountComponent } from './account/account.component';
import { ProfileComponent } from './profile/profile.component';
import { UserSpaceComponent } from './space/space.component';
import { PaymentsComponent } from './payments/payments.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
export const routes = [
    {
        path: '', children: [
            { path: '', component:  ProfileComponent},
            { path: 'account', component:  AccountComponent},
            { path: 'bookings', component:  BookingsComponent},
            { path: 'favorites', component:  FavoritesComponent},
            { path: 'dashboard', component:  DashboardComponent},
            { path: 'message', component:  MessageComponent},
            { path: 'requests', component:  RequestComponent},
            { path: 'spaces', component:  UserSpaceComponent},
            { path: 'payment',component: PaymentsComponent},
            { path:'transactionhistory', component:TransactionHistoryComponent},
            { path:'changepassword', component: ChangePasswordComponent}
        ]   
    },
];