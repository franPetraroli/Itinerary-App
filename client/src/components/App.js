import React from 'react';
import './App.css';
import { Container } from 'semantic-ui-react';
import Itinerary from './Layout/Itinerary';

import { Query } from 'react-apollo';
import { GET_ALL_ITINERARY } from '../queries';

const App = () => (
  <div className="App">
    <Query query={GET_ALL_ITINERARY}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading</div>;
        if (error) return <div>Error</div>;

        console.log(data);

        return (
          <Container>
            {data.getAllItineraries.map(itinerary => (
              <Itinerary key={itinerary._id} itinerary={itinerary} />
            ))}
          </Container>
        );
      }}
    </Query>
  </div>
);

export default App;
