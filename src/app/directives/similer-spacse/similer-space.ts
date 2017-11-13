import { SpacesService } from './../../graphqls/services/space';
import { OnInit } from '@angular/core';
import { Component, Input } from '@angular/core';
import { RequestService } from '../../graphqls/services/request';
import { overlayConfigFactory } from 'ngx-modialog';

@Component({
    selector: 'similer-space',
    templateUrl: 'similer-space.html'
})
export class SimilerSpace implements OnInit {
    @Input() categoryId;
    @Input() limit;
    spasces = [];
    constructor(
        private _spaceService: SpacesService
    ) {
        
    }
    ngOnInit() {

        this.spasces = [];
        if(!this.limit){
            this.limit = 2;
        }
        var data = { limit : this.limit, categoryId: this.categoryId }
        this._spaceService.getSimilerSpace(data).subscribe(res => {
            this.spasces = res.data.similerSpasce;
        }) 
    }
    
}
