import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './index.css';
import App from './components/App';
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import Search from './components/Search';
import Create from './components/Admin/Create';
import MyItineraries from './components/Admin/MyItineraries';
import MyNetwork from './components/Admin/MyNetwork';
import Profile from './components/Admin/Profile';
import Settings from './components/Admin/Settings';
import ItineraryDetails from './components/Layout/ItineraryDetails';
import WithSession from './components/WithSession';
import NavBar from './components/Nav/NavBar';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
  fetchOptions: {
    credentials: 'include'
  },
  request: operation => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token
      }
    });
  },
  onError: {
    if(networkError) {
      console.log('Network Error', networkError);
    }
  }
});

const Root = ({ refetch, session }) => (
  <Router>
    <Fragment>
      <NavBar session={session} refetch={refetch} />
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/search" component={Search} />
        <Route path="/create" render={() => <Create session={session} />} />
        <Route path="/itinerary/:_id" component={ItineraryDetails} />
        <Route path="/myitineraries" component={MyItineraries} />
        <Route path="/mynetwork" component={MyNetwork} />
        <Route path="/profile" render={() => <Profile session={session} />} />
        <Route path="/settings" component={Settings} />
        <Route path="/signin" render={() => <Signin refetch={refetch} />} />
        <Route path="/signup" render={() => <Signup refetch={refetch} />} />
        <Redirect to="/" />
      </Switch>
    </Fragment>
  </Router>
);

const RootWithSession = WithSession(Root);

ReactDOM.render(
  <ApolloProvider client={client}>
    <RootWithSession />
  </ApolloProvider>,
  document.getElementById('root')
);
