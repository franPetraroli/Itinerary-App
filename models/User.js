const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    requires: true
  },
  email: {
    type: String,
    unique: true,
    requires: true
  },
  password: {
    type: String,
    requires: true
  },
  joinDate: {
    type: Date,
    default: Date.now
  },
  wishList: {
    type: [Schema.Types.ObjectId],
    ref: 'Itinerary'
  }
})

module.export =  mongoose.model('User', UserSchema)

