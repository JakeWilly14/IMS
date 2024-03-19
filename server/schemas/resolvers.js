const User = require('../models/User');
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-errors');
const bcrypt = require('bcrypt');

const resolvers = {
  Query: {
    user: async (parent, { username }) => {
      console.log("querying user: ", username);
      try {
        const user = await User.findOne({ username })
          .populate({
            path: 'conversations',
            populate: {
              path: 'participants',
              model: 'User'
            }
          })
          .populate({
            path: 'conversations',
            populate: {
              path: 'messages',
              model: 'Message'
            }
          });
        
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
    me: async (parent, args, context) => {
      // Ensure user is authenticated
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to view this information.');
      }

      // Fetch and return the authenticated user
      try {
        const user = await User.findById(context.user._id)
        .populate('friends')
        .populate({
          path: 'conversations',
          populate: [
            { path: 'participants' },
            { path: 'messages' }
          ]
        });
        
        return user;
      } catch (error) {
        console.error('Error fetching authenticated user:', error);
        throw new Error('Failed to fetch authenticated user.');
      }
    },
    getUserFriends: async (parent, { userId }) => {
      console.log("Getting user Friends");
      try {
        // Retrieve the user from the database
        const user = await User.findById(userId).populate('friends');
        return user.friends;
      } catch (error) {
        console.error('Error fetching user friends:', error);
        throw new Error('Failed to fetch user friends');
      }
    },
    conversation: async (parent, { _id }) => {
      try {
        const conversation = await Conversation.findOne({ _id })
          .populate({
            path: 'participants',
            model: 'User'
          })
          .populate({
            path: 'messages',
            model: 'Message'
          });
        
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
    signUp: async (parent, { fullName, username, email, password }) => {
      console.log("signing up");
      try {
        const user = await User.create({ fullName, username, email, password });
    
        // Log success message
        console.log('User created successfully:', user);
    
        const token = signToken(user);
    
        return { token, user };
      } catch (error) {
        // Log error message
        console.error('Error creating user:', error);
        throw new Error('Failed to create user');
      }
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
    updateUser: async (_, { username, password }, context) => {
      console.log("context", context.user);
      try {
        if (!context.user) {
          throw new AuthenticationError('You must be logged in to update your profile.');
        }
  
        const updatedFields = {};
        if (username) {
          updatedFields.username = username;
        }
        if (password) {
          const hashedPassword = await bcrypt.hash(password, 10)

          updatedFields.password = hashedPassword;
        }
        
        const updatedUser = await User.findByIdAndUpdate(context.user._id, updatedFields, { new: true });
       
        return updatedUser;
      } catch (error) {
        console.error('Error updating user:', error);
        throw new Error('Could not update user profile. Please try again later.');
      }
    },
    addFriend: async (_, { userId, friendId }) => {
      try {
        // Check if userId and friendId are valid ObjectId strings
        if (!User.isValidObjectId(userId) || !User.isValidObjectId(friendId)) {
          throw new Error("Invalid user or friend ID.");
        }

        // Check if userId and friendId are different
        if (userId === friendId) {
          throw new Error("You cannot add yourself as a friend.");
        }

        // Find the user and friend in the database
        const user = await User.findById(userId);
        const friend = await User.findById(friendId);

        if (!user || !friend) {
          throw new Error("User or friend not found.");
        }

        // Check if friend is already in user's friends list
        if (user.friends.includes(friendId)) {
          throw new Error(`${friend.username} is already in the user's friends list.`);
        }

        // Add friend to user's friends list
        user.friends.push(friendId);
        await user.save();

        // Add reciprocal friendship
        friend.friends.push(userId);
        await friend.save();

        return { success: true, message: `${friend.username} added successfully.` };
      } catch (error) {
        console.error("Error adding friend:", error);
        return { success: false, message: error.message };
      }
    },
    removeFriend: async (_, { userId, friendId }) => {
      try {
        // Check if userId and friendId are valid ObjectId strings
        if (!User.isValidObjectId(userId) || !User.isValidObjectId(friendId)) {
          throw new Error("Invalid user or friend ID.");
        }

        // Check if userId and friendId are different
        if (userId === friendId) {
          throw new Error("You cannot remove yourself as a friend.");
        }

        // Find the user and friend in the database
        const user = await User.findById(userId);
        const friend = await User.findById(friendId);

        if (!user || !friend) {
          throw new Error("User or friend not found.");
        }

        // Remove friend from user's friends list
        user.friends.pull(friendId);
        await user.save();

        // Remove user from friend's friends list
        friend.friends.pull(userId);
        await friend.save();

        return { success: true, message: `${friend.username} removed successfully.` };
      } catch (error) {
        console.error("Error removing friend:", error);
        return { success: false, message: error.message };
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

          // Update user documents with the conversation reference
        await User.updateMany(
          { _id: { $in: [senderId, receiverId] } },
          { $addToSet: { conversations: conversation._id } }
        );

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