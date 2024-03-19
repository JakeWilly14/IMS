import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { useEffect } from 'react';
import { ADD_FRIEND, REMOVE_FRIEND } from '../../utils/mutations';
import { GET_USER_FRIENDS } from '../../utils/queries';
import { friendAddedVar, friendRemovedVar } from '../../utils/reactiveVariables';
import { MDBBtn, MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

export default function FriendsList({ searchResult, userId }) {
  const { loading, error, data, refetch } = useQuery(GET_USER_FRIENDS, {
    variables: { userId },
  });

  const [addFriendMutation, { loading: addFriendLoading, error: addFriendError }] = useMutation(ADD_FRIEND);
  const [removeFriendMutation, { loading: removeFriendLoading, error: removeFriendError }] = useMutation(REMOVE_FRIEND);

  const navigate = useNavigate(); // Initialize useNavigate

  const friendAdded = useReactiveVar(friendAddedVar);
  const friendRemoved = useReactiveVar(friendRemovedVar);

  useEffect(() => {
    if (friendAdded || friendRemoved) {
      refetch();
    }
  }, [friendAdded, friendRemoved, refetch]);

  const handleFriendAction = async (friendId) => {
    try {
      const isFriend = data.getUserFriends.some(friend => friend._id === friendId);
      if (isFriend) {
        await removeFriendMutation({ variables: { userId, friendId } });
        friendRemovedVar(true); // Update reactive variable
        console.log('Friend removed successfully!');
      } else {
        await addFriendMutation({ variables: { userId, friendId } });
        friendAddedVar(true); // Update reactive variable
        console.log('Friend added successfully!');
      }

      // After handling friend action, navigate to the conversation page
      navigate(`/conversation/${friendId}`); // Navigate to conversation page with friendId as the ID
    } catch (error) {
      console.error('Error handling friend action:', error);
    }
  };

  let friendsToRender = data?.getUserFriends || [];

  if (searchResult) {
    friendsToRender = [searchResult];
  }

  return (
    <MDBListGroup className='d-flex justify-content-between align-items-start' style={{ maxWidth: '18rem' }} light>
      {loading ? (
        <p>Loading friends...</p>
      ) : error ? (
        <p>Error loading friends: {error.message}</p>
      ) : (
        <>
          {friendsToRender.map(friend => (
            <MDBListGroupItem key={friend._id} noBorders className='d-flex justify-content-between align-items-center'>
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
              <MDBBtn className='d-flex align-items-end' size='sm' rounded color='link'>
                <MDBIcon className='ms-1' far icon="comments" size='2x'/>
              </MDBBtn>
              <MDBBtn
                size='sm'
                rounded
                color={data.getUserFriends.some(f => f._id === friend._id) ? 'danger' : 'success'}
                onClick={() => handleFriendAction(friend._id)}
                disabled={addFriendLoading || removeFriendLoading}
              >
                {addFriendLoading || removeFriendLoading ? 'Processing...' : data.getUserFriends.some(f => f._id === friend._id) ? 'X' : 'Add'}
              </MDBBtn>
              {addFriendError && <p>Error adding friend: {addFriendError.message}</p>}
              {removeFriendError && <p>Error removing friend: {removeFriendError.message}</p>}
            </MDBListGroupItem>
          ))}
        </>
      )}
    </MDBListGroup>
  );
}
