import Auth from "../../../utils/auth";
import { useNavigate } from "react-router-dom";

import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';

export default function Logout(){

  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = (event) => {
    event.preventDefault();
    Auth.logout(navigate('/login'));
  }

  return (
    <>
      <MDBBtn 
        className='position-absolute m-3 bottom-0 end-0' 
        onClick={handleLogout}>
        <MDBIcon fas icon="sign-out-alt" />
      </MDBBtn>
    </>
  )
}