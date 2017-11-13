import { element } from 'protractor';
import { EventManager } from '@angular/platform-browser';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Component, Input, ViewChild } from '@angular/core';
export enum Direction { UNKNOWN, NEXT, PREV }

@Component({
    selector: 'carousel',
    templateUrl: 'carousel.html'
})
export class Carousel {
    config;
    @Input() requests :any;
    private resizeSubject: ReplaySubject<Window>;
    constructor(private eventManager: EventManager) {

        this.resizeSubject = new ReplaySubject();
        this.eventManager.addGlobalEventListener('window', 'resize', this.onResize.bind(this));
        this.setSliderConfig(window.innerWidth);
    }

    private onResize(event: any) {
            this.setSliderConfig(event.srcElement.outerWidth);
    }

    private setSliderConfig(width) {
        if (width > 900) {
            this.config = {
                nextButton: '.owl-next',
                prevButton: '.owl-prev',
                slidesPerView: 3,
                spaceBetween: 30,
                buttonDisabledClass :"disabled",
                observer: true
            };
        } else if (width > 500) {
            this.config = {
                nextButton: '.owl-next',
                prevButton: '.owl-prev',
                slidesPerView: 2,
                spaceBetween: 30,
                buttonDisabledClass :"disabled",
                observer: true
            };
        } else {
            this.config = {
                nextButton: '.owl-next',
                prevButton: '.owl-prev',
                slidesPerView: 1,
                spaceBetween: 30,
                buttonDisabledClass :"disabled",
                observer: true
            };
        }
    }

}