import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, unique: true},
  password: {type: String, required: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  description :{type: String, required: false},
});

export default mongoose.model('User', userSchema);