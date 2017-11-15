
import { element } from 'protractor';
import { EventManager } from '@angular/platform-browser';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Component, Input, ViewChild } from '@angular/core';

export enum Direction { UNKNOWN, NEXT, PREV }

@Component({
    selector: 'carousel-related',
    templateUrl: 'carousel-related.html'
})
export class CarouselRelated {
    config;
    uniqSliderId;
    @Input() spaces : any;
    slidePerPage = 3;
    
    private resizeSubject: ReplaySubject<Window>;
    constructor(private eventManager: EventManager) {

        this.resizeSubject = new ReplaySubject();
        this.eventManager.addGlobalEventListener('window', 'resize', this.onResize.bind(this));
        this.uniqSliderId = Math.floor(10000 * Math.random());
        this.setSliderConfig(window.innerWidth);
        
    }

    private onResize(event: any) {
            this.setSliderConfig(event.srcElement.outerWidth);
    }

    private setSliderConfig(width) {
        if (width > 900) {
            this.config = {
                nextButton: '.owl-next' + this.uniqSliderId,
                prevButton: '.owl-prev' + this.uniqSliderId,
                slidesPerView: 3,
                spaceBetween: 30,
                buttonDisabledClass :"disabled",
                observer: true
            };
            this.slidePerPage = 3;
        } else if (width > 500) {
            this.config = {
                nextButton: '.owl-next' + this.uniqSliderId,
                prevButton: '.owl-prev' + this.uniqSliderId,
                slidesPerView: 2,
                spaceBetween: 30,
                buttonDisabledClass :"disabled",
                observer: true
            };
            this.slidePerPage = 2;
        } else {
            this.config = {
                nextButton: '.owl-next' + this.uniqSliderId,
                prevButton: '.owl-prev' + this.uniqSliderId,
                slidesPerView: 1,
                spaceBetween: 30,
                buttonDisabledClass :"disabled",
                observer: true
            };
            this.slidePerPage = 1;
        }
    }

}