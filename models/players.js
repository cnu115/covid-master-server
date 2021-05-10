const mongoose =  require('mongoose');
const { Schema } = mongoose;

  //creating players schema

  const players = new Schema({
    gameStatus: String,
    StartTime : { type : Date, default: Date.now },
    EndTime : { type : Date},
    userId: { type: Schema.Types.ObjectId, ref: 'users' }
  },{ timestamps: true });

const playersModel = mongoose.model('players', players);

module.exports = playersModel;