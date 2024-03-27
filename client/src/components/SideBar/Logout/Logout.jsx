import Auth from "../../../utils/auth";
import { useNavigate } from "react-router-dom";

import { MDBIcon } from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button';

export default function Logout(){

  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = (event) => {
    event.preventDefault();
    Auth.logout(navigate('/login'));
  }

  return (
    <>
      <Button 
        className='position-absolute m-3 bottom-0 end-0' 
        onClick={handleLogout}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(10px)",
        }}>
        <MDBIcon fas icon="sign-out-alt" 
          style={{
            backgroundImage: "linear-gradient(to right, #ff00cc, #333399)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}/>
      </Button>
    </>
  )
}