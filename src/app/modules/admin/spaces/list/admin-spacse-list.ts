import { SpacesService } from './../../../../graphqls/services/space';
import { Component, OnInit } from '@angular/core';


@Component({
    selector: "admin-spacse-list",
    templateUrl: 'admin-spacse-list.html'
})
export class AdminSpacseList implements OnInit {
    spaceList : any = [];
    selectAll : false;
    constructor(
        private _spaceService : SpacesService
    ) {

    }

    ngOnInit() {
        this.getSpaces();
    }
    getSpaces(){
        var data = {limit : 100, offset : 0};
        this._spaceService.gatAllSpace(data).subscribe(res =>{
            this.spaceList = res.data.getAllSpace.map((item) => { return Object.assign({}, item, { isSelected: false }); })
        }, err => {

        })
    }
    checkAll(){
        this.spaceList = this.spaceList.map((item) => { item.isSelected = this.selectAll ;  return item  })
    }

    activeAllSelectedItem(status){
        
        var ids  = [];
        for(var i = 0; i < this.spaceList.length; i++ ){
            if(this.spaceList[i].isSelected){
                ids.push(this.spaceList[i]._id);
            }
        } 
        var data = { "spacseIds" : ids, "status": status}
        this._spaceService.updateStatus(data).subscribe( res => {
            for(var i = 0; i < this.spaceList.length; i++ ){
                if(this.spaceList[i].isSelected){
                    this.spaceList[i].isSelected = false;
                    this.spaceList[i].status = status;
                }
            } 
        }, err => {

        });
    }

}
