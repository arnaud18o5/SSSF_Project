import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const fileSchema = new Schema({
    url: {type: String, required: true, unique: true},
});

export default mongoose.model('File', fileSchema);