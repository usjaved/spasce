import { getSpacessQuery, GetHomePageDetails, searchSpaceByTitle } from './../queries/space';
import { CreateSpace, UpdatePrice, UploadImages, createSpaceStep2, createSpaceStep3, createSpaceStep5, setPrivate } from './../mutations/space';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import { spaceNewFormDetail, getFilterSpacessQuery, getSpaceDetail, getSpaceDetailForEdit, gatAllSpace, usersListing, getEditSpaceDetail, getUsersActiveSpace, similerSpasce } from '../queries/space';
// import { CategoriesInterface } from './../schemas/spaces';
import { CreateSpaceAmenities, CreateUserPaymentInfo, UpdateSecurityDeposit, UpdateAdditionalFees, SubmitForApproval, createSpaceStep1, createSpaceStep4, createSpaceStep6, BookSpacse, UpdateStatus, updateBookingStatus, createSpacseReview } from '../mutations/space';
import { getSpacebookings } from '../queries/user';

interface CategoriesInterface {
    categories: Array<{
        _id: string
        name: string
        isSelected: string
    }> | null;
}


@Injectable()
export class SpacesService {
    private apollo: Apollo;
    private categories: ApolloQueryObservable<CategoriesInterface>;
    constructor(apollo: Apollo) {
        this.apollo = apollo;
    }

    getNewFormOptions(): any {
        return this.apollo.watchQuery<any>({
            query: spaceNewFormDetail,
            fetchPolicy: 'network-only',
        });
    }

    createSpace(data): any {
        return this.apollo.mutate({
            mutation: CreateSpace,
            variables: data
        })
    }

    createSpaceAmenities(data): any {
        return this.apollo.mutate({
            mutation: CreateSpaceAmenities,
            variables: data
        })
    }

    createUserPaymentInfo(data): any {
        return this.apollo.mutate({
            mutation: CreateUserPaymentInfo,
            variables: data
        })
    }

    createSpacseReview(data):any{
        return this.apollo.mutate({
            mutation:createSpacseReview,
            variables:data
        })
    }

    getSpaceDetail(id): any {
        var data = { "id": id } //userId : localStorage.getItem("loginUserId") }
        return this.apollo.watchQuery<any>({
            query: getSpaceDetail,
            variables: data,
            fetchPolicy: 'network-only',

        })

    }
    getEditSpaceDetail(id): any {
        var data = { "id": id , userId : localStorage.getItem("loginUserId") }
        return this.apollo.watchQuery<any>({
            query: getEditSpaceDetail,
            variables: data,
            fetchPolicy: 'network-only',
        })
    }
    updatePrice(data): any {
        return this.apollo.mutate({
            mutation: UpdatePrice,
            variables: data
        })
    }
    updatesecurityDeposit(data): any {
        return this.apollo.mutate({
            mutation: UpdateSecurityDeposit,
            variables: data
        })
    }

    updateAdditionalFees(data): any {
        return this.apollo.mutate({
            mutation: UpdateAdditionalFees,
            variables: data
        })
    }

    uploadPictures(data): any {
        return this.apollo.mutate({
            mutation: UploadImages,
            variables: data
        })
    }

    submitForApproval(data): any {
        return this.apollo.mutate({
            mutation: SubmitForApproval,
            variables: data
        })
    }
    setPrivate(data): any {
        return this.apollo.mutate({
            mutation: setPrivate,
            variables: data
        })
    }
    getSpaces() {
        return this.apollo.watchQuery<any>({
            query: getSpacessQuery,
            fetchPolicy: 'network-only',
        });
    }

    getFilterSpaces(data) {
        return this.apollo.watchQuery<any>({
            query: getFilterSpacessQuery,
            variables: data,
            fetchPolicy: 'network-only',
        });
    }
    getHomePageDetails(data) {
        return this.apollo.watchQuery<any>({
            query: GetHomePageDetails,
            variables: data,
            fetchPolicy: 'network-only',
        });
    }
    getSpacseDetailForEdit(data) {
        return this.apollo.watchQuery<any>({
            query: getSpaceDetailForEdit,
            variables: data,
            fetchPolicy: 'network-only',
        });
    }


    gatAllSpace(data) {
        return this.apollo.watchQuery<any>({
            query: gatAllSpace,
            variables: data,
            fetchPolicy: 'network-only',
        });
    }


    /// create Space with steps.

    createSpaceStep1(data): any {
        return this.apollo.mutate({
            mutation: createSpaceStep1,
            variables: data
        });
    }
    createSpaceStep2(data): any {
        return this.apollo.mutate({
            mutation: createSpaceStep2,
            variables: data
        });
    }
    createSpaceStep3(data): any {
        return this.apollo.mutate({
            mutation: createSpaceStep3,
            variables: data
        });
    }
    createSpaceStep4(data): any {
        return this.apollo.mutate({
            mutation: createSpaceStep4,
            variables: data
        });
    }
    createSpaceStep5(data): any {
        return this.apollo.mutate({
            mutation: createSpaceStep5,
            variables: data
        });
    }
    createSpaceStep6(data): any {
        return this.apollo.mutate({
            mutation: createSpaceStep6,
            variables: data
        });
    }

    bookSpacse(data): any {
        return this.apollo.mutate({
            mutation: BookSpacse,
            variables: data
        })
    }

    updateBookingStatus(data): any {
        return this.apollo.mutate({
            mutation: updateBookingStatus,
            variables: data
        })
    }

    updateStatus(data): any {
        return this.apollo.mutate({
            mutation: UpdateStatus,
            variables: data
        })
    }

    usersListing(data): any {
        return this.apollo.watchQuery<any>({
            query: usersListing,
            variables: data,
            fetchPolicy: 'network-only',
        });
    }

    getSpacebookings(data): any {
        return this.apollo.watchQuery<any>({
            query: getSpacebookings,
            variables: data,
            fetchPolicy: 'network-only',
        });
    }

    getUsersActiveSpace(data): any {
        return this.apollo.watchQuery<any>({
            query: getUsersActiveSpace,
            variables: data,
            fetchPolicy: 'network-only',
        });
    }
    searchSpaceByTitle(keyWord): any {
        var data = { "keyWord" : keyWord }
        return this.apollo.watchQuery<any>({
            query: searchSpaceByTitle,
            variables: data,
            fetchPolicy: 'network-only',
        });
    }
    getSimilerSpace(data): any {
       // var data = { "categoryId" : categoryId }
        return this.apollo.watchQuery<any>({
            query: similerSpasce,
            variables: data,
            fetchPolicy: 'network-only',
        });
    }
}