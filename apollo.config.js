import { ApolloClient, InMemoryCache } from '@apollo/client/core';

// Configure the Apollo Client
export const apolloClient = new ApolloClient({
  uri: 'http://localhost:8080/v1/graphql', // Your Hasura GraphQL endpoint
  cache: new InMemoryCache(),             // Cache for optimized data fetching
  headers: {
    // Optionally include a static Authorization header for testing
    // Replace 'your-jwt-token' with an actual token during development
    Authorization: `Bearer your-jwt-token`
  },
});
