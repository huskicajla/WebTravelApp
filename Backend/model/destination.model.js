import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";


const AutoIncrement = mongooseSequence(mongoose);

const destinationSchema = new mongoose.Schema({
    destination_id: {
        type: Number,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    details:{
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
});


destinationSchema.plugin(AutoIncrement, {inc_field: 'destination_id'});

const Destination = mongoose.model("Destination", destinationSchema);

export default Destination;