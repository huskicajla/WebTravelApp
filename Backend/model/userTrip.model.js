import mongoose from "mongoose";

import mongooseSequence from "mongoose-sequence";

const AutoIncrement = mongooseSequence(mongoose);

const userTripSchema = new mongoose.Schema({
    userTrip_id: {
        type: Number,
        unique: true
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    destinationId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Destination', 
        required: true 
    },
    startDate: { 
        type: Date, 
        required: true 
    },
    endDate: { 
        type: Date, 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['booked', 'completed'], 
        required: true 
    },
});

userTripSchema.plugin(AutoIncrement, {inc_field: 'userTrip_id'});

const UserTrip = mongoose.model('UserTrip', userTripSchema);

export default UserTrip;
