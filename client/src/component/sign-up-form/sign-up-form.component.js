import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './sign-up-form.styles.scss';

class SignUpform extends Component {
  state = {
    email: '',
    password: '',
    confirmPassword: '',
    error_message: '',
    validated: false,
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { email, password, confirmPassword } = this.state;
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.setState({ validated: true });

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    axios
      .post('http://localhost:5000/signup', {
        email,
        password,
      })
      .then((response) => {
        //console.log('sign up success');
        console.log(response);
        this.props.history.push('/secrets');
      })
      .catch((err) => {
        console.log(err.response.data.error);
        this.setState({ error_message: err.response.data.error });
        this.props.history.push('/signup');
      });
  };

  render() {
    return (
      <div className='sign-up-form'>
        <Form
          noValidate
          validated={this.state.validated}
          onSubmit={this.handleSubmit}
        >
          <Form.Group controlId='formBasicEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              type='email'
              name='email'
              placeholder='Enter Email'
              value={this.state.email}
              onChange={this.handleChange}
            />
            <Form.Control.Feedback type='invalid'>
              Please enter a username.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type='password'
              name='password'
              placeholder='Password'
              value={this.state.password}
              onChange={this.handleChange}
            />
            <Form.Control.Feedback type='invalid'>
              Please enter password.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId='formBasicPassword'>
            <Form.Label>Comfirm Password</Form.Label>
            <Form.Control
              required
              type='password'
              name='confirmPassword'
              placeholder='Password'
              value={this.state.confirmPassword}
              onChange={this.handleChange}
            />
            <Form.Control.Feedback type='invalid'>
              Please enter password again.
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant='primary' type='submit'>
            Register
          </Button>
          <p className='alert'>{this.state.error_message}</p>
        </Form>
      </div>
    );
  }
}

export default withRouter(SignUpform);
