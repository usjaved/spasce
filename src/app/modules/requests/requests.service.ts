import { Injectable } from '@angular/core';
import { IRequest } from './requests.interface';
import { GetRequestsQuery } from './graphql/queries';
import { Subject } from 'rxjs/Subject';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import {  RequestsInterface } from './graphql/schema';

@Injectable()
export class RequestsService {
    private requests: ApolloQueryObservable<RequestsInterface>;
    private apollo: Apollo;

    constructor(apollo: Apollo) {
        this.apollo = apollo;
    }
    get(): ApolloQueryObservable<RequestsInterface> {
        // Query requests data with observable variables
      /*  this.requests = this.apollo.watchQuery<RequestsInterface>({
            query: GetRequestsQuery,
        })
            // Return only posts, not the whole ApolloQueryResult
            .map(result => result.data.requests) as any; */
        return this.requests;
    }
    
}