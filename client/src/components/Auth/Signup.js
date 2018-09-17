import React, { Component } from 'react';
import { Input, Form, Segment, Button, Header, Grid, Container } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import { SIGNUP_USER } from '../../queries';
import Error from '../Error';
import { withRouter } from 'react-router-dom';

const inititalState = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: ''
};

class Signup extends Component {
  state = { ...inititalState };

  clearState = () => {
    this.setState({ ...inititalState });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event, signupUser) => {
    event.preventDefault();

    signupUser().then(async ({ data }) => {
      console.log(data);

      localStorage.setItem('token', data.signinUser.token);
      await this.props.refetch;
      this.clearState();
      this.props.history.push('/');
    });
  };

  validateForm = () => {
    const { username, email, password, passwordConfirmation } = this.state;
    const isInvalid = !username || !email || password !== passwordConfirmation;

    return isInvalid;
  };

  render() {
    const { username, email, password, passwordConfirmation } = this.state;
    return (
      <Container style={{ marginTop: '150px' }}>
        <Grid centered>
          <Segment style={{ width: '420px' }} centered>
            <Mutation mutation={SIGNUP_USER} variables={{ username, email, password }}>
              {(signupUser, { data, loading, error }) => {
                return (
                  <Form className="form" onSubmit={event => this.handleSubmit(event, signupUser)}>
                    <Form.Field>
                      <Header as="h2">Sign Up</Header>
                    </Form.Field>
                    <Form.Field>
                      <Input
                        onChange={this.handleChange}
                        value={username}
                        placeholder="Username"
                        type="text"
                        name="username"
                        fluid
                        style={{ width: '370px', margin: '0 auto' }}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Input
                        onChange={this.handleChange}
                        value={email}
                        placeholder="Email"
                        type="email"
                        name="email"
                        fluid
                        style={{ width: '370px', margin: '0 auto' }}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Input
                        onChange={this.handleChange}
                        value={password}
                        type="password"
                        name="password"
                        placeholder="Password"
                        fluid
                        style={{ width: '370px', margin: '0 auto' }}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Input
                        onChange={this.handleChange}
                        value={passwordConfirmation}
                        type="password"
                        name="passwordConfirmation"
                        placeholder="Password Confirmation"
                        fluid
                        style={{ width: '370px', margin: '0 auto' }}
                      />
                    </Form.Field>
                    <Button positive type="submit" disabled={loading || this.validateForm()}>
                      Signup
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

export default withRouter(Signup);
