import { SimilerSpace } from './similer-spacse/similer-space';
import { SimilerRequest } from './similer-request/similer-request';
import { PayNowModel } from './pay-now/pay-now';
import { TourComponent } from './tour/tour';
import { ImageModal } from './angular2-image-popup/angular2-image-popup';
import { NgUploaderModule } from 'ngx-uploader';
import { FileUploadComponent } from './file-upload/file-upload';
import { CarouselRelatedItem } from './carousel-related-item/carousel-related-item.component';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { SwiperModule } from 'angular2-useful-swiper';
import { SliderItemComponent } from './slider-item/slider-item.component';
import { Carousel } from './slider/carousel.component';
import { RequestListItemComponent } from './request-list-item/request-list-item.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommentListComponent } from './comment-list/comment-list.component';
import { CarouselRelated } from './carousel-related/carousel-related.component';
import { RouterModule } from '@angular/router';
import { RelativeTimeComponent } from './relative-time/RelativeTimeComponent';
import { ServerImage } from './server-image/server-image';
import { RequestMessengerComponent } from './request-messenger/request-messenger.component';
import { FlagComponent } from './flag/flag.component';
import { CarouselImage } from './corausel-image/carousel-image.component';
import { FileUploadButtonComponent } from './file-upload-button/file-upload-button';
import { DatePickerModule } from 'ng2-datepicker';
import { PaymentRequest } from './payment-request/payment-request';
import { ReadableDate } from './relative-time/ReadableDate';
import { ContactToHostComponent } from './contact-to-host/contact-to-host.component';
import { MakeOfferComponent } from './make-offer/make-offer.component';
import { FullFillComponent } from './fullfill-request/fullfill-request';
import { AlertComponent } from './alert/alert.component';
import { ReviewsComponent } from './reviews/reviews';
import { RatingStarComponent } from './rating-star/rating-star.component';

@NgModule({
    imports: [
        SwiperModule,
        CommonModule,
        RouterModule,
        FormsModule,
        NgUploaderModule,
        DatePickerModule
    ],
    
    declarations: [
         RequestListItemComponent,
         Carousel,
         FlagComponent,
         SliderItemComponent,
         CommentListComponent,
         CarouselRelated,
         CarouselRelatedItem,
         RelativeTimeComponent,
         FileUploadComponent,
         ServerImage,
         RequestMessengerComponent,
         CarouselImage,
         FileUploadButtonComponent,
         ImageModal,
         TourComponent,
         PaymentRequest,
         ReadableDate,
         MakeOfferComponent,
         ContactToHostComponent,
         PayNowModel,
         FullFillComponent,
         AlertComponent,
         SimilerRequest,
         SimilerSpace,
         ReviewsComponent,
         RatingStarComponent
    ],
    exports: [
        RequestListItemComponent,
        Carousel,
        SliderItemComponent,
        CommentListComponent,
        CarouselRelated,
        CarouselRelatedItem,
        RelativeTimeComponent,
        FileUploadComponent,
        FlagComponent,
        ReviewsComponent,
        RequestMessengerComponent,
        ServerImage,
        MakeOfferComponent,
        FileUploadButtonComponent,
        CarouselImage,
        ImageModal,
        TourComponent,
        PaymentRequest,
        ContactToHostComponent,
        ReadableDate,
        PayNowModel,
        FullFillComponent,
        AlertComponent,
        SimilerRequest,
        SimilerSpace,       
        RatingStarComponent
        
    ],
    entryComponents:[ReviewsComponent,FlagComponent, AlertComponent, TourComponent, PaymentRequest, PayNowModel,ContactToHostComponent,MakeOfferComponent, FullFillComponent],

})

export class SharedModule {}
