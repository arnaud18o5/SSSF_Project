import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    author: {type: mongoose.Types.ObjectId, unique: false},
    title: {type: String, required: true},
    text: {type: String, required: true},
    date: {type: String, required: true},
});

export default mongoose.model('Article', userSchema);