import gql from 'graphql-tag';

export const LoginQuery  = gql`
     query login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            _id
        }
    }
`;

export const LoginWithSession  = gql`
     query loginSession($id: String!) {
        loginSession(_id: $id) {
            _id,
            user{
                _id
                firstName,
                lastName,
                profilePic
            }
        }
    }
`;
