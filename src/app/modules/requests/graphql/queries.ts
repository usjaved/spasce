import gql from 'graphql-tag';

export const GetRequestDetailQuery= gql`
     query GetPostDetailQuery($id: ID!) {
        request(id: $id) {
            requestId
            title
            description
            category
            location
            capacity
        }
    }
`;

export const GetRequestsQuery = gql`
  query Requests {
    requests {
        requestId
        title
        description
        category
        location
        capacity
    }
  }
`;