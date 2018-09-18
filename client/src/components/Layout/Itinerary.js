import React from 'react';
import { Segment, Button, Item, List, Icon } from 'semantic-ui-react';
import ItineraryDetails from './ItineraryDetails';
import { Link } from 'react-router-dom';

const Itinerary = ({ itinerary }) => {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            {/* <Item.Image size="tiny" circular src="" /> */}
            <Item.Content>
              <Item.Header as="a">{itinerary.name}</Item.Header>
              <Item.Description>
                by <a>{itinerary.user}</a>
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" /> {itinerary.duration} Days
        </span>
      </Segment>
      <Segment secondary>
        <List horizontal>{itinerary.description}</List>
      </Segment>
      <Segment clearing>
        <Button
          as={Link}
          to={`/itinerary/${itinerary._id}`}
          color="blue"
          floated="right"
          content="View"
        />
      </Segment>
    </Segment.Group>
  );
};

export default Itinerary;
