const User = require('../models/User');
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (parent, { username }) => {
      try {
        const user = await User.findOne({ username })
        .populate('friends')
        .populate('conversations')
        .populate('messages');
        
        if (!user) {
          return new Error('Could not find user by the username:', { username });
        }

        return user;

      } catch (error) {
        console.error("Error fetching user:", error);
        return null;
      }
    },
    users: async () => {
      return User.find();
    },
    conversation: async (parent, { _id }) => {
      try {
        const conversation = await Conversation.findOne({ _id }).populate('messages');
        
        if (!conversation) {
          return new Error('Could not find conversation by the ID:', { _id });
        }

        return conversation;

      } catch (error) {
        console.error("Error fetching conversation:", error);
        return null;
      }
    },
    conversations: async (_, { username }) => {
      try {
        const params = username ? { username } : {};

        const conversations = await Conversation.find(params).sort({ createdAt: -1 });

        return conversations;
      } catch (error) {
        console.error("Error fetching conversations:", error);
        return [];
      }
    },
    message: async (parent, { _id }) => {
      try {
        const message = await Message.findOne({ _id });
        
        if (!message) {
          return new Error('Could not find message by the ID:', { _id });
        }

        return message;

      } catch (error) {
        console.error("Error fetching message:", error);
        return null;
      }
    },
    messages: async (_, { username }) => {
      try {
        const params = username ? { username } : {};

        const messages = await Message.find(params).sort({ createdAt: -1 });

        return messages;
      } catch (error) {
        console.error("Error fetching messages:", error);
        return [];
      }
    },
  },
  Mutation: {
    addUser: async (parent, { fullName, username, email, password, confirmPassword }) => {
      if(password !== confirmPassword) {
        throw new Error('Passwords do not match. Try Again')
      }
      const user = await User.create({ fullName, username, email, password, confirmPassword });
      
      const token = signToken(user);

      return { token, user };
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return User.findByIdAndUpdate(context.user.id, args, {
          new: true,
        });
      }

      throw AuthenticationError;
    },
    login: async (parent, { email, password }) => {
      try {
        const user = await User.findOne({ email });
      
        if (!user) {
          console.log("User not found for email:", email);
          return {
            success: false,
            message: "User not found.",
          };
        }

        const correctPw = await user.isCorrectPassword(password)

        if (!correctPw) {
          console.log("Invalid password for user:", email);
          return {
            success: false,
            message: "Invalid password.",
          };
        }

        const token = signToken(user);
        
        return {
          success: true,
          message: "Successfully logged in!",
          user,
          token,
        };
      } catch (error) {
        console.error("Login error:", error);
        return {
          success: false,
          message: "An error occurred during login.",
        };
      }
    },
    sendMessage: async (_, { senderId, receiverId, messageContent }) => {
      try {
        const newMessage = new Message({
          senderId,
          receiverId,
          messageContent
        });

        // Save the message
        const savedMessage = await newMessage.save();
        
        // Find the conversation between the sender and receiver
        let conversation = await Conversation.findOne({
          participants: { $all: [senderId, receiverId] }
        });

        // If conversation doesn't exist, create a new one
        if (!conversation) {
          conversation = new Conversation({
            participants: [senderId, receiverId],
            messages: [savedMessage._id]
          });
        } else {
          // If conversation exists, add the message to it
          conversation.messages.push(savedMessage._id);
        }

        // Save the conversation
        await conversation.save();

        console.log("Message sent successfully.");
        return savedMessage;
      } catch (error) {
        console.log("Error in sendMessage Mutation: ", error);
        return null;
      }
    }
  }
}

module.exports = resolvers;