import UserTrip from "../model/userTrip.model.js";

export const getUserTrips = async (req, res) => {
  try {
    const { userId } = req.params;
    const userTrips = await UserTrip.find({ userId }).populate('destinationId');

    if (!userTrips) {
      return res.status(404).json({ message: "No trips found for this user" });
    }

    res.status(200).json(userTrips);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the trips' });
  }
};

export const addUserTrip = async (req, res) => {
  try {
    const newUserTrip = new UserTrip(req.body);
    const savedUserTrip = await newUserTrip.save();
    res.status(201).json(savedUserTrip);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while adding the trip' });
  }
};

export const getUserTripHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentDate = new Date();
    const userTripHistory = await UserTrip.find({ userId, endDate: { $lt: currentDate } }).populate('destinationId');

    if (!userTripHistory.length) {
      return res.status(404).json({ message: "No trip history found for this user" });
    }

    res.status(200).json(userTripHistory);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the trip history' });
  }
};

