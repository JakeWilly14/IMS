const mongoose = require('mongoose');

// Update the connection string to include SSL options
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/IMSDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true, // Enable SSL
  sslValidate: true, // Validate SSL certificates
});

module.exports = mongoose.connection;