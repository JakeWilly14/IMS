import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBRow,
  MDBInput,
}
from 'mdb-react-ui-kit';

function SignUp() {
  const [formState, setFormState] = useState({ 
    fullName: '',
    username: '', 
    email: '', 
    password: '', 
    confirmPassword: '',
  });

  const [signUp, { error }] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

     // Check if password and confirmPassword match
     if (formState.password !== formState.confirmPassword) {
      console.error('Passwords do not match');
      return; 
    }

    try {
      const { data } = await signUp({
        variables: { ...formState },
      });
      const token = data.signUp.token;
      Auth.login(token);
    } catch (err) {
      console.error('Error signing up:', err);
    }
  };

  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <MDBContainer fluid>
    <MDBRow className='d-flex justify-content-center align-items-center h-100'>
      <MDBCol col='12'>
        <MDBCard className='text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
          <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

            <h2 className="fw-bold mb-5">Sign up now</h2>

            <form className="d-flex flex-column align-items-center w-100" 
                onSubmit={handleFormSubmit}>
              <MDBInput 
                wrapperClass='mb-4 w-100' 
                placeholder="Full Name"
                label='Name' 
                id='fullName' 
                type='text'
                name="fullName"
                value={formState.fullName}
                onChange={handleChange} />
              <MDBInput 
                wrapperClass='mb-4 w-100' 
                placeholder="Choose a user name"
                label='Username' 
                id='username' 
                type='text'
                name="username"
                value={formState.username}
                onChange={handleChange} />
              <MDBInput 
                wrapperClass='mb-4 w-100'
                placeholder="Email Address" 
                label='Email' 
                id='email' 
                type='email' 
                name="email"
                value={formState.email}
                onChange={handleChange} />
              <MDBInput 
                wrapperClass='mb-4 w-100'
                placeholder="Secure Password" 
                label='Password' 
                id='password' 
                type='password' 
                name="password"
                value={formState.password}
                onChange={handleChange} />
                <MDBInput 
                wrapperClass='mb-4 w-100'
                placeholder="Confirm Password" 
                label='Confirm Password' 
                id='confirmPassword' 
                type='password' 
                name="confirmPassword"
                value={formState.confirmPassword}
                onChange={handleChange} />

              <MDBBtn className='w-100 mb-4' size='md'>Sign up</MDBBtn>
            </form>

            {error && (
              <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
            )}
            
            <div>
              <p className="mb-0">Already have an account? <Link to="/login" className="fw-bold">Login</Link></p>
            </div>

          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  </MDBContainer>
);
}

export default SignUp;