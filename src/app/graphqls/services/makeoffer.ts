import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import { CreateSpacseOffer } from '../mutations/makeoffer';


@Injectable()
export class MakeOfferService {
    private apollo: Apollo;
    constructor(apollo: Apollo) {
        this.apollo = apollo;
    }
    CreateSpacseOffer(data): any {
        return this.apollo.mutate({
            mutation: CreateSpacseOffer,
            variables: data,
        })
    }
}