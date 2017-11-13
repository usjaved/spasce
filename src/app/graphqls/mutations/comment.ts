import gql from 'graphql-tag';

export const createComment = gql`
    mutation createComment($userId: String, $requestId: String, $comment: String, $photoUrl: String, $commentType: String, $transactionId: String, $repliedToCommentId: String) {
        createComment(userId: $userId,requestId: $requestId, comment: $comment,photoUrl: $photoUrl,commentType: $commentType, transactionId: $transactionId, repliedToCommentId: $repliedToCommentId) {
            _id
            user{
                firstName
                lastName
                profilePic
            }
            comment
            photoUrl
            commentType
            transactionId
            createdAt
        }
    }
`;




