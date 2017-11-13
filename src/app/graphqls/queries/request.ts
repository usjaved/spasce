import gql from 'graphql-tag';

export const NewRequestArributes = gql`
     query categories{
        categories{
            _id
            title
        }
        properyCapacities{
            _id
            title  
        }
        budgets{
            _id
            title
        }
    }
`;
export const getFiteredRequests = gql`
     query requests($loginUserId: String){
        requests{
            _id
            createdAt
            startDate
            endDate
            budgetId
            timeDuration
            address
            city
            state
            description
            userId
            otherCategoryTitle
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
           spaces(loginUserId: $loginUserId){
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
           messages(loginUserId: $loginUserId){
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
              profilePic
            }
            receiver{
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
            requestTransaction{
                _id
                amount
                reason
                status
                createdAt
            }
          }
          budget {
                _id
                title
                minimum
                maximum
            }
        }
      
    }`;

export const getRequestDetailForEdit = gql`
    query request($id : String){
        request(_id : $id){
            _id
            createdAt
            startDate
            endDate
            budgetId
            timeDuration
            address
            state
            otherCategoryTitle
            description
            userId
            categoryId
            capacityId
            budget{
                _id
                title
            }
        }
    }`;

export const getRequestDetail = gql`
    query request($id:String, $loginUserId: String){
        request(_id:$id){
            _id
            createdAt
            startDate
            endDate
            budgetId
            timeDuration
            address
            city
            state
            otherCategoryTitle
            description
            userId
            user {
              _id
              firstName
              lastName
              profilePic
            }
            category {
              _id
              title
            }
            capacity {
              _id
              title
              maximumValue
            }
            spaces(loginUserId: $loginUserId){
                _id
                spacse{
                  _id
                  title
                  address
                }
                user{
                  _id
                  firstName
                  lastName
                }
              }
            comments {
                _id
               user {
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
            messages(loginUserId: $loginUserId){
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
                  profilePic
                }
                receiver{
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
                requestTransaction{
                    _id
                    amount
                    reason
                    status
                    createdAt
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

export const getFilterRequestsQuery = gql`
query filterRequests($capacity: [String], $category: [String], $city: String, $state: String, $loginUserId: String, $limit : Int, $pageNo : Int){
   filterRequests(capacity: $capacity, category: $category, city: $city, state: $state,  limit : $limit, pageNo: $pageNo ){
        _id
        createdAt
        startDate
        endDate
        budgetId
        timeDuration
        address
        city
        state
        description
        userId
        otherCategoryTitle
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
       spaces(loginUserId: $loginUserId){
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
       messages(loginUserId: $loginUserId){
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
          profilePic
        }
        receiver{
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
        requestTransaction{
            _id
            amount
            reason
            status
            createdAt
        }
      }
      budget {
            _id
            title
            minimum
            maximum
        }
  }
}`;


export const getSimilerRequest = gql`
query getSimilerRequest($limit: Int, $categoryId: String){
    getSimilerRequest(limit : $limit, categoryId: $categoryId){
        _id
        createdAt
        startDate
        endDate
        budgetId
        timeDuration
        address
        city
        state
        description
        userId
        otherCategoryTitle
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
        budget {
           _id
           title
           minimum
           maximum
       }
   }
 
}`;

