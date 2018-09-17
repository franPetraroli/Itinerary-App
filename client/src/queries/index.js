import { gql } from 'apollo-boost';

//Itinerary queries
export const GET_ALL_ITINERARY = gql`
  query {
    getAllItineraries {
      _id
      name
      description
      duration
      likes
      user
    }
  }
`;
export const SEARCH_ITINERARIES = gql`
  query($searchTerm: String) {
    searchItineraries(searchTerm: $searchTerm) {
      _id
      name
      description
      duration
      likes
      user
    }
  }
`;
export const GET_ITINERARY = gql`
  query($_id: ID!) {
    getItinerary(_id: $_id) {
      _id
      name
      category
      description
      duration
      likes
      user
      comments {
        comment
        user
      }
      itinerary {
        name
        country
        region
        city
        duration
        description
      }
    }
  }
`;

//Itinerary Mutation

export const ADD_ITINERARY = gql`
  mutation(
    $name: String!
    $duration: Int!
    $category: String!
    $description: String
    $date: String
    $itinerary: [LocationInput]
    $likes: Int
    $comments: [CommentInput]
    $user: String
  ) {
    addItinerary(
      name: $name
      duration: $duration
      category: $category
      description: $description
      date: $date
      itinerary: $itinerary
      likes: $likes
      comments: $comments
      user: $user
    ) {
      _id
      name
      category
      description
      duration
      likes
      user
      comments {
        comment
        user
      }
      itinerary {
        name
        country
        region
        city
        duration
        description
      }
    }
  }
`;
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
