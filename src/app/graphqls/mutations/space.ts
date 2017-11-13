import gql from 'graphql-tag';

export const CreateSpace = gql`
    mutation createSpacse($spaceId: String, $userId: String, $categoryId: String, $capacityId: String, $numberOfRooms: String, $numberOfRestRooms: String, $squareFootArea: String, $address: String, $city: String, $state: String, $country: String, $latitude: String, $longitude: String, $title: String, $subTitle: String, $description: String, $coverPictire: String, $status: String, $securityDeposit: String, $additionalFees: String, $aminities: [String], $avaibilities: [AvaibilityTimeInput],  ) {
        createSpacse(_id : $spaceId, userId: $userId, categoryId: $categoryId, capacityId:  $capacityId, numberOfRooms: $numberOfRooms, numberOfRestRooms: $numberOfRestRooms, squareFootArea: $squareFootArea, address: $address, city: $city, state: $state, country: $country, latitude: $latitude, longitude: $longitude, title: $title, subTitle: $subTitle, description: $description, coverPictire: $coverPictire, status : $status, securityDeposit: $securityDeposit, additionalFees: $additionalFees, aminities : $aminities, avaibilities : $avaibilities) {
            _id
        }
    }
`;

export const UpdatePrice = gql`
    mutation updatePrice($pricing: [PricingLayerInput]) {
        updatePrice(pricing : $pricing) {
            code
        }
    }
`;

export const UpdateSecurityDeposit =gql`
    mutation updateSecurityDeposit($spacseId: String,$securityDeposit: String){
            updateSecurityDeposit(spacseId: $spacseId, securityDeposit: $securityDeposit) {
                code
            }
    }

`;

export const UpdateAdditionalFees =gql`
    mutation updateAdditionalFees($spacseId: String,$additionalFees: String){
        updateAdditionalFees(spacseId: $spacseId, additionalFees: $additionalFees){
            code
        }
    }
`;

export const UploadImages = gql`
    mutation uploadImages($spacseId: String, $coverPic : String , $photoGellary: [String]) {
        uploadImages(spacseId : $spacseId, coverPic : $coverPic, photoGellary: $photoGellary) {
            code
        }
    }
`;

export const SubmitForApproval  = gql`
mutation submitForApproval($spacseId: String, $status: String) {
    submitForApproval(spacseId : $spacseId, status : $status) {
        code
    }
}
`;

export const setPrivate  = gql`
mutation setPrivate($spacseId: String, $isPrivate: String) {
    setPrivate(spacseId : $spacseId, isPrivate : $isPrivate) {
        code
    }
}
`;


export const UpdateStatus  = gql`
mutation updateStatus($spacseIds: [String], $status: String) {
    updateStatus(spacseIds : $spacseIds , status : $status) {
        code
    }
}
`;

export const updateBookingStatus  = gql`
mutation updateBookingStatus($id: String, $status: String) {
    updateBookingStatus(id : $id , status : $status) {
        code
    }
}
`;

export const CreateSpaceAmenities = gql`
    mutation  createSpacseAmenities($amenitiesIds: [String] , $spacseId: String) { 
        createSpacseAmenities(amenitiesId : $amenitiesIds, spacseId : $spacseId)
        {
            _id
        }
    }
`;

export const CreateSpaceRequest = gql`
    mutation createRequest($city: String, $state: String, $contry: String, $categoryId: String, $capacityId: String, $properyBookingDurationHourId: String, $userId: String, $startDate: String, $endDate: String, $budget: String, $description: String){
        createRequest(city: $city, state: $state, contry:  $contry, categoryId: $categoryId, capacityId: $capacityId, properyBookingDurationHourId: $properyBookingDurationHourId, userId: $userId, startDate: $startDate, endDate: $endDate, budget: $budget, description: $description)
        {
            _id
        }
    }
`;

export const CreateUserPaymentInfo = gql`
    mutation createUserPaymentInfo($paymentType: String, $spacseId: String, $userId: String, $bankInfo: String, $routingNo: String, $accounttype: String, $accountNo: String ,$email: String){
        createUserPaymentInfo(paymentType : $paymentType, spacseId: $spacseId, userId: $userId, bankInfo: $bankInfo, routingNo: $routingNo, accounttype: $accounttype, accountNo: $accountNo,email:$email)
        {
            _id
        }
    }
`;



export const createSpaceStep1 =gql`
mutation createSpaceStep1($spacseId: String, $categoryId: [String], $userId: String){
    createSpaceStep1(spacseId: $spacseId, categoryId: $categoryId, userId: $userId){
        code
        id
    }
}
`;



export const createSpaceStep2 =gql`
mutation createSpaceStep2($spacseId: String, $userId: String, $capacityId: String, $numberOfRooms: String, $numberOfRestRooms: String, $squareFootArea: String){
    createSpaceStep2(spacseId: $spacseId, userId: $userId, capacityId: $capacityId numberOfRooms: $numberOfRooms, numberOfRestRooms: $numberOfRestRooms, squareFootArea: $squareFootArea){
        code
        id
    }
}
`;

export const createSpaceStep3 =gql`
mutation createSpaceStep3($spacseId: String, $aminities: [String], $userId: String){
    createSpaceStep3(spacseId: $spacseId, aminities: $aminities, userId: $userId){
        code
        id
    }
}
`;


export const createSpaceStep4 =gql`
mutation createSpaceStep4($spacseId: String, $userId: String, $address: String, $state: String, $city: String, $country: String, $latitude: String, $longitude: String){
    createSpaceStep4(spacseId: $spacseId, userId: $userId, address : $address, state: $state, city: $city, country: $country, latitude: $latitude, longitude: $longitude){
        code
        id
    }
}
`;


export const createSpaceStep5 =gql`
mutation createSpaceStep5($spacseId: String, $userId: String, $avaibilities: [AvaibilityTimeInput]){
    createSpaceStep5(spacseId: $spacseId, userId: $userId, avaibilities: $avaibilities){
        code
        id
    }
}
`;

export const createSpaceStep6 =gql`
mutation createSpaceStep6($spacseId: String, $userId: String, $title: String, $subTitle: String, $description: String){
    createSpaceStep6(spacseId: $spacseId, userId: $userId, title: $title, subTitle: $subTitle, description: $description){
        code
        id
    }
}
`;


export const BookSpacse = gql`
mutation bookSpacse($userId : String, $spaceId : String, $amount : Float, $reason : String, $token : String, $startDate : String, $endDate : String, $timeFrame : String, $timeFrameType : String, $rate : Float ) {
    bookSpacse(userId : $userId, spaceId : $spaceId, amount : $amount, reason : $reason, token : $token, startDate : $startDate, endDate : $endDate, timeFrame : $timeFrame, timeFrameType : $timeFrameType, rate : $rate ) {
        _id
    }
}
`;