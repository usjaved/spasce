import { RequestEditComponent } from './request-edit/request-edit.component';
import { DatePickerModule } from 'ng2-datepicker';
import { AgmCoreModule } from '@agm/core';
import { RequestDetailComponent } from './request-detail/request-detail.component';
import { SwiperModule } from 'angular2-useful-swiper';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { routes } from './requests.routes';
import { RequestListComponent } from './request-list/request-list.component'
import { RequestAddComponent } from './request-add/request-add.component';
import { SharedModule } from '../../directives/shared.module';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';

@NgModule({
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
    RequestListComponent,
    RequestAddComponent ,
    RequestDetailComponent,
    RequestEditComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    RouterModule,
    SwiperModule,
    SharedModule,
    InfiniteScrollModule,
    HttpModule,
    DatePickerModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCZL1WHNqKu0Zc9s5KL7m-E_bHgIZtwKA0',
      libraries: ["places"]
    }),
    // ApolloModule.forRoot(client)
  ],
})
export class RequestsModule {
  public static routes = routes;
}