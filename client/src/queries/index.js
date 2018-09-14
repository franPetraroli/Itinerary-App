import { gql } from 'apollo-boost';

//Itinerary queries
export const GET_ALL_ITINERARY = gql`
  query {
    getAllItineraries {
      name
      description
      duration
      itinerary {
        name
        country
        city
        duration
        description
      }
      likes
      comments {
        comment
        user
      }
      user
    }
  }
`;

//Itinerary Mutation
//User Query
export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      username
      joinDate
      email
    }
  }
`;

//User Mutation
export const SIGNUP_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signupUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

export const SIGNIN_USER = gql`
  mutation($username: String!, $password: String!) {
    signinUser(username: $username, password: $password) {
      token
    }
  }
`;
