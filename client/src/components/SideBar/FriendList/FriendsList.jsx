import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button';
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
    <MDBListGroup className='d-flex'>
      {loading ? (
        <p>Loading friends...</p>
      ) : error ? (
        <p>Error loading friends: {error.message}</p>
      ) : friendsToRender.length === 0 ? (
        <h5 className="align-self-center text-white">No buddies at this time.<br></br>Add a friend to chat!</h5>
      ) : (
        friendsToRender.map(friend => (
          <MDBListGroupItem
            key={friend._id}
            noBorders
            className='d-flex flex-row justify-content-between align-items-center bg-transparent'
          >
            <div className='d-flex justify-content-between align-items-center'>
              {/* Commented out img tag for future development */}
              {/* <img
                src={friend.avatarPic}
                alt=''
                style={{ width: '45px', height: '45px' }}
                className='rounded-circle'
              /> */}
              <div 
                className='ms-3 p-2 square border-0 rounded'  
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  backdropFilter: "blur(10px)",
                  backgroundImage: "linear-gradient(to right, #ff00cc, #333399)",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}>
                <p className='fw-bold mb-1'>{friend.username}</p>
                <p className='text-muted mb-0'>{friend.email}</p>
              </div>
            </div>
            <div className="d-flex">
              <Button 
                className="me-2"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  backdropFilter: "blur(10px)",
                  backgroundImage: "linear-gradient(to right, #ff00cc, #333399)",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }} 
                onClick={() => handleFriendSelection(friend._id)}>
                <MDBIcon className='ms-1' far icon="comments" size='1x' />
              </Button>
              <Button 
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  backdropFilter: "blur(10px)",
                  backgroundImage: "linear-gradient(to right, #ff00cc, #333399)",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }} 
                size='sm'
                onClick={() => handleUpdateFriend({ userId, friendId: friend._id, data, refetch })}
                disabled={addFriendLoading || removeFriendLoading}
              >
                {data.getUserFriends.some(f => f._id === friend._id) ? 'X' : 'Add'}
              </Button>
            </div>
          </MDBListGroupItem>
        ))
      )}
    </MDBListGroup>
  );
}

export default FriendsList;
