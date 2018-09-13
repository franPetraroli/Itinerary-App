const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const createToken = (user, secret, expiresIn)=>{

  const { username, email } = user

  return jwt.sign({ username, email }, secret, {expiresIn})
}

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
      },

      signupUser: async (root, { username, email, password }, { User }) => {
      const user = await User.findOne({ username });
      if (user) {
        throw new Error("User already exists");
      }
      const newUser = await new User({
        username,
        email,
        password
      }).save();
      return { token: createToken(newUser, process.env.SECRET, "1hr") };
    }
  }
}