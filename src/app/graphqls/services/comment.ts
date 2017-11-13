import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import { createComment } from '../mutations/comment';

@Injectable()
export class CommentService {
    private apollo: Apollo;
    constructor(apollo: Apollo) {
        this.apollo = apollo;
    }
    createComment(data): any {
        return this.apollo.mutate({
            mutation: createComment,
            variables: data,
        })
    }

    
  
}