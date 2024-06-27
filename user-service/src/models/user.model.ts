import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  username: String,
  age: Number,
  email: String,
  password: String,
});

export const User = mongoose.model('user', UserSchema);
