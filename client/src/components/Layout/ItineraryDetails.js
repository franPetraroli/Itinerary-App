import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import { GET_ITINERARY } from '../../queries/index';

const ItineraryDetails = ({ match }) => {
  const { _id } = match.params;
  return (
    <Query query={GET_ITINERARY} variables={{ _id }}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading</div>;
        if (error) return <div>Error</div>;
        console.log(data);

        return (
          <div>
            <h1>{data.getItinerary.name}</h1>
            <p>{data.getItinerary.category}</p>
            <p>{data.getItinerary.description}</p>
            <p>{data.getItinerary.duration}</p>
            <p>{data.getItinerary.country}</p>
            <p>{data.getItinerary.user}</p>
          </div>
        );
      }}
    </Query>
  );
};

export default withRouter(ItineraryDetails);
