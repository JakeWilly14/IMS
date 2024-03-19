import { useState } from 'react';
import FriendsList from '../FriendList/FriendsList';
import SearchBar from '../SearchBar/SearchBar'
import { MDBContainer} from 'mdb-react-ui-kit';
import AuthService from '../../utils/auth';

export default function SideBar() {
  const [searchResult, setSearchResult] = useState(null);

  // Get the current user's information from AuthService
  const currentUser = AuthService.getProfile();
  const userId = currentUser && currentUser.data ? currentUser.data._id : null;

  return (
    <MDBContainer className='sidebar-container'>
      <SearchBar setSearchResult={setSearchResult}/>
      <div className='friends-list-container'>
        <FriendsList searchResult={searchResult} userId={userId}/>
      </div>
    </MDBContainer>
  );
}
