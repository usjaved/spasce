import gql from 'graphql-tag';

export const CreateRequestFlag = gql`
mutation createRequestFlag($flagId: String, $flagReason: String, $userId: String, $type: String){
    createRequestFlag(flagId: $flagId, reasons:  $flagReason, userId: $userId, type: $type){
        _id
        user
        {
             _id
             firstName
             lastName
        }
        createdAt
    }
}
`;

