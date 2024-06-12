import express from "express";
import { getUserTrips, addUserTrip, getUserTripHistory } from "../controller/userTrip.controller.js"

const router = express.Router();

router.get('/user-trips/:userId', getUserTrips );
router.post('/user-trips', addUserTrip);
router.get('/user-trips/history/:userId', getUserTripHistory);

export default router;