import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import destinationRoute from "./route/destination.route.js";
import userRoute from "./route/user.route.js";
import commentRoute from "./route/comment.route.js";
import userTripsRoute from "./route/userTrip.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDB_URI;

try {
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("Connected to mongoDB");
} catch (error) {
    console.log("Error: ", error);
}

app.use("/destination", destinationRoute);
app.use("/user", userRoute);
app.use("/comment", commentRoute);
app.use("/user_trip", userTripsRoute)


app.listen(PORT, () => {
    console.log(`Port: ${PORT}`);
});

