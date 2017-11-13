
import { element } from 'protractor';
import { EventManager } from '@angular/platform-browser';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Component, Input, ViewChild } from '@angular/core';

export enum Direction { UNKNOWN, NEXT, PREV }

@Component({
    selector: 'carousel-image',
    templateUrl: 'carousel-image.html'
})
export class CarouselImage {
    config;
    uniqSliderId;
    @Input() images : [string];

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
        this.config = {
            nextButton: '.owl-next' + this.uniqSliderId,
            prevButton: '.owl-prev' + this.uniqSliderId,
            slidesPerView: 1,
            spaceBetween: 30,
            buttonDisabledClass :"disabled",
            observer: true
        };      
    }

}