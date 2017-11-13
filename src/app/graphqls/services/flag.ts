import { CreateRequestFlag } from '../mutations/flag';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';


@Injectable()
export class FlagService {
    private apollo: Apollo;
    constructor(apollo: Apollo) {
        this.apollo = apollo;
    }
    createRequestFlag(data): any {
        return this.apollo.mutate({
            mutation: CreateRequestFlag,
            variables: data,
        })
    }

    
  
}