import { useNavigate } from "react-router-dom";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();  
  const { user, logout } = useAuth(); 
   console.log(user);
  return (
    <div className="navbar">
      <div className="navbar__logo">
        
        <Link to="/"><img className="logo" src="\public\assets\logo.jpg" alt="logo"/> </Link>
      </div>
     <div className="buttons">
     
        {user ? (
          <>
            <div className="hello">
              <span className="username">Hello, <span className="name">{user.name || user.email}</span></span>
            <button className="logout" onClick={logout}>Logout</button>
            </div>
          </>
        ) : (
          <>
            <button className="login" onClick={() => navigate("/login")}>
              Login
            </button>
            <button className="signup" onClick={() => navigate("/signup")}>
              Signup
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
