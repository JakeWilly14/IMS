import { useState } from 'react';
import SideBar from '../components/SideBar/SideBar';
import Conversation from '../components/Conversation/Conversations';
import AuthService from '../utils/auth';
import { MDBContainer } from 'mdb-react-ui-kit';

const Home = () => {
  const loggedIn = AuthService.loggedIn();

  const [selectedFriendId, setSelectedFriendId] = useState(null);
  const [showConversation, setShowConversation] = useState(false);

  const handleFriendSelection = (friendId) => {
    setSelectedFriendId(friendId);
    setShowConversation(true);
  };

  const handleBackToSidebar = () => {
    setShowConversation(false);
  };

  return (
    <MDBContainer fluid className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      {loggedIn && !showConversation && <SideBar handleFriendSelection={handleFriendSelection} />}
      {showConversation && (
        <Conversation friendId={selectedFriendId} handleBackToSidebar={handleBackToSidebar} />
      )}
    </MDBContainer>
  );
};

export default Home;
