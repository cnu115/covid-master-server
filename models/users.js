const mongoose =  require('mongoose');
const { Schema } = mongoose;

  //creating user schema

  const users = new Schema({
    name: String,
    email: String,
    password: String
  });

const usersModel = mongoose.model('users', users);

module.exports = usersModel;