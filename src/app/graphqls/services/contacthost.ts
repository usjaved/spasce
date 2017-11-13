import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import { createContactToHost } from '../mutations/contacthost';


@Injectable()
export class ContactToHostService {
    private apollo: Apollo;
    constructor(apollo: Apollo) {
        this.apollo = apollo;
    }
    createContactToHost(data): any {
        return this.apollo.mutate({
            mutation: createContactToHost,
            variables: data,
        })
    }

    
  
}