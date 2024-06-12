import express from "express";
import { addComment, getCommentsByDestination } from "../controller/comment.controller.js";

const router = express.Router();

router.post("/comments", addComment);
router.get("/comments/:destinationId", getCommentsByDestination);


export default router;