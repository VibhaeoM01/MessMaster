import { useNavigate } from "react-router-dom";
import "./navbar.scss";

function Navbar() {
  const navigate = useNavigate(); // Use a clear variable name

  return (
    <div className="navbar">
      <img src="" alt="Logo" />
      <div className="buttons">
        
        <button className="login" onClick={() => navigate("/login")}>
          Login
        </button>
        <button className="signup" onClick={() => navigate("/signup")}>
          Signup
        </button>
      </div>
    </div>
  );
}

export default Navbar;
