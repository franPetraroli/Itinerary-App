const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

require('dotenv').config({ path: './variables.env' });

const Itinerary = require('./models/Itinerary')
const User = require('./models/User')
const cors = require('cors')

//Bring in GRaphQl Middleware
const { graphqlExpress, graphiqlExpress} = require ('apollo-server-express')
const { makeExecutableSchema } = require ('graphql-tools')

const { typeDefs } = require('./schema')
const { resolvers } = require('./resolvers')

//Create graphql schema 
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

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
}
app.use(cors('*'))

//Connect to graphi ql application
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}))

//Connect Schema with graphql
app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema,
  context:{
    Itinerary, 
    User
  }
}))

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
