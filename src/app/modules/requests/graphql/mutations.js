import gql from 'graphql-tag';

export const RemoveRequestMutation = gql`
    mutation removeRequest($id: ID!) {
        removeRequest(id: $id) {
            id
            title
        }
    }
`;
