import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'relative-time',
    template: "<span>{{timeString}}</span>"
})
export class RelativeTimeComponent implements OnInit {

    @Input() createdAt: string;
    timeString: string
    constructor() {
        
    }

    ngOnInit() {
        this.convertToRelaTime();
    }
    private convertToRelaTime() {
        var result: string;
        let now = new Date().getTime();
       
        let delta = (now - parseInt(this.createdAt)) / 1000;

        if (delta < 10) {
            result = 'Just Now';
        }
        else if (delta < 60) { // sent in last minute
            result = Math.floor(delta) + ' Seconds ago';
        }
        else if (delta < 3600) { // sent in last hour
            result = Math.floor(delta / 60) + ' Minutes ago';
        }
        else if (delta < 86400) { // sent on last day
            result = Math.floor(delta / 3600) + ' Hours ago';
        }
        else { // sent more than one day ago
            result = Math.floor(delta / 86400) + ' Days ago';
        }
        this.timeString = result;
    };
}
