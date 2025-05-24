import { useState, useEffect } from "react";
import axios from "axios";
import "./studentPage.scss";
import MenuCard from "../../components/MenuCard/MenuCard";

function StudentPage() {
  const [menus, setMenus] = useState([]);
  const [Allmenus, setAllMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = token
          ? { headers: { Authorization: `Bearer ${token}` } }
          : {};

        const [todayRes, allRes] = await Promise.all([
          axios.get("http://localhost:5000/api/menus", config),
          axios.get("http://localhost:5000/api/menus/all", config),
        ]);
        setMenus(todayRes.data);
        setAllMenus(allRes.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch menus");
      } finally {
        setLoading(false);
      }
    };
    fetchMenus();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!menus.length) return <div>No menus found</div>;

  return (
    <div className="studentPage">
      <div className="cards">
        {menus.map((menu) => (
          <MenuCard key={menu._id} menu={menu} />
        ))}
      </div>
      <div className="all-menus">
        <h2>Complete Menu</h2>
        {Allmenus.length > 0 ? (
          <table
            border="1"
            cellPadding="8"
            style={{ borderCollapse: "collapse", width: "100%" }}
          >
            <thead>
              <tr>
                <th>Day</th>
                <th>Breakfast</th>
                <th>Lunch</th>
                <th>Snacks</th>
                <th>Dinner</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(
                Allmenus.reduce((acc, menu) => {
                  acc[menu.day] = acc[menu.day] || {};
                  acc[menu.day][menu.mealType] = menu.items.join(", ");
                  return acc;
                }, {})
              ).map(([day, meals]) => (
                <tr key={day}>
                  <td>
                    <strong>{day}</strong>
                  </td>
                  <td>{meals.breakfast || "-"}</td>
                  <td>{meals.lunch || "-"}</td>
                  <td>{meals.snacks || "-"}</td>
                  <td>{meals.dinner || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No complete menu found</p>
        )}
      </div>
    </div>
  );
}

export default StudentPage;
