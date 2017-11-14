import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'rating-star',
    template: ' <ul style="float:left" class="rating" (keydown)="onKeyDown($event)"><li *ngFor="let starIndex of starIndexes" tappable (click)="rate(starIndex + 1)"> <i class="fa fa-{{ getStarIconName(starIndex) }}" aria-hidden="true"></i></li></ul><div style="float:right"> {{ TotalReview }} Reviews</div><div style="clear:both"></div>'
})
export class RatingStarComponent implements OnInit {
    @Input() TotalReview: number;
    @Input() rating: number;
    _max: number = 5;
    _readOnly: boolean = false;
    _emptyStarIconName: string = 'star-o';
    _halfStarIconName: string = 'star-half-o';
    _starIconName: string = 'star';
    _nullable: boolean = false;

    constructor() {
    }

    ngOnInit() {
        this.TotalReview =this.TotalReview;
        this.value = this.rating;

        this.starIndexes = Array(this.max).fill(1).map((x, i) => i);
    }

    @Input()
    get max() {
        return this._max;
    }
    set max(val: any) {
        this._max = this.getNumberPropertyValue(val);
    }

    @Input()
    get readOnly() {
        return this._readOnly;
    }
    set readOnly(val: any) {
        this._readOnly = this.isTrueProperty(val);
    }

    @Input()
    get emptyStarIconName() {
        return this._emptyStarIconName;
    }
    set emptyStarIconName(val: any) {
        this._emptyStarIconName = val;
    }

    @Input()
    get halfStarIconName() {
        return this._halfStarIconName;
    }
    set halfStarIconName(val: any) {
        this._halfStarIconName = val;
    }

    @Input()
    get starIconName() {
        return this._starIconName;
    }
    set starIconName(val: any) {
        this._starIconName = val;
    }

    @Input()
    get nullable() {
        return this._nullable;
    }
    set nullable(val: any) {
        this._nullable = this.isTrueProperty(val);
    }

    innerValue: any;
    starIndexes: Array<number>;

    //onChangeCallback: (_: any) => void = noop;


    getStarIconName(starIndex: number) {
        if (this.value === undefined) {
            return this.emptyStarIconName;
        }

        if (this.value > starIndex) {

            if (this.value < starIndex + 1) {
                return this.halfStarIconName;

            } else {
                return this.starIconName;
            }

        } else {
            return this.emptyStarIconName;
        }
    }

    get value(): any {
        return this.innerValue;
    }

    set value(value: any) {
        if (value !== this.innerValue) {
            this.innerValue = value;
            // this.onChangeCallback(value);
        }
    }

    writeValue(value: any) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }

    registerOnChange(fn: any) {
        // this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {
    }

    onKeyDown(event: any) {
        if (/(37|38|39|40)/.test(event.which)) {
            event.preventDefault();
            event.stopPropagation();

            let newValue = this.value + ((event.which == 38 || event.which == 39) ? 1 : -1);
            // return this.rate(newValue);
        }
    }

    rate(value: number) {
        return;
    }

    private isTrueProperty(val: any): boolean {
        if (typeof val === 'string') {
            val = val.toLowerCase().trim();
            return (val === 'true' || val === 'on');
        }
        return !!val;
    }

    private getNumberPropertyValue(val: any): number {
        if (typeof val === 'string') {
            return parseInt(val.trim());
        }
        return val;
    }

}
