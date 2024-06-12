import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcryptjs.hash(password, 10);
        const createdUser = new User({
            fullname: fullname,
            email: email,
            password: hashedPassword,
        });
        await createdUser.save();
        res.status(201).json({ message: "User created successfully"});
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password, isAdmin, isActive } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        } 
        if (!user.isActive) {
            return res.status(403).json({ message: "User is not active" });
        }

        if (user.isAdmin) {
            return res.status(200).json({ message: "Welcome admin!", user:{
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                isAdmin: user.isAdmin,
                isActive: user.isActive
            } , redirectUrl: "/admin-dashboard" });
        } else {
            return res.status(200).json({ message: "Login successful!", user:{
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                isAdmin: user.isAdmin,
                isActive: user.isActive
            } , redirectUrl: "/user-dashboard" });
        }
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });        
    }
}

export const getUsers = async(req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    }
    catch (error) {
        console.log("Error: ", error);
        res.status(500).json(error);
    }
};

export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { fullname, email, password, isAdmin, isActive } = req.body;
        const user = await User.findByIdAndUpdate(id, { fullname, email, password, isAdmin, isActive }, { new: true });
        
        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully", user });
    }
    catch (error) {
        console.log("Error: ", error);
        res.status(500).json(error);
    }
}