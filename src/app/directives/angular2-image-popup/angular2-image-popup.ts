import { Component, Input, Output, ElementRef, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'ImageModal',
  template: `
    <div class="ng-gallery" *ngIf="showRepeat">
    	<div *ngFor ="let i of modalImages; let index = index">
    		<img src="{{ fullImagePath(i) }}" class="ng-thumb" (click)="openGallery(index)" alt="Image {{ index + 1 }}" />
    	</div>
    </div>
    <div class="ng-overlay" *ngIf="opened">
    	<div class="ng-gallery-content">
    		<div class="uil-ring-css" *ngIf="loading">
    			<div></div>
    		</div>
    		<a class="close-popup" (click)="closeGallery()">
    			<i class="fa fa-close"></i>
    		</a>
    		<a class="nav-left" *ngIf="modalImages.length >1" (click)="prevImage()">
    			<i class="fa fa-angle-left"></i>
    		</a>
    		<img *ngIf="!loading" src="{{imgSrc}}" (click)="nextImage()" class="effect" />
    		<a class="nav-right" *ngIf="modalImages.length >1" (click)="nextImage()">
    			<i class="fa fa-angle-right"></i>
    		</a>
    		<span class="info-text" *ngIf="modalImages.length != 1">{{ currentImageIndex + 1 }}/{{ modalImages.length }} - Image {{currentImageIndex+1}}</span>
    	</div>
    </div>`
})
export class ImageModal implements OnInit {
  public _element: any;
  public opened: boolean = false;
  public imgSrc: string;
  public currentImageIndex: number;
  public loading: boolean = false;
  public showRepeat: boolean = false;
  @Input() modalImages: any;
  @Input() imagePointer: number;
  @Input() singleImage : string;
  @Output() cancelEvent = new EventEmitter<any>();
  constructor(public element: ElementRef) {
    this._element = this.element.nativeElement;
  }
  ngOnInit() {
    this.loading = true;
    if(this.singleImage){
      this.modalImages = [];
      this.modalImages.push(this.singleImage)
    }
    if (this.imagePointer >= 0) {
      this.showRepeat = false;
      this.openGallery(this.imagePointer);
    } else {
      this.showRepeat = true;
    }
  }
  closeGallery() {
    this.opened = false;
    this.cancelEvent.emit(null);
  }
  prevImage() {
    this.loading = true;
    this.currentImageIndex--;
    if (this.currentImageIndex < 0) {
      this.currentImageIndex = this.modalImages.length - 1;
    }
    this.openGallery(this.currentImageIndex);
  }
  nextImage() {
    this.loading = true;
    this.currentImageIndex++;
    if (this.modalImages.length === this.currentImageIndex) {
      this.currentImageIndex = 0;
    }
    this.openGallery(this.currentImageIndex);

  }
  fullImagePath(imageUrl){
    debugger;
    if (imageUrl.indexOf("http") == 0) {
      return imageUrl;
    } else if (imageUrl) {
        return localStorage.getItem("webUrl") + "/" + imageUrl;
    } else {
      return "";
    }
  
  }
  openGallery(index) {
    if (!index) {
      this.currentImageIndex = 1;
    }
    this.currentImageIndex = index;
    this.opened = true;
    for (var i = 0; i < this.modalImages.length; i++) {
      if (i === this.currentImageIndex) {
        if (this.modalImages[i].indexOf("http") == 0) {
          this.imgSrc = this.modalImages[i];
        } else if (this.modalImages[i]) {
          this.imgSrc = localStorage.getItem("webUrl") + "/" + this.modalImages[i];
        }
        this.loading = false;
        break;
      }
    }
  }
}
