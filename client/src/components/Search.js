import React from 'react';
import { Query } from 'react-apollo';
import { Input, Container } from 'semantic-ui-react';
import { SEARCH_ITINERARIES } from '../queries';
import Itinerary from '../components/Layout/Itinerary';

const Search = () => (
  <Query query={SEARCH_ITINERARIES} variables={{ searchTerm: '' }}>
    {({ data, loading, error }) => {
      if (loading) return <div>Loading</div>;
      if (error) return <div>Error</div>;
      console.log(data);

      return (
        <Container>
          <Input placeholder="Search..." />
          {data.searchItineraries.map(itinerary => (
            <Itinerary key={itinerary._id} itinerary={itinerary} />
          ))}
        </Container>
      );
    }}
  </Query>
);

export default Search;
