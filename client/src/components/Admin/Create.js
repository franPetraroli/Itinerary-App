import React, { Component } from 'react';
import { Grid, Container, Segment, Form, Button, TextArea } from 'semantic-ui-react';
// import AddLocation from '../Layout/AddLocation';
import { Mutation } from 'react-apollo';
import { ADD_ITINERARY, GET_ALL_ITINERARY } from '../../queries';
import Error from '../Error';
import { withRouter } from 'react-router-dom';

const days = [
  { key: '1', text: '1', value: '1' },
  { key: '2', text: '2', value: '2' },
  { key: '3', text: '3', value: '3' },
  { key: '4', text: '4', value: '4' },
  { key: '5', text: '5', value: '5' },
  { key: '6', text: '6', value: '6' },
  { key: '7', text: '7', value: '7' },
  { key: '8', text: '8', value: '8' },
  { key: '9', text: '9', value: '9' },
  { key: '10', text: '10', value: '10' },
  { key: '11', text: '11', value: '11' },
  { key: '12', text: '12', value: '12' },
  { key: '13', text: '13', value: '13' },
  { key: '14', text: '14', value: '14' }
];

const categories = [
  { key: 'f', text: 'Family', value: 'Family' },
  { key: 'c', text: 'Culture', value: 'Culture' },
  { key: 'r', text: 'Romantic', value: 'Romantic' },
  { key: 're', text: 'Relax', value: 'Relax' },
  { key: 's', text: 'Solo', value: 'Solo' }
];

const initialState = {
  name: '',
  duration: 0,
  category: '',
  description: '',
  user: '',
  locationsNum: 0,
  user: '',
  locations: []
};

class Create extends Component {
  state = { ...initialState };

  componentDidMount() {
    if (this.props.session.getCurrentUser) {
      this.setState({
        user: this.props.session.getCurrentUser.username
      });
    }
  }

  clearState = () => {
    this.setState({ ...initialState });
  };

  // addChild = () => {
  //   this.setState({
  //     locationsNum: this.state.locationsNum + 1
  //   });
  // };

  handleSubmit = (event, addItinerary) => {
    event.preventDefault();

    addItinerary().then(({ data }) => {
      console.log(data);
      this.clearState();
      this.props.history.push('/');
    });
  };

  handleChangeCategory = event => {
    event.persist();
    const { innerText } = event.target;
    this.setState({
      category: innerText
    });
  };
  handleChangeDuration = event => {
    event.persist();
    const { innerText } = event.target;
    var name = event.target.getAttribute('name');
    this.setState({
      duration: innerText
    });
  };
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  validateForm = () => {
    const { name, duration, category, user, description } = this.state;
    const isInvalid = !name || !category || !description || !duration;
    return isInvalid;
  };

  updateCache = (cache, { data: { addItinerary } }) => {
    const { getAllItineraries } = cache.readQuery({ query: GET_ALL_ITINERARY });

    cache.writeQuery({
      query: GET_ALL_ITINERARY,
      data: {
        getAllItineraries: [addItinerary, ...getAllItineraries]
      }
    });
  };

  render() {
    // const locations = [];
    const { name, duration, category, user, description } = this.state;
    // for (var i = 0; i < this.state.locationsNum; i += 1) {
    //   locations.push(<AddLocation />);
    // }
    return (
      <Mutation
        mutation={ADD_ITINERARY}
        variables={{ name, duration, category, user, description }}
        update={this.updateCache}
      >
        {(addItinerary, { data, loading, error }) => {
          return (
            <Container>
              <Form onSubmit={event => this.handleSubmit(event, addItinerary)}>
                <Segment>
                  <Grid columns={3} divided>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Input
                          name="name"
                          label="Itinerary name"
                          placeholder="Enter a name"
                          onChange={this.handleChange}
                          value={name}
                        />
                      </Grid.Column>
                      <Grid.Column>
                        <Form.Select
                          fluid
                          name="category"
                          label="Category"
                          options={categories}
                          placeholder="Pick a category"
                          defaultValue={category}
                          onChange={this.handleChangeCategory}
                        />
                      </Grid.Column>
                      <Grid.Column>
                        <Form.Select
                          fluid
                          name="duration"
                          label="Duration"
                          options={days}
                          placeholder="How many Days..."
                          defaultValue={duration}
                          onChange={this.handleChangeDuration}
                        />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column width={16}>
                        <TextArea
                          name="description"
                          placeholder="Enter a Description"
                          onChange={this.handleChange}
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Segment>
                {/* {locations} */}
                {/* <Button onClick={this.addChild}>Add Location</Button> */}
                <Button disabled={loading || this.validateForm()} type="submit">
                  Submit
                </Button>
                {error && <Error error={error} />}
              </Form>
            </Container>
          );
        }}
      </Mutation>
    );
  }
}

export default withRouter(Create);
