import gql from 'graphql-tag';

export const CreateSpacseOffer =gql`
 mutation createSpacseOffer($userId: String, $spacseId: String, $startDate: String, $endDate: String, $hoursNeeded: String, $offerPrice: String, $status: String ){
    createSpacseOffer(userId: $userId, spacseId: $spacseId, startDate: $startDate, endDate: $endDate, hoursNeeded: $hoursNeeded, offerPrice: $offerPrice, status: $status ){
          _id
    }
}
`;
        