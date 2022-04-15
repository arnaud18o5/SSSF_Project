import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, unique: true},
  password: {type: String, required: true},
  firstName: {type: String, required: false},
  lastName: {type: String, required: false},
  description :{type: String, required: false}
});

export default mongoose.model('User', userSchema);