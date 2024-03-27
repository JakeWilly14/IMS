import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
import Button from 'react-bootstrap/Button';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from 'mdb-react-ui-kit';

function Login() {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login] = useMutation(LOGIN);
  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      
      // Check if token is valid before setting it in local storage
      if (token) {
        Auth.login(token);
        navigate('/');
      } else {
        // Handle invalid token
        console.error('Invalid user credentials.');
        window.alert('Invalid user credentials received. Please try again, or sign up to continue.');
      }
    } catch (error) {
      console.error('Login error:', error.message);
      window.alert('The provided credentials are incorrect.');
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
    <MDBContainer>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
          <MDBCard className='text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-5">Please enter your login and password!</p>
              <form className="d-flex flex-column align-items-center w-100" onSubmit={handleFormSubmit}>
                <MDBInput
                  wrapperClass='mb-4 mx-5 w-100'
                  labelClass='text-white'
                  label='Email address'
                  id='email'
                  type='email'
                  size="lg"
                  name="email"
                  value={formState.email}
                  onChange={handleChange} />
                <MDBInput
                  wrapperClass='mb-4 mx-5 w-100'
                  labelClass='text-white'
                  label='Password'
                  id='password'
                  type='password'
                  size="lg"
                  name="password"
                  value={formState.password}
                  onChange={handleChange} />
                <p className="small mb-3 pb-lg-2"><Link to="#!" className="text-white-50">Forgot password?</Link></p>
                <Button
                  type="submit"
                  className='mb-3 px-5'
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    backdropFilter: "blur(10px)",
                    backgroundImage: "linear-gradient(to right, #ff00cc, #333399)",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                  size='lg'
                >
                  Login
                </Button>
              </form>
              {formState.error && (
                <div>
                  <p className="error-text">{formState.error}</p>
                </div>
              )}
              <div>
                <p className="mb-0">Don`t have an account? <Link to="/signup" className="text-white-50 fw-bold">Sign Up</Link></p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
