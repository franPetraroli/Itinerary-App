const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

require('dotenv').config({ path: './variables.env' });

const Itinerary = require('./models/Itinerary');
const User = require('./models/User');
const cors = require('cors');

//Bring in GRaphQl Middleware
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

//Create graphql schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

//Connect Database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('DB Connected'))
  .catch(err => console.log(err));

//Initialise App
const app = express();

const corsOptions = {
  origin: 'http://loacalhost:3000',
  credentials: true
};
app.use(cors('corsOptions'));

//Set up JWT Authentication
app.use(async (req, res, next) => {
  const token = req.headers['authorization'];
  console.log(token);
  if (token !== 'null') {
    try {
      const currentUser = await jwt.verify(token, process.env.SECRET);
      req.currentUser = currentUser;
    } catch {
      console.log(err);
    }
  }
  next();
});

//Connect to graphi ql application
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

//Connect Schema with graphql
app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(({ currentUser }) => ({
    schema,
    context: {
      Itinerary,
      User,
      currentUser
    }
  }))
);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
