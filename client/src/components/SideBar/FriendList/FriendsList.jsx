import { MDBBtn, MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdb-react-ui-kit';
import { useQuery } from '@apollo/client';
import { GET_USER_FRIENDS } from '../../../utils/queries';
import useUpdateFriend from '../../../utils/UpdateFriends';

const FriendsList = ({ searchResult, userId, handleFriendSelection }) => {
  const { loading, error, data, refetch } = useQuery(GET_USER_FRIENDS, {
    variables: { userId },
  });
  const { handleUpdateFriend, addFriendLoading, removeFriendLoading } = useUpdateFriend();

  const friendsToRender = searchResult ? [searchResult] : data?.getUserFriends || [];

  return (
    <MDBListGroup className='d-flex' light>
      {loading ? (
        <p>Loading friends...</p>
      ) : error ? (
        <p>Error loading friends: {error.message}</p>
      ) : (
        <>
          {friendsToRender.map(friend => (
            <MDBListGroupItem
              key={friend._id}
              noBorders
              className='d-flex flex-row justify-content-between align-items-center bg-transparent'
              style={{ maxWidth: '100%' }}
            >
              <div className='d-flex justify-content-between align-items-center'>
                <img
                  src={friend.avatarPic}
                  alt=''
                  style={{ width: '45px', height: '45px' }}
                  className='rounded-circle'
                />
                <div className='ms-3'>
                  <p className='fw-bold mb-1'>{friend.username}</p>
                  <p className='text-muted mb-0'>{friend.email}</p>
                </div>
              </div>
              <div className="d-flex">
                <MDBBtn onClick={() => handleFriendSelection(friend._id)}>
                  <MDBIcon className='ms-1' far icon="comments" size='2x'/>
                </MDBBtn>
                <MDBBtn
                  size='sm'
                  rounded
                  color={data.getUserFriends.some(f => f._id === friend._id) ? 'danger' : 'success'}
                  onClick={() => handleUpdateFriend({ userId, friendId: friend._id, data, refetch })}
                  disabled={addFriendLoading || removeFriendLoading}
                >
                  {data.getUserFriends.some(f => f._id === friend._id) ? 'X' : 'Add'}
                </MDBBtn>
              </div>
            </MDBListGroupItem>
          ))}
        </>
      )}
    </MDBListGroup>
  );
}

export default FriendsList;