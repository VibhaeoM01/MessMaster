import { useState, useEffect } from "react";
import axios from "axios";
import "./menuCard.scss";

function MenuCard({ menuId }) {
  const [menu, setMenu] = useState(null);
  const [choice, setChoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch menu data
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get(`/api/menus/${menuId}`);
        setMenu(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch menu");
        setLoading(false);
      }
    };

    fetchMenu();
  }, [menuId]);

  // Handle yes/no choice
  const handleChoice = async (willEat) => {
    try {
      const response = await axios.post(`/api/feedback/eat/${menuId}`, { willEat });
      setChoice(willEat);
    } catch (err) {
      setError("Failed to submit choice");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!menu) return <div>No menu found</div>;

  return (
    <div className="menuCard">
      {menu.image && <img src={menu.image} alt={menu.mealType} />}
      <div className="menuCard-details">
        <h3>{menu.mealType}</h3>
        <div className="menuCard-items">
          {menu.items.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>
      </div>
      <div className="menuCard-button">
        <p>PreBooking:</p>
        <div className="choice-buttons">
          <button 
            className={`Yes ${choice === true ? 'selected' : ''}`}
            onClick={() => handleChoice(true)}
            disabled={menu.isLocked}
          >
            Yes
          </button>
          <button 
            className={`No ${choice === false ? 'selected' : ''}`}
            onClick={() => handleChoice(false)}
            disabled={menu.isLocked}
          >
            No
          </button>
        </div>
        {menu.isLocked && <p className="locked-message">Choices are locked</p>}
      </div>   
    </div>
  );
}

export default MenuCard;