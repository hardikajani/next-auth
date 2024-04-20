import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isVarified: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  varifyToken: String,
  varifyTokenExpiry: Date,

}, { timestamps: true })


const User = mongoose.models.users || mongoose.model('users', userSchema)

export default User;