import { useNavigate } from "react-router-dom";
import "./navbar.scss";
import { Link } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate(); // Use a clear variable name

  return (
    <div className="navbar">
      <div className="navbar__logo">
        
        <Link to="/"><img className="logo" src="\public\assets\logo.jpg" alt="logo"/> </Link>
      </div>
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
