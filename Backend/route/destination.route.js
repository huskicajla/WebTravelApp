import express from "express";
import { getDestination, addDestination, updateDes, deleteDest, getOneDestination } from "../controller/destination.controller.js";

const router = express.Router();

router.get("/", getDestination);
router.get("/destination/:id", getOneDestination);
router.post("/add", addDestination)
router.put("/:destination_id", updateDes)
router.delete("/delete/:destination_id", deleteDest);

export default router;

