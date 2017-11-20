import { AgmCoreModule } from '@agm/core';
import { SwiperModule } from 'angular2-useful-swiper';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { routes } from './admin.routes';
import { SharedModule } from '../../directives/shared.module';
import { WizardModule } from 'ng2-archwizard';
import { MapsAPILoader } from '@agm/core';
import { AdminSpacseList } from './spaces/list/admin-spacse-list';
import { AdminRequestList } from './requests/list/admin-request-list';


@NgModule({
  declarations: [
    AdminSpacseList,
    AdminRequestList
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
    HttpModule
 ],
  providers: []
})
export class AdminModule {
  public static routes = routes;
}