import express from "express";
import { signup, login, getUsers, update} from "../controller/user.controller.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/users", getUsers);
router.put("/users/:id", update);

export default router;