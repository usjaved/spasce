import gql from 'graphql-tag';

export const CreateSpacseOffer =gql`
 mutation createSpacseOffer($senderId: String, $receiverId: String ,$spacseId: String, $startDate: String, $endDate: String, $hoursNeeded: String, $offerPrice: String, $status: String ){
    createSpacseOffer(senderId: $senderId,receiverId: $receiverId, spacseId: $spacseId, startDate: $startDate, endDate: $endDate, hoursNeeded: $hoursNeeded, offerPrice: $offerPrice, status: $status ){
          _id
    }
}
`;
        