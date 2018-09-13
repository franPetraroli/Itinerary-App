exports.resolvers = {
  Query:{
    getAllItineraries: async (root, args, {Itinerary})=>{
      return await Itinerary.find()
    }
  },
  Mutation: {
    addItinerary: async (root, {
      name,
      duration,
      category,
      date,
      itinerary,
      likes,
      comments,
      user}, { Itinerary })=>{
        const newItinerary = await new Itinerary({
          name,
          duration,
          category,
          date,
          itinerary,
          likes,
          comments,
          user
        }).save();
        return newItinerary;
      }
  }
}