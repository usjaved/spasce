import gql from 'graphql-tag';

export const GetUser = gql`
     query user($id: ID!) {
        post(id: $id) {
            _id
            title
            content
            
        }
    }
`;

export const GetUsersQuery = gql`
  query Users {
    users{
        _id
      firstName
      lastName
    }
  }
`;

export const GetFeatureSpaces = gql`
    query{
        spacses{
            _id
            title
            subTitle
            address
            state
            city
            squareFootArea
            createdAt
            description
            user{
               _id
               firstName
               lastName
            }
            category{
                _id
                title
            }
            capacity{
                _id
                title
            }
        }
    }`;