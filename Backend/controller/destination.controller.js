import Destination from "../model/destination.model.js";

export const getDestination = async(req, res) => {
    try {
        const destination = await Destination.find();
        res.status(200).json(destination);
    }
    catch (error) {
        console.log("Error: ", error);
        res.status(500).json(error);
    }
};

export const getOneDestination = async (req, res) => {
    try {
        const { id } = req.params;
        const destination = await Destination.findById(id);

        if (!destination) {
            return res.status(404).json({ message: "Destination not found" });
        }

        res.status(200).json(destination);
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ error: "An error occurred while fetching the destination" });
    }
};

export const addDestination = async(req, res) => {
    try {
        const {name, details, price, category, image} = req.body;
        const createdDestination = new Destination({
            name: name,
            details: details,
            price: price,
            category: category,
            image: image,
        });
        await createdDestination.save();
        res.status(201).json({ message: "New destination added successfully"});
    } catch (err) {
        console.log("Error: " + err.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateDes = async (req, res) => {
    try {
        const { destination_id } = req.params;
        const { name, details, price, category, image } = req.body;

        // Validate input
        if (!name || !details || !price || !category || !image) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (typeof price !== 'number') {
            return res.status(400).json({ message: "Price must be a number" });
        }

        const destination = await Destination.findByIdAndUpdate(destination_id, { name, details, price, category, image }, { new: true });

        if (!destination) {
            return res.status(404).json({ message: "Destination not found" });
        }

        res.status(200).json({ message: "Destination updated successfully", destination });
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ error: "An error occurred while updating the destination" });
    }
}

export const deleteDest = async (req, res) => {
    try {
        const {id} = req.params;
        const destination = await Destination.findOneAndDelete(id);

        if(!destination) {
            return res.status(404).json({ message: "Destination not found" });
        }

        res.status(200).json({ message: "Destination deleted successfully" });
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ error: "An error occurred while deleting the destination" });
    }
};
