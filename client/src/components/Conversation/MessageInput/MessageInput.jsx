import { useMutation } from '@apollo/client';
import { SEND_MESSAGE } from '../../../utils/mutations';

import {
  MDBCardFooter,
  MDBIcon,
} from "mdb-react-ui-kit";

export default function MessageInput({ senderId, receiverId }) {
  const [sendMessage] = useMutation(SEND_MESSAGE);

  const handleSendMessage = async (messageContent) => {
    try {
      await sendMessage({
        variables: { senderId, receiverId, messageContent }
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    const messageInput = document.getElementById('exampleFormControlInput1').value;
    if (messageInput.trim() !== '') {
      handleSendMessage(messageInput);
      document.getElementById('exampleFormControlInput1').value = ''; // Clear input after sending message
    }
  };;

  return (
    <div className='d-flex justify-content-center'>
      <MDBCardFooter className="text-white position-absolute bottom-0 p-3 d-flex align-items-center w-75">
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
          alt="avatar 3"
          style={{ width: "45px", height: "100%" }}
        />
        <form onSubmit={handleSubmit} className="w-100">
          <input
            type="text"
            name="messageInput"
            className="form-control form-control-lg"
            id="exampleFormControlInput1"
            placeholder="Type message"
          />
        </form>
        <a className="ms-1 text-white" href="#!">
          <MDBIcon fas icon="paperclip" />
        </a>
        <a className="ms-3 text-white" href="#!">
          <MDBIcon fas icon="smile" />
        </a>
        <button type="button" onClick={handleSubmit} className="ms-3 btn btn-link text-white">
          <MDBIcon fas icon="paper-plane" />
        </button>
      </MDBCardFooter> 
    </div>
  );
}
