import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { ApolloConsumer } from 'react-apollo';

const handleSignOut = (client, history) => {
  localStorage.setItem('token', '');
  client.resetStore();
  history.push('/');
};

const Signout = ({ history }) => (
  <ApolloConsumer>
    {client => {
      return (
        <Dropdown.Item
          onClick={() => handleSignOut(client, history)}
          text="Sign Out"
          icon="power"
        />
      );
    }}
  </ApolloConsumer>
);

export default withRouter(Signout);
