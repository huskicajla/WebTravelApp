import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

const AutoIncrement = mongooseSequence(mongoose);

const userSchema = mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false, 
    },
    isActive: {
        type: Boolean,
        default: true, 
    },
});

userSchema.plugin(AutoIncrement, {inc_field: 'id'});

const User = mongoose.model("User", userSchema);
export default User;
