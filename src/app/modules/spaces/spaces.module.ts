
import { SpacseEditComponent } from './spacse-edit/spacse-edit.component';
import { AgmCoreModule } from '@agm/core';
import { SpaceAddComponent } from './spaces-add/space-add.component';
import { SwiperModule } from 'angular2-useful-swiper';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { routes } from './spaces.routes';
import { SharedModule } from '../../directives/shared.module';
import { SpacesListComponent } from './spaces-list/list.component';
import { WizardModule } from 'ng2-archwizard';
import { MapsAPILoader } from '@agm/core';
import { SpacesDetailComponent } from './spaces-detail/spaces-detail.component';

import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { IonRangeSliderModule } from 'ng2-ion-range-slider';
import { DatePickerModule } from 'ng2-datepicker';

@NgModule({
  declarations: [
   SpacesListComponent,
   SpaceAddComponent,
   SpacesDetailComponent,
   SpacseEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    RouterModule,
    SwiperModule,
    IonRangeSliderModule,
    NguiAutoCompleteModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCZL1WHNqKu0Zc9s5KL7m-E_bHgIZtwKA0',
      libraries: ["places"]
    }),
    SharedModule,
    WizardModule,
    DatePickerModule,
    HttpModule
    // ApolloModule.forRoot(client)
  ],
  providers: [HttpModule]
})
export class SpacesModule {
  public static routes = routes;
}