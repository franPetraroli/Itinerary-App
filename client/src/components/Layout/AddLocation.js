import React, { Component } from 'react';
import { Grid, Container, Segment, Form, Button, TextArea } from 'semantic-ui-react';

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

class AddLocation extends Component {
  state = {
    name: '',
    country: '',
    region: '',
    city: '',
    duration: 0,
    description: ''
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleChangeDuration = event => {
    event.persist();
    const { innerText } = event.target;
    this.setState({
      duration: innerText
    });
  };

  handleChangeCountry = event => {
    event.persist();
    const { innerText } = event.target;
    this.setState({
      country: innerText
    });
  };
  handleChangeRegion = event => {
    event.persist();
    const { innerText } = event.target;
    this.setState({
      region: innerText
    });
  };

  handleChangeCity = event => {
    event.persist();
    const { innerText } = event.target;
    this.setState({
      city: innerText
    });
  };
  render() {
    const { name, country, city, region, duration, description } = this.state;
    return (
      <Container>
        <Form>
          <Segment>
            <Grid columns={3}>
              <Grid.Row>
                <Grid.Column width={10}>
                  <Form.Input
                    name="name"
                    label="Location name"
                    placeholder="Enter a name"
                    onChange={this.handleChange}
                    value={name}
                  />
                </Grid.Column>
                <Grid.Column width={6}>
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
                <Grid.Column>
                  <Form.Select
                    fluid
                    name="country"
                    label="Country"
                    placeholder="Country name"
                    defaultValue={country}
                    onChange={this.handleChangeCountry}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Form.Select
                    fluid
                    name="region"
                    label="Region"
                    placeholder="Region Name"
                    defaultValue={region}
                    onChange={this.handleChangeRegion}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Form.Select
                    fluid
                    name="city"
                    label="City"
                    placeholder="City name"
                    defaultValue={city}
                    onChange={this.handleChangeCity}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={16}>
                  <TextArea
                    name="description"
                    placeholder="Enter a Description"
                    onChange={this.handleChange}
                    value={description}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Form>
      </Container>
    );
  }
}

export default AddLocation;

{
  /* <Mutation mutation={ADD_ITINERARY} variables={{ name, duration, category, user, description }}>
      {() => {
        return (
          <Container>
            <Form>
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
              {children}
              <Button onClick={this.addChild}>Add Location</Button>
              <Button type="submit">Submit</Button>
            </Form>
          </Container>
        );
      }}
    </Mutation>; */
}
