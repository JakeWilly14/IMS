import { createContext, useState, useEffect } from 'react';
import AuthService from './auth';
import io from 'socket.io-client';
import { useMutation } from '@apollo/client';
import { SEND_MESSAGE } from '../utils/mutations';

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const loggedIn = AuthService.loggedIn();
  const [sendMessageMutation] = useMutation(SEND_MESSAGE);

  useEffect(() => {
    if (loggedIn) {
      const authUserId = AuthService.getProfile().data._id;
      const socket = io(['http://localhost:3001', 'https://international-messaging-system-ca658f73b538.herokuapp.com/'], {
        query: { userId: authUserId }
      });
  
      setSocket(socket);
      
      // Log socket connection status
      socket.on('connect', () => {
        console.log("Socket connection established successfully.");
      });
  
      return () => socket.close();
    }
  }, [loggedIn]);
  

  const sendMessage = async (senderId, receiverId, messageContent) => {
    try {
      const { data } = await sendMessageMutation({
        variables: { senderId, receiverId, messageContent }
      });
      console.log("Message sent successfully:", data.sendMessage);
      // Here, we can emit the message to the receiver using socket.io if needed
      if (socket) {
        socket.emit('sendMessage', { senderId, receiverId, messageContent });
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <SocketContext.Provider value={{ socket, onlineUsers, sendMessage }}>
      {children}
    </SocketContext.Provider>
  );
};
