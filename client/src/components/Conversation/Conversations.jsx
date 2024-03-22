import { useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CONVERSATION_BY_PARTICIPANTS } from '../../utils/queries';
import { CREATE_CONVERSATION } from '../../utils/mutations';
import AuthService from '../../utils/auth';
import MessageInput from './MessageInput/MessageInput';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBBtn,
  MDBIcon
} from "mdb-react-ui-kit";

export default function Conversation({ friendId, handleBackToSidebar }) {
  const loggedInUserId = AuthService.getProfile().data._id;

  const [createConversation] = useMutation(CREATE_CONVERSATION, {
    onError: (error) => {
      console.error("Error creating conversation:", error);
    }
  });

  const { loading, error, data, refetch } = useQuery(GET_CONVERSATION_BY_PARTICIPANTS, {
    variables: { participant1Id: loggedInUserId, participant2Id: friendId },
  });

  useEffect(() => {
    const handleCreateConversation = async () => {
      try {
        const result = await createConversation({
          variables: { participant1Id: loggedInUserId, participant2Id: friendId }
        });
        if (result && result.data && result.data.createConversation) {
          console.log('Created Conversation:', result.data.createConversation); // Log created conversation
          await refetch(); // Refetch conversation data after creating conversation
        }
      } catch (error) {
        console.error("Error creating conversation:", error);
      }
    };

    // If conversation doesn't exist, create one
    if (!data?.conversationByParticipants) {
      handleCreateConversation();
    }
  }, [createConversation, data?.conversationByParticipants, loggedInUserId, friendId, refetch]);

  if (loading) return <p>Loading conversation...</p>;
  if (error) return <p>Error fetching conversation: {error.message}</p>;

  const conversation = data?.conversationByParticipants;
  const friend = conversation.participants.find(participant => participant._id === friendId);

  const senderId = loggedInUserId; // Sender ID is the logged-in user
  const receiverId = friendId; // Receiver ID is the friend
  
  return (
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center">
        <MDBCol md="10" lg="8" xl="6">
          <MDBCard className="w-auto p-3" id="chat2" style={{ width: "80vw", height: "75vh" }}>
            <MDBCardHeader className="d-flex justify-content-between align-items-center p-3">
              <h5 className="mb-0 text-white">You've landed with {friend.username}!</h5>
              <MDBBtn className='bg-transparent border-0' onClick={handleBackToSidebar}>
                <MDBIcon fas icon="undo-alt" size='2x'/>
              </MDBBtn>
            </MDBCardHeader>
            <div className="custom-scrollbar" style={{ maxHeight: "400px", overflow: "auto" }}>
              <MDBCardBody>
                {conversation.messages.map(message => {
                  const isSender = message.senderId === loggedInUserId;
                  return (
                    <div key={message._id} className={`message-container ${isSender ? 'sender' : 'receiver'}`}>
                      <p className='message-content'>
                        {message.senderId === loggedInUserId ? 'You' : friend.username}: {message.messageContent}
                      </p>
                      <p className="message-timestamp">
                        {new Date(parseInt(message.createdAt)).toLocaleString()}
                      </p>
                    </div>
                  );
                })}
              </MDBCardBody>
            </div>
            <MessageInput senderId={senderId} receiverId={receiverId}/>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
