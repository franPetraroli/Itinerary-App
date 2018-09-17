exports.typeDefs = `
  type Location {
    name: String!
    country: String
    region: String
    city: String
    duration: Int!
    description: String
  }

  input LocationInput {
    name: String!
    country: String
    region: String
    city: String
    duration: Int!
    description: String
  }

  type Comment {
    comment: String
    user: String
  }

  input CommentInput {
    comment: String
    user: String
  }
  type Itinerary {
    _id: ID
    name: String!
    duration: Int!
    category: String!
    description: String
    date: String
    itinerary: [Location]
    likes: Int
    comments: [Comment]
    user: String
  }
  input ItineraryInput {
    _id: ID
    name: String!
    duration: Int!
    category: String!
    description: String
    date: String
    itinerary: [LocationInput]
    likes: Int
    comments: [CommentInput]
    user: String
  }
  
  type User {
    _id: ID
    username: String! @unique
    email: String! @unique
    password: String!
    joinDate: String
    wishList:[Itinerary]
  }

  type Token {
    token: String!
  }


  type Query {
    getAllItineraries:[Itinerary]
    getCurrentUser: User
    getItinerary(_id: ID!): Itinerary
    searchItineraries(searchTerm: String): [Itinerary]
  }

  type Mutation {
    addItinerary(
      name: String!,
      duration: Int!,
      category: String!,
      description: String,
      date: String,
      itinerary: [LocationInput],
      likes: Int,
      comments: [CommentInput],
      user: String
    ): Itinerary

    signinUser(username: String!, password: String!): Token
    signupUser(username: String!, email: String!, password: String!): Token
  }
`;
