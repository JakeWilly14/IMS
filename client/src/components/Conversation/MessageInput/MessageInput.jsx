import { useState, useContext } from 'react';
import { SocketContext } from '../../../utils/SocketContext';
import {
  MDBCardFooter,
  MDBIcon
} from "mdb-react-ui-kit";

export default function MessageInput({ senderId, receiverId }) {
  const { sendMessage } = useContext(SocketContext);
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const messageInput = message.trim();
    if (messageInput) {
      sendMessage(senderId, receiverId, messageInput);
      setMessage(''); // Clear input after sending message
      console.log("handleMessageSubmit: ", messageInput);
    }
  };

  return (
    <div className='d-flex justify-content-evenly'>
      <MDBCardFooter className="message-input text-white position-absolute bottom-0 p-3 d-flex align-items-center w-100">
        <img
          className="ms-3 me-1"
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
          alt="avatar 3"
          style={{ width: "45px", height: "100%" }}
        />
        <form 
          onSubmit={handleSubmit} 
          className="w-100 d-flex justify-content-center m-1">
          <input
            type="text"
            name="messageInput"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="form-control form-control-lg w-75"
            placeholder="Type message"
          />
        </form>
        {/* Future development Icons */}
        {/* <a className="ms-1 text-white" href="#!">
          <MDBIcon fas icon="paperclip" />
        </a>
        <a className="ms-3 text-white" href="#!">
          <MDBIcon fas icon="smile" />
        </a> */}
        <button type="button" onClick={handleSubmit} className="ms-3 btn btn-link text-white">
          <MDBIcon fas icon="paper-plane" />
        </button>
      </MDBCardFooter> 
    </div>
  );
}
