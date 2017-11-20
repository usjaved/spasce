import { RequestService } from '../../../../graphqls/services/request';
import { Component, OnInit } from '@angular/core';
import { getAllRequests } from '../../../../graphqls/queries/request';


@Component({
    selector: "admin-request-list",
    templateUrl: 'admin-request-list.html'
})
export class AdminRequestList implements OnInit {
    requestList : any = [];
    selectAll : false;
    constructor(
        private _requestService : RequestService
    ) {

    }

    ngOnInit() {
        this.getSpaces();
    }
    getSpaces(){
        var data = {limit : 100, offset : 0};
        this._requestService.getAllRequests(data).subscribe(res =>{
            this. requestList = res.data.getAllRequests.map((item) => { return Object.assign({}, item, { isSelected: false }); })
        }, err => {

        })
    }
    checkAll(){
        this. requestList = this. requestList.map((item) => { item.isSelected = this.selectAll ;  return item  })
    }

    activeAllSelectedItem(status){
        
        var ids  = [];
        for(var i = 0; i < this. requestList.length; i++ ){
            if(this. requestList[i].isSelected){
                ids.push(this. requestList[i]._id);
            }
        } 
        var data = { "requestIds" : ids, "status": status}
        this._requestService.updateRequestStatus(data).subscribe( res => {
            for(var i = 0; i < this. requestList.length; i++ ){
                if(this. requestList[i].isSelected){
                    this. requestList[i].isSelected = false;
                    this. requestList[i].status = status;
                }
            } 
        }, err => {

        });
    }

}
