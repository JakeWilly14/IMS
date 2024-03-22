import { useMutation } from '@apollo/client';
import { friendAddedVar, friendRemovedVar } from './reactiveVariables';
import { REMOVE_FRIEND, ADD_FRIEND } from './mutations';

const useUpdateFriend = () => {
  const [addFriendMutation, { loading: addFriendLoading }] = useMutation(ADD_FRIEND);
  const [removeFriendMutation, { loading: removeFriendLoading }] = useMutation(REMOVE_FRIEND);

  const handleUpdateFriend = async ({ userId, friendId, data, refetch }) => {
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

      // After handling friend action, refetch user friends
      refetch();
    } catch (error) {
      console.error('Error handling friend action:', error);
    }
  };

  return { handleUpdateFriend, addFriendLoading, removeFriendLoading };
};

export default useUpdateFriend;
