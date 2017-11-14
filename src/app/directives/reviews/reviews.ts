import { Component, Input } from '@angular/core';
import { BSModalContext, Modal } from 'ngx-modialog/plugins/bootstrap';
import { ModalComponent, DialogRef } from 'ngx-modialog';
import { Broadcaster } from '../../utility/broadcaster';
import { SpacesService } from '../../graphqls/services/space';

export class ReviewComponentcontext extends BSModalContext {
    public spacseId: String;
    public userId: String;
    public bookingId: String;
}

@Component({
    selector: 'reviews',
    templateUrl: 'reviews.html'
})

export class ReviewsComponent implements ModalComponent<ReviewComponentcontext> {
    context: ReviewComponentcontext;
    success = false;
    error = false;
    alertMessage = "";
    _timer: any;
    images = [];
    rate1 = 0;
    star = false;
    comment = "";

    constructor(
        private broadcaster: Broadcaster,
        public modal: Modal,
        private _spaceService: SpacesService,
        public dialog: DialogRef<ReviewComponentcontext>) {
        this.context = dialog.context;
    }
    ngOnInit() {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        for (let i = 0; i < 5; i++) {
            this.images.push({ "id": i, "path": "/assets/images/star-icon.png" })
        }
        this.starIndexes = Array(this.max).fill(1).map((x, i) => i);
    }

  /*  add() {

        if (this.star == false) {
            this.rate1 = this.rate1 + 1;
            console.log("rate :" + this.rate);
        }
        else {
            this.rate1 = this.rate1 - 1;
            console.log("rate :" + this.rate);
        }
    } */

    close() {
        this.dialog.close();
    }
    submit() {
        console.log("rate :" + this.rate);
        var data: any;
        data = {};
        data.userId = this.context.userId;
        data.spacseId = this.context.spacseId;
        data.bookingId = this.context.bookingId;
        data.rate = this.value;
        data.comment = this.comment;

        console.log("data" + data);
        this._spaceService.createSpacseReview(data).subscribe(res => {
            if (res.data.createSpacseReview.code == "200") {
                this.dialog.close();
            }

        });
    }

    messageAlert(type, message) {
        if (type == "error") {
            this.showError(message)
        } else {
            this.showSuccess(message);
        }
    }
    showError(message) {
        this.success = false;
        this.error = false;
        this.alertMessage = message;
        this.error = true;
        this._timer = setTimeout(() => {
            this.alertMessage = '';
            this.error = false;
            this._timer = null;
        }, 3000);
    }
    showSuccess(message) {
        this.success = false;
        this.error = false;
        this.alertMessage = message;
        this.success = true;
        this._timer = setTimeout(() => {
            this.alertMessage = '';
            this.success = false;
            this._timer = null;
            this.close();
        }, 3000);
    }


    _max: number = 5;
    _readOnly: boolean = false;
    _emptyStarIconName: string = 'star-o';
    _halfStarIconName: string = 'star-half-o';
    _starIconName: string = 'star';
    _nullable: boolean = false;

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
        if (this.readOnly || value < 0 || value > this.max) {
            return;
        }

        if (value === this.value && this.nullable) {
            value = null;
        }

        this.value = value;
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
