import { Broadcaster } from '../../utility/broadcaster';
import { LoginComponent } from './../../modules/login/login.component';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Modal, BSModalContext } from 'ngx-modialog/plugins/bootstrap';
import { LoginService } from '../../graphqls/services/login';
import { CommentService } from '../../graphqls/services/comment';


@Component({
    selector: 'comment-list',
    templateUrl: 'comment-list.component.html'
})

export class CommentListComponent implements OnInit {

    @Input() comments: Array<any>;
    @Input() name: String;
    @Input() requestId: String;
    @Output() newComments = new EventEmitter();
    profilePic;
    limit = 5;
    comment;
    //isLoading = false;
    writableComment: Array<any>

    constructor(public modal: Modal,
        private broadcaster: Broadcaster,
        public _commentServic: CommentService) {
        this.writableComment = [];
        this.profilePic = localStorage.getItem("profilePic");
        console.log(this.profilePic);
    }

    ngOnInit() {
        for (var i = 0; i < this.comments.length; i++) {
            this.writableComment.push(this.comments[i]);
        }

    }

    addComment() {
        if (localStorage.getItem("loginUserId")) {

            var data: any;
            data = {};
            data.requestId = this.requestId;
            data.comment = this.comment;
            data.userId = localStorage.getItem("loginUserId");
            this._commentServic.createComment(data).subscribe(res => {
                this.comment = "";
                this.comments = [res.data.createComment].concat(this.comments);
                this.newComments.emit(this.comments);
            }, error => {
            })
        } else {
            this.broadcaster.broadcast("loginOpen", "login");
        }

    }

    loadMore() {
        this.limit += 5;
    }
}