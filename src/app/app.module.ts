import { MessageEvent } from './utility/messageEvent';
import { UserService } from './graphqls/services/user';
import { RequestService } from './graphqls/services/request';
import { CommentService } from './graphqls/services/comment';
import { RequestsModule } from './modules/requests/requests.module';
import { RegisterComponent } from './modules/register/register.component';
import { LoginComponent } from './modules/login/login.component';
import { UsersService } from './modules/home/users.service';
import { SwiperModule } from 'angular2-useful-swiper';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ApolloModule } from 'apollo-angular';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { ApolloClient, createNetworkInterface } from 'apollo-client';
 import { ModalModule } from 'ngx-modialog';
 import { BootstrapModalModule } from 'ngx-modialog/plugins/bootstrap';


const appRoutes: Routes = [];
import { ROUTES } from './app.routes';
import { HomeComponent } from './modules/home/home.component';
import { SharedModule } from './directives/shared.module';
import { FormsModule } from '@angular/forms';
import { LoginService } from './graphqls/services/login';

import { WizardModule } from 'ng2-archwizard';
import { SpacesService } from './graphqls/services/space';

import { AgmCoreModule } from '@agm/core';
//import { AgmCoreModule } from "angular2-google-maps/core";
import { NgUploaderModule } from 'ngx-uploader';
import { DatePickerModule } from 'ng2-datepicker';
import { Broadcaster } from './utility/broadcaster';


import { FacebookModule  } from 'ngx-facebook';

import { LinkedInSdkModule } from 'angular-linkedin-sdk';
import { SpacseEditComponent } from './modules/spaces/spacse-edit/spacse-edit.component';


import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { IonRangeSliderModule } from "ng2-ion-range-slider";
import { AdminModule } from './modules/admin/admin.module';
import { PagerService } from './utility/pagination';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { PagesModule } from './modules/pages/pages.module';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: localStorage.getItem("webUrl") + "/graphql",
    opts: {
      cache : "reload",
    }
  }),
});

export function provideClient(): ApolloClient {
  return client;
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    NgUploaderModule,
    SwiperModule,
    SharedModule,
    FormsModule,
    NguiAutoCompleteModule,
    BootstrapModalModule,
    WizardModule,
    IonRangeSliderModule,
    FacebookModule.forRoot(),
    DatePickerModule,
    LinkedInSdkModule,
    AdminModule,
    PagesModule,
    InfiniteScrollModule, 
    AgmCoreModule.forRoot(
      {
        apiKey: 'AIzaSyCZL1WHNqKu0Zc9s5KL7m-E_bHgIZtwKA0',
        libraries: ["places"]
      }
    ),
    ModalModule.forRoot(),
    ApolloModule.forRoot(provideClient),
    RouterModule.forRoot(
      ROUTES,
     {}// <-- debugging purposes only
    )
  ],
  providers: [
    { provide: 'apiKey', useValue: '86ysbcxtwzlvxp' },
    PagerService,
    UsersService, LoginService, SpacesService, CommentService, RequestService, UserService, MessageEvent, Broadcaster],
  bootstrap: [AppComponent]
})
export class AppModule { }
