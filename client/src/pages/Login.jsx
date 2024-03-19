import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
}
from 'mdb-react-ui-kit';

function Login() {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
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

          <MDBCard className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px',}}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-5">Please enter your login and password!</p>
              
              <form 
                className="d-flex flex-column align-items-center w-100" 
                onSubmit={handleFormSubmit}>

                <MDBInput 
                  wrapperClass='mb-4 mx-5 w-100' 
                  labelClass='text-white' 
                  label='Email address' 
                  id='eamil' 
                  type='email' 
                  size="lg" 
                  name="email"
                  value={formState.email}
                  onChange={handleChange}/>
                <MDBInput 
                  wrapperClass='mb-4 mx-5 w-100' 
                  labelClass='text-white' 
                  label='Password' 
                  id='email' 
                  type='password' 
                  size="lg" 
                  name="password"
                  value={formState.password}
                  onChange={handleChange}/>

                <p className="small mb-3 pb-lg-2"><Link to="#!" className="text-white-50">Forgot password?</Link></p>

                <MDBBtn outline className='mx-2 px-5' style={{ color: 'white', borderColor: 'white' }} size='lg'>
                  Login
                </MDBBtn>

              </form>

              {error ? (
                <div>
                  <p className="error-text">The provided credentials are incorrect</p>
                </div>
              ) : null}

              <div>
                <p className="mb-0">Don't have an account? <Link to="/signup" className="text-white-50 fw-bold">Sign Up</Link></p>

              </div>
            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}

export default Login;