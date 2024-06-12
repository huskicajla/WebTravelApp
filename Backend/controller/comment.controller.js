import Comment from "../model/comment.model.js";

export const addComment = async (req, res) => {
  try {
    const { text, userId } = req.body;
    const { destinationId } = req.params;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    if (!text || !destinationId) {
      return res.status(400).json({ message: "Text and destinationId are required" });
    }

    const newComment = new Comment({
      text,
      destinationId,
      userId,
    });

    await newComment.save();

    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error adding comment: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getCommentsByDestination = async (req, res) => {
  try {
    const { destinationId } = req.params;
    const comments = await Comment.find({ destinationId });
    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
