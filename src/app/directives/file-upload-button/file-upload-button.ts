import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes } from 'ngx-uploader';
// const URL = '/api/';
const URL = 'http://localhost:3001/file-upload';
const headers = [{ name: "Access-Control-Request-Headers", value: "content-type" }];

@Component({
  selector: 'file-upload-button',
  templateUrl: './file-upload-button.html'
})
export class FileUploadButtonComponent {
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
  @Input() uploadedImage : Array<UploadFile[]>;
  @Input() uploadLimit : string;
  @Output() uploadedImages = new EventEmitter();
  el: HTMLInputElement;
  constructor() {
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
    this.uploadedImage = [];
  }

  onUploadOutput(output: UploadOutput): void {
    
    if(output.type === "done"){
      debugger;
      this.uploadedImages.emit(this.files);
    }
    if (output.type === 'allAddedToQueue') { // when all files added in queue
      
    } else if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') { // add file to array when added
       if(this.files.length <= parseInt(this.uploadLimit)){
          this.files.push(output.file);
       }
      
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
      const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
    } else if (output.type === 'drop') {
      this.dragOver = false;
    }

  }

  startUpload(): void {
    const event: UploadInput = {
      type: 'uploadAll',
      url: URL,
      method: 'POST',
      data: { },
    };
    this.uploadInput.emit(event);
  }
  handleUpload(data: any): void {
        console.log(data);
        if (data && data.response) {
            data = JSON.parse(data.response);
        }
  }
  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
  }

  removeFile(id: string): void {
    this.uploadInput.emit({ type: 'remove', id: id });
  }

  removeAllFiles(): void {
    this.uploadInput.emit({ type: 'removeAll' });
  }
  fileDroped(event): void {
        this.startUpload();
  }
  changeFile(event){
      debugger;
      this.files.push(event.target.files);
      this.startUpload();
  }
}