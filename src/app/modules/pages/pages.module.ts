import { TermPage } from './term/term';
import { TeamPage } from './team/team';
import { PrivacyPage } from './privacy/privacy';
import { HelpPage } from './help/help';
import { AboutPage } from './about/about';
import { AgmCoreModule } from '@agm/core';
import { SwiperModule } from 'angular2-useful-swiper';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { SharedModule } from '../../directives/shared.module';
import { WizardModule } from 'ng2-archwizard';
import { MapsAPILoader } from '@agm/core';

import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { IonRangeSliderModule } from 'ng2-ion-range-slider';
import { DatePickerModule } from 'ng2-datepicker';
import { routes } from './pages.routes';
import { BlogPage } from './blog/blog';

@NgModule({
  declarations: [
    AboutPage,
    HelpPage,
    PrivacyPage,
    TeamPage,
    BlogPage,
    TermPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    HttpModule
  ],
  providers: [HttpModule]
})
export class PagesModule {
  public static routes = routes;
}