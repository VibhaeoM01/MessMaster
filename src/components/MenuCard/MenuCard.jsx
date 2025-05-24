import { useState } from "react";
import axios from "axios";
import "./menuCard.scss";

function MenuCard({ menu }) {
  const [choice, setChoice] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState("");
  const [success, setSuccess] = useState(null);

  if (!menu) return <div>No menu found</div>;

  const cutoffTime = menu.cutoffTime ? new Date(menu.cutoffTime) : null;
  const now = new Date();
  const isWindowOpen = cutoffTime && now < cutoffTime;

  const handleChoice = async (willEat) => {
    if (!isWindowOpen) {
      setError("Choice window is closed for this meal.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:5000/api/feedbacks/eat/${menu._id}`,
        { willEat },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setChoice(willEat);
    } catch (err) {
      console.log(err);
      setError("Failed to submit choice");
    }
  };

  const handleCommentSubmit = async () => {
    if (comment === "") {
      setError("Comment cannot be empty.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:5000/api/feedbacks/${menu._id}`,
        { comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setError(null);
      setComment("");
      setSuccess("Comment submitted!");
      setTimeout(() => setError(null), 2000);
    } catch (err) {
      if (err.response && err.response.status === 403) {
        setError(err.response.data.message); 
      } else {
        setError("Failed to submit comment");
      }
      setSuccess(null);
    }
  };

  return (
    <div className="menuCard">
      <img className="image" src={menu.image} alt={`${menu.mealType}`} />
      <h2 className="mealType">{menu.mealType}</h2>
      <div className="items">
        {Array.isArray(menu.items) && menu.items.length > 0 ? (
          <ol>
            {menu.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
        ) : (
          <p>No items listed</p>
        )}
      </div>
      <p className="time">Time: {menu.time}</p>
      <div className="buttons">
        <button
          className={`but yes ${choice === true ? "selected" : ""}`}
          onClick={() => handleChoice(true)}
        >
          Yes
        </button>
        <button
          className={`but no ${choice === false ? "selected" : ""}`}
          onClick={() => handleChoice(false)}
        >
          No
        </button>
      </div>
      {error && <p className="message error">{error}</p>}
      <div className="comment">
        <p>Comment:-</p>
        <textarea
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enter text here..."
        ></textarea>
        <button onClick={handleCommentSubmit}>Submit</button>
        {success && <p className="message success">{success}</p>}
      </div>
    </div>
  );
}

export default MenuCard;
