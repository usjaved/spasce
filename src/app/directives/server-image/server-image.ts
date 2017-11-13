import { Component, Input, OnInit } from '@angular/core';


@Component({
    selector: "server-image",
    template : "<img [src]='getImagePath()' />"
})

export class ServerImage implements OnInit{

    @Input() src: string;
    imagePath: string  = "";
    constructor(){

    }
    ngOnInit(){
        if(!this.src){
            this.src = "";
        }
        if(this.src.indexOf("http") == 0){
            this.imagePath = this.src;
        }else if(this.src){
            this.imagePath = localStorage.getItem("webUrl") + "/" + this.src;   
        }else{
            this.imagePath = localStorage.getItem("webUrl") + "/uploads/person-img5.png";   
        }
    }
    getImagePath(){
        if(!this.src){
            this.src = "";
        }
        if(this.src.indexOf("http") == 0){
            this.imagePath = this.src;
        }else if(this.src){
            this.imagePath = localStorage.getItem("webUrl") + "/" + this.src;   
        }else{
            this.imagePath = localStorage.getItem("webUrl") + "/uploads/person-img5.png";   
        }
        return this.imagePath;
    }
}