import { useState } from 'react';
import AuthService from '../../utils/auth';
import { MDBCard } from 'mdb-react-ui-kit';
import FriendsList from './FriendList/FriendsList';
import SearchBar from './SearchBar/SearchBar';
import Logout from './Logout/Logout';

export default function SideBar({ handleFriendSelection }) {
  const [searchResult, setSearchResult] = useState(null);

  const currentUser = AuthService.getProfile();
  const userId = currentUser && currentUser.data ? currentUser.data._id : null;

  return (
    <MDBCard style={{ width: "80vw", height: "75vh" }}>
      <SearchBar setSearchResult={setSearchResult}/>
      <FriendsList searchResult={searchResult} userId={userId} handleFriendSelection={handleFriendSelection} />
      <Logout />
    </MDBCard>
  );
}
