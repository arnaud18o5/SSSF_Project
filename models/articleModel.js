import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const articleSchema = new Schema({
    author: {
        id: {type:mongoose.Types.ObjectId, unique:false},
        username: {type: String, unique: false},
        firstName: {type: String, required: false},
        lastName: {type: String, required: false},
        description :{type: String, required: false},
        avatar : {type: String, required: false}
    },
    headPicture: {type: String, unique:false},
    title: {type: String, required: true},
    text: {type: String, required: true},
    date: {type: String, required: true},
    comments : [{
        author: {type: mongoose.Types.ObjectId, unique: false, required: true},
        text: {type: String, required: true},
        date: {type: String, required: true},
    }],
    likes : [{ usr : {
        _id: {type:mongoose.Types.ObjectId, unique:false},
        username: {type: String, unique: false},
        firstName: {type: String, required: false},
        lastName: {type: String, required: false},
        avatar : {type: String, required: false}
    }}],
    likeCounter: {type: String},
    dislikes: [{ usr : {
        _id: {type:mongoose.Types.ObjectId, unique:false},
        username: {type: String, unique: false},
        firstName: {type: String, required: false},
        lastName: {type: String, required: false},
        avatar : {type: String, required: false}
    }}],
    dislikeCounter: {type:String},
    topics: [{
        _id: {type: mongoose.Types.ObjectId, unique: false, required:true},
        name: {type: String, unique:true, required:true}
    }]
});

export default mongoose.model('Article', articleSchema);