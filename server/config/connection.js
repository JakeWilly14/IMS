const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://jakewilly14:Torisgotmilk1514!@cluster0.hfcm5je.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

module.exports = mongoose.connection;