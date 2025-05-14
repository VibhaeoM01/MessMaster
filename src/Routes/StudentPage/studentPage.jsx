import { useState, useEffect } from "react";
import axios from "axios";
import MenuCard from "../../components/MenuCard/MenuCard";
import "./studentPage.scss";

function StudentPage() {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodayMenu = async () => {
  try {
    const response = await axios.get('/api/menus');
    setMenus(response.data);
    // setLoading(false);
  } catch (err) {
    console.error("Error fetching menu:", err);
    setError("Failed to fetch today's menu");
    // setLoading(false);
  }
};

    fetchTodayMenu();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="studentPage">
      <h1>Today's Menu</h1>
      <div className="menu-grid">
        {menus.map((menu) => (
          <MenuCard key={menu._id} menuId={menu._id} />
        ))}
      </div>
    </div>
  );
}

export default StudentPage;