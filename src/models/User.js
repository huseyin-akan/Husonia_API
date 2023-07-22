const mongoose = require('mongoose')
const { encrpytPassword : _encrpytPassword, comparePassword: _comparePassword} = require('../helpers/crypto-helper');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    maxlength: 50,
    minlength: 3,
  },
  username: {
    type: String,
    required : true,
    unique: true,
    minlength: 3
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
  },
})

//this middleware works before saving the entity.
UserSchema.pre('save', async function () {
  const hashedPassword = await _encrpytPassword(this.password);
  this.password = hashedPassword;
})

//We can add any method to the schema and use it on all entities of this schema.
UserSchema.methods.comparePassword = async function (passToCompare) {
  const isMatch = _comparePassword(passToCompare, this.password);
  return isMatch; 
}

module.exports = mongoose.model('User', UserSchema)