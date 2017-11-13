import { GetFeatureSpaces } from './graphql/queries';
import { UsersInterface, DeleteUserInterface } from './graphql/schema';
import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';

@Injectable()
export class UsersService {
    private users: ApolloQueryObservable<UsersInterface>;
    private apollo: Apollo;

    constructor(apollo: Apollo) {
        this.apollo = apollo;
    }

    getFeatureSpaces(): any {
        return this.apollo.watchQuery<any>({
            query: GetFeatureSpaces,
        });
    }
}