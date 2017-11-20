import {
    getFullMessageHistoryForUser,
    getMessageListByUser,
    getOfferMessages,
    getreviews,
    getUserPaymentMethods,
    userProfile,
    userPublicInfoProfile,
} from './../queries/user';
import { getSpacessQuery } from './../queries/space';
import { CreateSpace, UpdatePrice, UploadImages } from './../mutations/space';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import { spaceNewFormDetail, getFilterSpacessQuery, getSpaceDetail } from '../queries/space';
// import { CategoriesInterface } from './../schemas/spaces';
import { CreateSpaceAmenities } from '../mutations/space';
import {
    createFavourite,
    createOffermessage,
    createPaymentMethod,
    createUserAccountSetting,
    updatePassword,
    updateUser,
} from '../mutations/user';
import { getAllStatistics, getSpacebookings, getAccountSetting, getUserRequests, getUserSpaceBooking, getuserSpacseOffers, getUserFavouriteSpacses, getOfferListing, getFullOfferMessageHistories } from '../queries/user';

interface CategoriesInterface {
    categories: Array<{
        _id: string
        name: string
        isSelected: string
    }> | null;
}


@Injectable()
export class UserService {
    private apollo: Apollo;
    private categories: ApolloQueryObservable<CategoriesInterface>;
    constructor(apollo: Apollo) {
        this.apollo = apollo;
    }

    getUserProfile(id): any {
        var data = { _id: id };
        return this.apollo.watchQuery<any>({
            query: userProfile,
            fetchPolicy: 'network-only',
            variables: data

        });
    }
    userPublicInfoProfile(id): any {
        var data = { _id: id };
        return this.apollo.watchQuery<any>({
            query: userPublicInfoProfile,
            fetchPolicy: 'network-only',
            variables: data

        });
    }
    updateUser(data): any {
        return this.apollo.mutate({
            mutation: updateUser,
            variables: data
        });
    }
    createUserAccountSetting(data): any {
        return this.apollo.mutate({
            mutation: createUserAccountSetting,
            variables: data
        });
    }

    createUserFavouriteSpacse(data):any{
        return this.apollo.mutate({
            mutation: createFavourite,
            variables: data
        });
    }
    getAccountSetting(userId): any {
            var data ={_id: userId};
            return this.apollo.watchQuery<any>({
                query: getAccountSetting,
                fetchPolicy: 'network-only',
                variables: data
            });
    } 

    updatePassword(data):any{
        return this.apollo.mutate({
            mutation: updatePassword,
            variables: data
        });
    }

    getUserRequests(userId):any{
        var data ={userId: userId}
        return this.apollo.watchQuery<any>({
            query:getUserRequests,
            fetchPolicy: 'network-only',
            variables : data
        });
    }
    getMessageListByUser():any{
        var data ={userId: localStorage.getItem("loginUserId")}
        return this.apollo.watchQuery<any>({
            query:getMessageListByUser,
            fetchPolicy: 'network-only',
            variables : data
        });
    }
    getFullMessageHistoryForUser(data):any{
        return this.apollo.watchQuery<any>({
            query: getFullMessageHistoryForUser,
            fetchPolicy: 'network-only',
            variables : data,
        });
    }
 getUserSpacseBooking(userId):any{
    var data = { userId: userId };
        return this.apollo.watchQuery<any>({
            query:getUserSpaceBooking,
            fetchPolicy: 'network-only',
            variables: data
        });
    }
    getUserSpacseOffers(userId):any{
        var data = {userId: userId};
        return this.apollo.watchQuery<any>({
            query: getuserSpacseOffers,
            fetchPolicy: 'network-only',
            variables: data
        })
    }

    getUserStatistics(userId):any{
        var data ={userId: userId};
        return this.apollo.watchQuery<any>({
            query:  getAllStatistics ,
            fetchPolicy: 'network-only',
            variables: data
        })
    }
    createPaymentMethod(data):any{
        return this.apollo.mutate({
            mutation: createPaymentMethod,
            variables : data
        }) 
    }
    getUserPaymentMethods(userId):any{
        var data = {userId: userId};
        return this.apollo.watchQuery<any>({
            query: getUserPaymentMethods,
            fetchPolicy: 'network-only',
            variables : data
        })
    }
    getUserFavouriteSpacses(data):any{

        return this.apollo.watchQuery<any>({
            query: getUserFavouriteSpacses,
            fetchPolicy: 'network-only',
            variables : data
        })
    }
     getReview(userId):any{
         var data = {userId: userId};
        return this.apollo.watchQuery<any>({
            query:getreviews,
            variables: data
        }) 
     }

     getOfferListing(userId):any{
         var data = {userId: userId};
         return this.apollo.watchQuery<any>({
             query: getOfferListing,
             variables :data
         })
     }

     getofferMessagesList():any{
         var data = {userId: localStorage.getItem("loginUserId") }
         return this.apollo.watchQuery<any>({
             query: getOfferMessages,
             variables : data
         })   
    }

    getFullOfferMessageHistories(data):any{
        return this.apollo.watchQuery<any>({
            query: getFullOfferMessageHistories,
            variables: data
        })  
    }

    createOfferMessage(data):any{
        return this.apollo.mutate({
            mutation: createOffermessage,
            variables: data
        })
    }
}