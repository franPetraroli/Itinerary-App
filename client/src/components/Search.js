import React, { Component } from 'react';
import { ApolloConsumer } from 'react-apollo';
import { Input, Container } from 'semantic-ui-react';
import { SEARCH_ITINERARIES } from '../queries';
import Itinerary from '../components/Layout/Itinerary';

class Search extends Component {
  state = {
    searchResults: []
  };

  handleChange = ({ searchItineraries }) => {
    this.setState({
      searchResults: searchItineraries
    });
  };

  render() {
    const { searchResults } = this.state;

    return (
      <ApolloConsumer>
        {client => (
          <div className="App">
            <h2 className="main-title">Search for Recipes</h2>
            <Input
              type="search"
              placeholder="Search..."
              onChange={async event => {
                event.persist();
                const { data } = await client.query({
                  query: SEARCH_ITINERARIES,
                  varables: { serchTerm: event.target.value }
                });
                this.handleChange(data);
              }}
            />
            <ul>
              {searchResults.map(itinerary => (
                <Itinerary key={itinerary._id} itinerary={itinerary} />
              ))}
            </ul>
          </div>
        )}
      </ApolloConsumer>
      // <ApolloConsumer>
      //   {client => {
      //     <Container>
      //       <Input
      //         type="search"
      //         placeholder="Search..."
      //         onChange={async event => {
      //           event.persist();
      //           const { data } = await client.query({
      //             query: SEARCH_ITINERARIES,
      //             varables: { serchTerm: event.target.value }
      //           });
      //           this.handleChange(data);
      //         }}
      //       />
      //       {searchResults.map(itinerary => (
      //         <Itinerary key={itinerary._id} itinerary={itinerary} />
      //       ))}
      //     </Container>;
      //   }}
      // </ApolloConsumer>
    );
  }
}

export default Search;
