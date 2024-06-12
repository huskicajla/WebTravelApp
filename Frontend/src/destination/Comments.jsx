/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const CommentPage = ({ destinationId }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:4001/comment/comments/${destinationId}`);
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments: ", error);
      }
    };

    if (destinationId) {
      fetchComments();
    }
  }, [destinationId]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Login to add comment.");
      return;
    }

    try {
      await axios.post(`http://localhost:4001/comment/comments/${destinationId}`, {
        text: commentText,
        userId,
      });
      setCommentText("");
    
      // eslint-disable-next-line no-undef
      fetchComments(); 
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Comments{destinationId}</h2>
      <div style={styles.commentList}>
        {comments.map((comment) => (
          <div key={comment._id} style={styles.comment}>
            <p style={styles.commentText}>{comment.text}</p>
            <p style={styles.commentDate}>{new Date(comment.date).toLocaleString()}</p>
          </div>
        ))}
      </div>
      <div style={styles.addComment}>
        <form onSubmit={handleAddComment}>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add comment"
            style={styles.commentInput}
          ></textarea>
          <button type="submit" style={styles.commentSubmitBtn}>Add comment</button>
        </form>
      </div>
    </div>
  );
};

CommentPage.propTypes = {
  destinationId: PropTypes.string.isRequired,
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: 'auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9', 
    borderRadius: '8px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
  },
  commentList: {
    marginBottom: '20px',
  },
  comment: {
    border: '1px solid #ddd',
    padding: '10px',
    marginBottom: '10px',
    backgroundColor: '#fff',
    borderRadius: '5px',
  },
  commentText: {
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  commentDate: {
    color: '#888',
    fontSize: '0.8rem',
  },
  addComment: {
    marginBottom: '20px',
  },
  commentInput: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc', 
    resize: 'none',
  },
  commentSubmitBtn: {
    backgroundColor: '#e91e63',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default CommentPage;
