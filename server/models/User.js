const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  avatarPic: {
    type: String,
    default: '',
  },
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    }
  ],
  conversations: [
    {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
    }
  ],
}, { timestamps: true }
);

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// Define a static method to validate ObjectId
userSchema.statics.isValidObjectId = function(id) {
  return mongoose.Types.ObjectId.isValid(id);
};

// Set up pre-save middleware to create password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// Compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;