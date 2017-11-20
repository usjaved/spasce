
import gql from 'graphql-tag';

export const CreateRequest = gql`
mutation createRequest($userId : String, $startDate : String,$endDate : String,$address : String,$city : String,$state : String,$country : String,$otherCategoryTitle : String,$categoryId : String,$capacityId : String,$budgetId : String,$description : String,$timeDuration : String, $status : String){
    createRequest(userId : $userId, startDate : $startDate, endDate : $endDate, address : $address, city : $city, state : $state, country : $country ,otherCategoryTitle : $otherCategoryTitle , categoryId : $categoryId , capacityId : $capacityId, budgetId : $budgetId, description : $description , timeDuration : $timeDuration, status : $status){
        _id
    }
}
`;

export const UpdateRequest = gql`
mutation updateRequest($id: String, $userId : String, $startDate : String,$endDate : String,$address : String,$city : String,$state : String,$country : String,$otherCategoryTitle : String,$categoryId : String,$capacityId : String,$budgetId : String,$description : String,$timeDuration : String, $status : String ,$createdAt: String){
    updateRequest(_id: $id, userId : $userId, startDate : $startDate, endDate : $endDate, address : $address, city : $city, state : $state, country : $country ,otherCategoryTitle : $otherCategoryTitle , categoryId : $categoryId , capacityId : $capacityId, budgetId : $budgetId, description : $description , timeDuration : $timeDuration, status : $status,createdAt: $createdAt){
                code
                message
    }
}
`;


export const SendRequestMessage = gql`
mutation createMessage($senderId : String, $receiverId : String, $requestId : String, $spacseId : String,  $comment : String, $photoUrl: String, $tourId: String, $transactionId: String){
    createMessage(senderId : $senderId, receiverId : $receiverId, requestId : $requestId, spacseId : $spacseId, comment : $comment, photoUrl: $photoUrl , tourId: $tourId, transactionId : $transactionId){
        _id
        comment
        createdAt
        senderId
        receiverId
        photoUrl
        spacse{
            _id
            title
            address
        }
        sender{
          firstName
          lastName
        }
        receiver{
          firstName
          lastName
        }
        tour{
            _id
            status
            startTime
            endTime
            tourDate
          }
        requestTransaction{
            _id
            amount
            reason
            status
            createdAt
        }
    }
}
`;


export const TourRequest = gql`
mutation createSpacseTour($userId : String, $requestId : String, $tourDate : String, $startTime: String, $endTime: String){
    createSpacseTour(userId : $userId, propertyId : $requestId, tourDate : $tourDate, startTime : $startTime, endTime: $endTime){
        _id
    }
}
`;

export const PaymentRequest = gql`
mutation createRequestTransaction($userId: String, $requestId: String, $amount: String, $reason: String, $transactionType: String, $transactionInfo: String, $status: String, $requestTransactionId: String){
    createRequestTransaction( userId: $userId, requestId: $requestId, amount :  $amount, reason: $reason, transactionType: $transactionType, transactionInfo: $transactionInfo, status: $status, requestTransactionId: $requestTransactionId){
        _id
    }
}
`;

export const DoPayment = gql`
mutation doPayment($userId: String, $token: String, $requestId: String, $amount: String, $reason: String, $transactionType: String, $transactionInfo: String, $status: String, $requestTransactionId: String){
    doPayment( userId: $userId, token: $token requestId: $requestId, amount :  $amount, reason: $reason, transactionType: $transactionType, transactionInfo: $transactionInfo, status: $status, requestTransactionId: $requestTransactionId){
        code
    }
}`;
export const UpdateRequestCounter = gql`
mutation updateRequestCounter($requestId: String,$userId: String){
    updateRequestCounter(requestId: $requestId,userId: $userId)
    {
        code
        message
    }
}`;

export const submitSpaces = gql`
mutation submitSpaces($requestId: String,$userId: String, $spacsesId: [String], $spaceLink : String, $description : String){
    submitSpacesForRequest(requestId: $requestId,userId: $userId, spacsesId: $spacsesId, spaceLink : $spaceLink, description: $description)
    {
        code
        message
    }
}`;
export const UpdateRequestStatus  = gql`
mutation updateRequestStatus($requestIds: [String], $status: String) {
    updateRequestStatus(requestIds : $requestIds , status : $status) {
        code
    }
}
`;
