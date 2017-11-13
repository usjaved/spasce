import gql from 'graphql-tag';

export const createContactToHost = gql`
 mutation createContactToHost($spacseId: String, $userId: String, $startDate: String, $endDate: String, $isDateFlexible: String, $comment: String, $status: String ){
    createContactToHost( spacseId: $spacseId, userId: $userId, startDate: $startDate, endDate: $endDate, isDateFlexible: $isDateFlexible, comment:  $comment, status:  $status){
       _id
       user
       {
           _id
           firstName
           lastName
           profilePic
       }
    }    
 }
 `;