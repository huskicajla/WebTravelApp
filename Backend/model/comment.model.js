// models/comment.model.js
import mongoose from 'mongoose';
import mongooseSequence from 'mongoose-sequence';

const AutoIncrement = mongooseSequence(mongoose);

const commentSchema = new mongoose.Schema({
    comment_id: {
        type: Number,
        unique: true,
    },
    text: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    destinationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Destination",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

commentSchema.plugin(AutoIncrement, { inc_field: 'comment_id' });

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
