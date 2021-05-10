const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/curd'; //localhost mongodb connection


mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(res => {
    console.log('db connected successfully');
});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));