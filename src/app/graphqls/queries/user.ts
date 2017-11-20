import gql from 'graphql-tag';

export const userProfile = gql`
query userProfile($_id: String!) {
    user(_id: $_id) {
        _id
        firstName
        lastName
        email
        profilePic
        mobile
        about
    }
}
`;
export const getAccountSetting = gql`
query getAccountSetting($_id: String!){
    user(_id: $_id)
    {
        _id
        accountsetting
        {
            _id
            smsNotification
            generalNotification
            reservationNotification
            accountNotification
        }
    }
}
`;
export const getUserRequests = gql`
    query  userRequests($userId: String!)
    {
        userRequests(userId: $userId)
        {
                _id
                createdAt
                startDate
                endDate
                unReadMessageCount
                budgetId
                timeDuration
                city
                state
                userId
                description
                otherCategoryTitle
                spaces(loginUserId: $userId){
                    _id
                    spacse{
                      _id
                      userId
                      title
                      address
                    }
                }
                category{
                            title
                            _id
                         }
                user {
                          _id
                          firstName
                          lastName
                          profilePic
                     }
              
                capacity {
                          _id
                          title
                          maximumValue
                }
                comments{
                            _id
                           user{
                               _id
                                firstName
                                  lastName
                                  profilePic
                            }
                         comment
                         photoUrl
                         commentType
                         createdAt
                }
                spaces(loginUserId: $userId){
                    _id
                    spacse{
                      _id
                      userId
                      title
                      address
                    }
                    user{
                      _id
                      firstName
                      lastName
                    }
                  }
               messages(loginUserId: $userId){
                      _id
                        comment
                        createdAt
                        senderId
                        receiverId
                        photoUrl
                        sender{
                            _id
                          firstName
                          lastName
                          profilePic
                        }
                         receiver{
                             _id
                          firstName
                          lastName
                          profilePic
                        }
                        tour{
                            _id
                            status
                            startTime
                            endTime
                            tourDate
                        }
                }
                budget {
                        _id
                        title
                        minimum
                        maximum
                }
        }
    }
`;

export const getMessageListByUser = gql`
query profileMessages($userId: String!){
    profileMessages(userId : $userId){
        _id
        senderId
        receiverId
        requestId
        request{
            _id
            description
        }
        comment
        createdAt
        request{
         _id
         description
       }
       sender{
         lastName
         firstName
         profilePic
         _id
       }
       receiver{
         lastName
         firstName
         profilePic
         _id
       }
     }
}`


export const getFullMessageHistoryForUser = gql`
query getFullMessageHistoryForUser($senderId: String!, $requestId: String!, $receiverId: String!, $time : String){
    request(_id: $requestId){
        _id
        userId
    }
    getFullMessageHistoryForUser(senderId: $senderId, requestId : $requestId, receiverId : $receiverId, time : $time){
            _id
            comment
            createdAt
            senderId
            receiverId
            photoUrl
            sender{
              _id
              firstName
              lastName
              profilePic
            }
            receiver{
              _id
              firstName
              lastName
              profilePic
            }
            tour{
                _id
                tourDate
                startTime
                endTime
            }
            requestTransaction{
                _id
                amount
                reason
                status
                createdAt
            }
    }
}`

export const getUserSpaceBooking = gql`
 query user($userId: String!)
 {
     user(_id:$userId)
      {
        _id
        bookings
        {
            _id
            amount 
            reason 
            startDate 
            endDate 
            timeFrame 
            timeFrameType 
            transactionId 
            status
            paymentStatus
            rate 
            createdAt 
            spacse
            {
                _id
                squareFootArea
                address
                city
                state
                country  
                title
                subTitle
                coverPictire
                TotalReview
                AvgReview
                capacity
                {
                  _id
                  title
                }
                spacsePhotoGallery
                {
                  _id
                  imageUrl
                }
                user
                {
                    _id
                    firstName
                    lastName
                    profilePic
                }
            }
        }
    }   
 }
`
    ;

export const getuserSpacseOffers = gql`
query user($userId: String!)
{
    user(_id:$userId)
    {
        _id
        spacseOffers
        {
          _id
          hoursNeeded
          offerPrice
          startDate
          endDate
          createdAt
          status
        }
    }
}
`;
export const getSpacebookings = gql`
 query getSpacebookings($userId: String!){
    getBookingStatistics(userId: $userId) {
        code
        message
        totalRecords
        totalInquiry
        totalTours
        totalOffers
    }
    getSpacebookings(userId: $userId){
      _id
      spaceId
      spacse{
        _id
        title
      }
      user{
        firstName
        lastName
      }
      status
      createdAt
      paymentStatus
      startDate
      endDate
      amount
      timeFrame
      timeFrameType
    }
  }
`
export const getAllStatistics = gql`
query getAllStatistics($userId: String!){
    getStatistics(userId: $userId)
    {
        code
        message
        totalBookings
        totalRevenue
        avgRevenue
    }
    getStatisticsByMonth(userId: $userId)
    {
        code
        message
        totalBookings
        totalRevenue
        avgRevenue
    }
    getStatisticsByLastMonth(userId: $userId)
    {
        code
        message
        totalBookings
        totalRevenue
        avgRevenue
    }
    getStatisticsByYear(userId: $userId)
    {
        code
        message
        totalBookings
        totalRevenue
        avgRevenue
    }
}`;

export const getUserPaymentMethods = gql`
query user($userId: String!){
    user(_id: $userId){
        paymentmethods{
            accountNo
            routingNo
            accounttype
            lastName
            firstName
        }
    }
}
`;

export const getUserFavouriteSpacses = gql`
query user($userId: String!){
    user(_id: $userId) {
        _id
        favourites {
          _id
          spacse {
            _id
            squareFootArea
            address
            city
            state
            country  
            title
            subTitle
            coverPictire
            TotalReview
            AvgReview
            capacity
            {
              _id
              title
            }
            
          }
        }
      }  
}
`;
export const getreviews = gql`
query user($userId: String!){
    user(_id: $userId) {
         _id
        reviews {
          _id
          spacseId
          bookingId
        }
      }
}
`;

export const getOfferListing = gql`
query getOfferListing($userId: String!){
    getSendSpacseOffers(userId: $userId) {
        _id
        sender {
          _id
          firstName
          lastName
        }
        receiver {
          _id
          firstName
          lastName
        }
        hoursNeeded
        offerPrice
        startDate
        endDate
        createdAt
         spacse {
          _id
          title
          description
        }
      }

      getReceiveSpacseOffers(userId: $userId) {
        _id
        sender {
          _id
          firstName
          lastName
        }
        receiver {
          _id
          firstName
          lastName
        }
        hoursNeeded
        offerPrice
        startDate
        endDate
        createdAt
        spacse {
          _id
          title
          description
        }
      }
}
`;

export const userPublicInfoProfile = gql`
query userPublicInfoProfile($_id: String!) {
    user(_id: $_id) {
        _id
        firstName
        lastName
        profilePic
        createdAt
        about
    }
    getApprovedSpace(userId:$_id){
        _id
        title
        subTitle
        address
        coverPictire
        squareFootArea
        category{
            _id
            title
        }
        capacity{
            _id
            title
            maximumValue
        }
    }
    submittedReviews(userId : $_id) {
        _id
        comment
        user{
            firstName
            lastName
            profilePic
            about
        }
    }
    receivedReview(userId : $_id) {
        _id
        comment
        user{
            firstName
            lastName
            profilePic
            about
        }
    }
}`;

export const getOfferMessages = gql`
query getOfferMessages($userId: String!){
    getOfferMessages(userId :$userId){
    _id
    requestedId
    sender {
      _id
      firstName
      profilePic
      lastName      
    }
    spacse {
      _id
      title
    }
    receiver {
      _id
      firstName
      lastName
      profilePic
      
    }
    spacseoffers {
      _id
      offerPrice
      startDate
      endDate
      hoursNeeded
    }
    message
    createdAt
  }
}
`;

export const getFullOfferMessageHistories = gql`
query getFullOfferMessageHistoryForUser($senderId: String! , $receiverId: String!, $requestedId: String! ,$time: String) {
    getFullOfferMessageHistoryForUser(senderId: $senderId , receiverId: $receiverId, requestedId: $requestedId , time:$time){
    spacseoffers(_id: $requestedId){
            _id
            startDate
            endDate
            hoursNeeded
            offerPrice
    }
    _id
    createdAt
    message
    sender {
      _id
      firstName
      lastName
      profilePic
      
    }
    receiver {
      _id
      firstName
      lastName
      profilePic
    }
}
 }`;
