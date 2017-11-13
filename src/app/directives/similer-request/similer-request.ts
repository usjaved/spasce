import { OnInit } from '@angular/core';
import { Component, Input } from '@angular/core';
import { RequestService } from '../../graphqls/services/request';
import { overlayConfigFactory } from 'ngx-modialog';

@Component({
    selector: 'similer-request',
    templateUrl: 'similer-request.html'
})
export class SimilerRequest implements OnInit {
    @Input() categoryId;
    @Input() limit;
    requests = [];
    constructor(
        private _requestService: RequestService
    ) {
        
    }
    ngOnInit() {

        this.requests = [];
        if(!this.limit){
            this.limit = 2;
        }
        var data = { limit : this.limit, categoryId: this.categoryId }
        this._requestService.getSimilerRequest(data).subscribe(res => {
            this.requests = res.data.getSimilerRequest;
        })
    }
    
}
