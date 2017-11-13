import { ApolloClient, createNetworkInterface } from 'apollo-client';

// by default, this client will send queries to `/graphql` (relative to the URL of your app)
const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: localStorage.getItem("webUrl") + '/graphiql', 
    opts: {
      cache : "no-cache"
    }
  }),
});