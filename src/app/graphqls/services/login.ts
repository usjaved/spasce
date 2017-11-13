import { createUser } from './../mutations/user';
import { LoginQuery, LoginWithSession } from './../queries/login';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import { LoginUserInterface, LoginUserDetailInterface } from '../schemas/login';
import { loginWithFacebook, loginWithGoogle, signUpLinkedIN } from '../mutations/user';

@Injectable()
export class LoginService {
    private users: ApolloQueryObservable<LoginUserInterface>;
    private apollo: Apollo;

    constructor(apollo: Apollo) {
        this.apollo = apollo;
    }

    execute(email, password): any {
        return this.apollo.watchQuery<LoginUserInterface>({
            query: LoginQuery,
            variables: { "email": email, "password": password }
        });
    }
    loginWithSticky(): any {
        var id = localStorage.getItem("loginSession");
        return this.apollo.watchQuery<LoginUserDetailInterface>({
            query: LoginWithSession,
            variables: { "id": id }
        });
    }

    signUp(data): any {
        return this.apollo.mutate({
            mutation: createUser,
            variables: data
        })
    }
    signUpFacebook(data): any {
        return this.apollo.mutate({
            mutation: loginWithFacebook,
            variables: data
        })
    }
    signUpGoogle(data): any {
        return this.apollo.mutate({
            mutation: loginWithGoogle,
            variables: data
        })
    }
    signUpLinkedIN(data): any {
        return this.apollo.mutate({
            mutation: signUpLinkedIN,
            variables: data
        })
    }
}