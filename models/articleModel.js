import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const articleSchema = new Schema({
    author: {type: mongoose.Types.ObjectId, unique: false},
    title: {type: String, required: true},
    text: {type: String, required: true},
    date: {type: String, required: true},
    comments : [{
        author: {type: mongoose.Types.ObjectId, unique: false, required: true},
        text: {type: String, required: true},
        date: {type: String, required: true},
    }],
    likes : [{ author : {type : mongoose.Types.ObjectId, unique: true}}],
    dislikes: [{ author : {type : mongoose.Types.ObjectId, unique: true}}],
    topics: [{
        _id: {type: mongoose.Types.ObjectId, unique: true, required:true},
        name: {type: String, unique:true, required:true}
    }]
});

export default mongoose.model('Article', articleSchema);