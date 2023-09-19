import React, { useState } from "react";
import UserInfoForm from "./UserInfoForm";
import styles from "../style/CommentApp.module.css";

function CommentApp() {
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [showNickname, setShowNickname] = useState(false);

  const checkSpam = (text) => {
    const lowerCaseText = text.toLowerCase();
    const filteredText = lowerCaseText.replace(/viagra|xxx/g, "***");
    return filteredText;
  };

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString();
  };

  const handleUserSubmit = (userInfo) => {
    if (userInfo.nickname && userInfo.nickname !== "Noname") {
      setShowNickname(true);
    }
    setUser(userInfo);
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      const filteredComment = checkSpam(newComment);
      const currentTime = getCurrentTime();
      const comment = {
        text: filteredComment,
        time: currentTime,
      };
      const newComments = [comment, ...comments];
      setComments(newComments);
      setNewComment("");
    }
  };

  return (
    <div className={styles.commentAppContainer}>
      <div className={styles.userInfo}>
        {user ? (
          <div>
            <div className={styles.commentUsername}>
              {showNickname ? user.nickname : "Noname"}
            </div>
            {showNickname && (
              <div className={styles.comment}>Никнейм: {user.nickname}</div>
            )}
            <div className={styles.comment}>
              ФИО: {user ? user.fullName : "Noname"}
            </div>
          </div>
        ) : (
          <UserInfoForm onSubmit={handleUserSubmit} />
        )}
      </div>
      <div>
        <textarea
          className={styles.commentTextArea}
          rows="4"
          cols="50"
          placeholder="Введите комментарий"
          value={newComment}
          onChange={handleCommentChange}
        />
      </div>
      <button className={styles.addCommentButton} onClick={handleAddComment}>
        Добавить комментарий
      </button>
      <div className={styles.commentList}>
        {comments.map((comment, index) => (
          <div key={index} className={styles.comment}>
            {" "}
            <div className={styles.commentHeader}>
              <div className={styles.commentUsername}>
                {showNickname ? user.nickname : "Noname"}
              </div>
              <div className={styles.commentTimestamp}>{comment.time}</div>
            </div>
            <div>{comment.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentApp;
