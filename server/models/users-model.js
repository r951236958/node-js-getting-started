const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Please provide an Email!'],
      unique: [true, 'Email Exist'],
    },

    password: {
      type: String,
      required: [true, 'Please provide a password!'],
      unique: false,
    },
  },
  {
    collection: 'users',
  }
)
module.exports = mongoose.model.Users || mongoose.model('Users', UserSchema)