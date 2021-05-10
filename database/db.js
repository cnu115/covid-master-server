const mongoose = require('mongoose');

// const url = 'mongodb://localhost:27017/CovidMaster'; //localhost mongodb connection

const url = 'mongodb+srv://cnu115:Cnu@115@cluster0.htln4.mongodb.net/CovidMaster'

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(res => {
    console.log('db connected successfully');
});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));




// const MongoClient = require('mongodb').MongoClient;
// const uri = url;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// client.connect().then(res => {
//         console.log('db connected successfully');
// })

// client.connect(err => {
//   const collection = client.db("CovidMaster").collection("CovidMaster");
//   // perform actions on the collection object
//   client.close();
// });
