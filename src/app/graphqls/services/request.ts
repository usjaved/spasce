import { PaymentRequest, DoPayment } from './../mutations/request';
import { NewRequestArributes, clearReadCount } from './../queries/request';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import { CreateRequest, SendRequestMessage, TourRequest, UpdateRequest, UpdateRequestCounter, submitSpaces, UpdateRequestStatus } from '../mutations/request';
import { getFiteredRequests, getRequestDetail, getRequestDetailForEdit, getFilterRequestsQuery, getSimilerRequest, getAllRequests } from '../queries/request';


@Injectable()
export class RequestService {
    private apollo: Apollo;

    constructor(apollo: Apollo) {
        this.apollo = apollo;
        
    }

    getNewFormOptions(): any {
        return this.apollo.watchQuery<any>({
            query: NewRequestArributes
        });
    }

    createRequest(data): any {
        return this.apollo.mutate({
            mutation: CreateRequest,
            variables: data
        })
    }

    
    updateRequest(data): any {
        return this.apollo.mutate({
            mutation: UpdateRequest,
            variables: data
        })
    }

    getFilterRequests(data) {
        return this.apollo.watchQuery<any>({
            query: getFiteredRequests,
            variables: data,
            fetchPolicy: 'network-only',            
        });
    }
    getSimilerRequest(data) {
        return this.apollo.watchQuery<any>({
            query: getSimilerRequest,
            variables: data   ,
            fetchPolicy: 'network-only',         
        });
    }
    getRequestDetail(data): any {
        return this.apollo.watchQuery<any>({
            query: getRequestDetail,
            variables: data,
            fetchPolicy: 'network-only',
        })

    }
    getRequestDetailForEdit(data): any {
        return this.apollo.watchQuery<any>({
            query: getRequestDetailForEdit,
            variables: data,
            fetchPolicy: 'network-only',
        })

    }
    sendMessage(data): any {
        return this.apollo.mutate({
            mutation: SendRequestMessage,
            variables: data
        })
    }
    tourRequest(data): any {
        return this.apollo.mutate({
            mutation: TourRequest,
            variables: data
        })
    }
    paymentRequest(data): any {
        return this.apollo.mutate({
            mutation: PaymentRequest,
            variables: data
        })
    }
    getFilterRequestsQuery(data) {
        return this.apollo.watchQuery<any>({
            query: getFilterRequestsQuery,
            variables: data,
            fetchPolicy: 'network-only',
        });
    }
    updateRequestCounter(data)
    {
        return this.apollo.mutate({
            mutation: UpdateRequestCounter,
            variables:data
        })
    }

    doPayment(data): any {
        return this.apollo.mutate({
            mutation: DoPayment,
            variables: data
        })
    }

    submitSpaces(data): any {
        return this.apollo.mutate({
            mutation: submitSpaces,
            variables: data
        })
    }

    getAllRequests(data): any{
        return this.apollo.watchQuery<any>({
            query: getAllRequests,
            variables: data
        })
    }
    updateRequestStatus(data):any{
        return this.apollo.mutate({
            mutation: UpdateRequestStatus,
            variables: data
        })
    }
    
    clearReadCount(data) {
        return this.apollo.watchQuery<any>({
            query: clearReadCount,
            variables: data,
            fetchPolicy: 'network-only',
        });
    }
}