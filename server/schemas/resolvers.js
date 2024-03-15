const User = require('../models/User');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (parent, { username }) => {
      try {
        const user = await User.findOne({ username });
        
        if (!user) {
          return new Error('Could not find user by the username:', { username });
        }

        return user;

      } catch (error) {
        console.error("Error fetching user:", error);
        return null;
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
  }
}

module.exports = resolvers;