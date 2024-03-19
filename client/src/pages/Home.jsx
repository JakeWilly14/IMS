import SideBar from '../components/SideBar/SideBar'
import Conversation from '../components/Conversation/Conversations'
import AuthService from '../utils/auth';

const Home = () => {
  const loggedIn = AuthService.loggedIn();
  const profile = loggedIn ? AuthService.getProfile() : null;

  return (
    <div className="app-container">
      {loggedIn && <SideBar />}
      {loggedIn ? (
        <Conversation username={profile.username} />
      ) : (
        <div>Please log in to view this page</div>
      )}
    </div>
  );
}

export default Home
