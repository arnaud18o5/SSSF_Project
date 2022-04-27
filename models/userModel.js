import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, unique: true},
  password: {type: String, required: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  description :{type: String, required: false},
  avatar : {type: String, required: false},
  subscribers: [{
    id: {type :mongoose.Types.ObjectId, unique: true, required: true},
    username: {type: String, unique: true, required: true}
  }],
  subscribingTo: [{
    id: {type :mongoose.Types.ObjectId, unique: true, required: true},
    username: {type: String, unique: true, required: true}
  }]
});

export default mongoose.model('User', userSchema);