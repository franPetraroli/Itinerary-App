const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

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

//To encrypt password
UserSchema.pre('save', function(next){
  if(!this.isModified('password')){
    return next()
  }
  bcrypt.genSalt(10, (err, salt)=>{
    if(err) return next(err);

    bcrypt.hash(this.password, salt, (err, hash)=>{
      if(err) return next(err);
      this.password = hash
      next()
    })
  })

  
})

module.exports =  mongoose.model('User', UserSchema)

