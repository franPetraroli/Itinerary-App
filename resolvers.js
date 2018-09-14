const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;

  return jwt.sign({ username, email }, secret, { expiresIn });
};

exports.resolvers = {
  Query: {
    getAllItineraries: async (root, args, { Itinerary }) => {
      return await Itinerary.find();
    },
    getCurrentUser: async (root, args, { currentUser, User }) => {
      if (!currentUser) return null;

      const user = await User.findOne({ username: currentUser.username }).populate({
        path: 'wishList',
        model: 'Itinerary'
      });
      return user;
    }
  },

  Mutation: {
    addItinerary: async (root, { name, duration, category, date, itinerary, likes, comments, user }, { Itinerary }) => {
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
    signinUser: async (root, { username, password }, { User }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error('User not found');
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error('Invalid Password');
      }
      return { token: createToken(user, process.env.SECRET, '1hr') };
    },
    signupUser: async (root, { username, email, password }, { User }) => {
      const user = await User.findOne({ username });
      if (user) {
        throw new Error('User already exists');
      }
      const newUser = await new User({
        username,
        email,
        password
      }).save();
      return { token: createToken(newUser, process.env.SECRET, '1hr') };
    }
  }
};
