import gql from 'graphql-tag';

export const createUser = gql`
    mutation createUser($firstName: String, $lastName: String, $dateOfBirth: String $email: String, $password: String, $status: String) {
        createUser(firstName: $firstName, lastName: $lastName , dateOfBirth: $dateOfBirth , email: $email, password: $password, status: $status) {
            code
            message
        }
    }
`;

export const loginWithFacebook = gql`
mutation loginWithFacebook($firstName: String, $lastName: String, $dateOfBirth: String $email: String, $password: String, $status: String, $fbid: String) {
    loginWithFacebook(firstName: $firstName, lastName: $lastName , dateOfBirth: $dateOfBirth , email: $email, password: $password, status: $status, fbid: $fbid) {
        _id
    }
}`;


export const loginWithGoogle = gql`
mutation loginWithGoogle($firstName: String, $lastName: String, $dateOfBirth: String $email: String, $password: String, $status: String, $gid: String, $profilePic: String) {
    loginWithGoogle(firstName: $firstName, lastName: $lastName , dateOfBirth: $dateOfBirth , email: $email, password: $password, status: $status, gid: $gid, profilePic: $profilePic) {
        _id
    }
}`;

export const signUpLinkedIN = gql`
mutation signUpLinkedIN($firstName: String, $lastName: String, $dateOfBirth: String $email: String, $password: String, $status: String, $likedInId: String, $profilePic: String) {
    signUpLinkedIN(firstName: $firstName, lastName: $lastName , dateOfBirth: $dateOfBirth , email: $email, password: $password, status: $status, likedInId: $likedInId, profilePic: $profilePic) {
        _id
    }
}`;


export const updateUser = gql`
    mutation updateUser($_id: String,  $firstName: String, $lastName: String, $dateOfBirth: String $email: String, $password: String, $status: String, $mobile: String, $about: String, $profilePic: String) {
        updateUser(_id: $_id , firstName: $firstName, lastName: $lastName , dateOfBirth: $dateOfBirth , email: $email, password: $password, status: $status, mobile: $mobile, about: $about, profilePic : $profilePic) {
                        code
                        message
        }
    }
`;

export const createUserAccountSetting = gql`
mutation createUserAccountSetting($userId: String, $recievesmsNotification: String, $generalNotification: String, $reservationNotification: String, $accountactivityNotification: String){
    createUserAccountSetting(userId: $userId, smsNotification: $recievesmsNotification, generalNotification: $generalNotification, reservationNotification: $reservationNotification, accountNotification: $accountactivityNotification){
      code
      message
    }
}
`;

export const updatePassword = gql`
mutation updatePassword($userId: String, $oldpassword: String, $newpassword: String, $confirmpassword: String){
     updatePassword(_id: $userId, oldpassword: $oldpassword, newpassword: $newpassword, confirmpassword: $confirmpassword){
         code
         message
     }
}
`;
export const createPaymentMethod = gql`
mutation createPaymentMethod($userId: String, $accounttype: String, $firstName: String ,$lastName: String ,$routingNo: String,$accountNo: String) {
    createPaymentMethod(userId: $userId , accounttype: $accounttype, firstName: $firstName ,lastName: $lastName ,routingNo: $routingNo,accountNo: $accountNo) {
        _id
        userId
        accounttype
        firstName
        lastName
        routingNo
        accountNo
    }
}
`;
export const createFavourite = gql`
mutation createFavourite($spacseId: String, $userId: String) {
    createFavourite(spacseId: $spacseId, userId: $userId) {
        code
        message
    }
}
`;