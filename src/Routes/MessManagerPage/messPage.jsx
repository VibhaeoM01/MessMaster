import { useState, useEffect } from "react";
import axios from "axios";
import "./messPage.scss";

function MessPage() {
  const [Allmenus, setAllmenus] = useState([]);
  const [mealCounts, setMealCounts] = useState(null); 
  const [Day,setDay] = useState("Monday");
  const [meal,setMeal] = useState("breakfast");
  const [food,setFood]=useState('');

    useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = token
          ? { headers: { Authorization: `Bearer ${token}` } }
          : {};

        const allMenusRes = await axios.get("http://localhost:5000/api/menus/all", config);
        setAllmenus(Array.isArray(allMenusRes.data) ? allMenusRes.data : []);

        const mealCountsRes = await axios.get("http://localhost:5000/api/feedbacks/count", config);
        setMealCounts(mealCountsRes.data.data);

        // const updateMenu=await axios.post("http://localhost:5000/api/menus/update")
      } catch (err) {
        setAllmenus([]);
        setMealCounts(null);
      }
    };
    fetchData();
  }, []);
  const handleSubmit =async (e)=>{
   e.preventDefault();
   const res=await axios.post(`http://localhost:5000/api/menus/update/${menu._id}`)
  }

  return (
    <div className="messPage">
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

      <div className="update-Menu">
        <h2>Update Menu</h2>
        <div className="fields">
         <form onSubmit={handleSubmit}>
           <select value={Day} onChange={e=>setDay(e.target.value)}>
            <option name="Monday" id="">Monday</option>
            <option name="Tuesday" id="">Tuesday</option>
            <option name="Wednesday" id="">Webnesday</option>
            <option name="Thursday" id="">Thursday</option>
            <option name="Friday" id="">Friday</option>
            <option name="Saturday" id="">Saturday</option>
          </select>
          <select value={meal} onChange={e=>setMeal(e.target.value)}>
            <option name="breakfast" id="">BreakFast</option>
            <option name="lunch" id="">Lunch</option>
            <option name="snacks" id="">Snacks</option>
            <option name="dinner" id="">Dinner</option>
          </select>
          <input type="text" value={food} required onChange={(e)=>setFood(e.target.value)}/>
          <button>Submit</button>
         </form>
        </div>
      </div>
    </div>
  );
}

export default MessPage;