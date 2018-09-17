import React, { Component } from 'react';
import { Input, Form, Segment, Button, Header, Grid, Container } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import { SIGNIN_USER } from '../../queries';
import Error from '../Error';
import { withRouter } from 'react-router-dom';

const initialState = {
  username: '',
  password: ''
};

class Signin extends Component {
  state = { ...initialState };

  clearState = () => {
    this.setState({ ...initialState });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event, signinUser) => {
    event.preventDefault();

    signinUser().then(async ({ data }) => {
      console.log(data);

      localStorage.setItem('token', data.signinUser.token);
      await this.props.refetch;
      this.clearState();
      this.props.history.push('/');
    });
  };

  validateForm = () => {
    const { username, password } = this.state;
    const isInvalid = !username || !password;

    return isInvalid;
  };

  render() {
    const { username, password } = this.state;
    return (
      <Container style={{ marginTop: '150px' }}>
        <Grid centered>
          <Segment style={{ width: '420px' }} centered>
            <Mutation mutation={SIGNIN_USER} variables={{ username, password }}>
              {(signinUser, { data, loading, error }) => {
                return (
                  <Form onSubmit={event => this.handleSubmit(event, signinUser)}>
                    <Form.Field>
                      <Header as="h2">Sign In</Header>
                    </Form.Field>
                    <Form.Field>
                      <Input
                        value={username}
                        onChange={this.handleChange}
                        name="username"
                        type="text"
                        placeholder="Username"
                        fluid
                        style={{ width: '370px', margin: '0 auto' }}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Input
                        value={password}
                        onChange={this.handleChange}
                        name="password"
                        type="password"
                        placeholder="Password"
                        fluid
                        style={{ width: '370px', margin: '0 auto' }}
                      />
                    </Form.Field>
                    <Button positive type="submit" disabled={loading || this.validateForm()}>
                      Signin
                    </Button>
                    {error && <Error error={error} />}
                  </Form>
                );
              }}
            </Mutation>
          </Segment>
        </Grid>
      </Container>
    );
  }
}

export default withRouter(Signin);
