import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const topicSchema = new Schema({
    name: {type: String, required: true, unique: true}
});

export default mongoose.model('Topic', topicSchema);