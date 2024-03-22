import SideBar from "../components/SideBar/SideBar";
import Conversation from '../components/Conversation/Conversations'
import AuthService from "../utils/auth";
import { MDBContainer } from "mdb-react-ui-kit";

const Home = () => {
  const loggedIn = AuthService.loggedIn();

  return (
    <MDBContainer
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      {loggedIn && <SideBar />}
      <Conversation />
    </MDBContainer>
  );
};

export default Home;
