import gql from 'graphql-tag';

export const RemoveUserMutation = gql`
    mutation removeUser($id: ID!) {
        removeUser(id: $id) {
            id
        }
    }
`;

export const UpdateUserMutation = gql`
    mutation updateUser($id: ID!, $data: PostInput) { 
        updatePost(id: $id, data: $data) { 
            id  
            name
        }
    }
`;

export const AddUserMutation = gql`
    mutation addUser($data: PostInput!) {
        addUser(data: $data)
    }
`;