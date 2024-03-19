import FriendsList from '../components/FriendsList';
import { MDBContainer, MDBBtn } from 'mdb-react-ui-kit';

export default function SideNav() {
  return (
    <MDBContainer className='sidebar-container'>
      <form className='d-flex input-group w-auto'>
        <input
          type='search'
          className='form-control'
          placeholder='Type query'
          aria-label='Search'
        />
        <MDBBtn color='primary'>Search</MDBBtn>
      </form>
      <div className='friends-list-container'>
        <FriendsList />
      </div>
    </MDBContainer>
  );
}
