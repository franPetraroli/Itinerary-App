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
    name: String!
    duration: Int!
    category: String!
    description: String
    date: String
    itinerary: [Location]!
    likes: Int
    comments: [Comment]
    user: String
  }
  input ItineraryInput {
    name: String!
    duration: Int!
    category: String!
    description: String
    date: String
    itinerary: [LocationInput]!
    likes: Int
    comments: [CommentInput]
    user: String
  }
  
  type User {
    username: String! @unique
    email: String! @unique
    password: String!
    joinDate: String
    wishList:[Itinerary]
  }


  type Query {
    getAllItineraries:[Itinerary]
  }

  type Mutation {
    addItinerary(
      name: String!,
      duration: Int!,
      category: String!,
      description: String,
      date: String,
      itinerary: [LocationInput]!,
      likes: Int,
      comments: [CommentInput],
      user: String
    ): Itinerary
  }
`
