import { gql } from 'apollo-boost'

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