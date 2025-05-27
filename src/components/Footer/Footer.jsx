import { Link } from "react-router-dom";
import "./footer.scss";

function Footer() {
  return (
    <div className="footer">
     <div className="about">
        <h2>About Us</h2>
        <p></p>
        <p>messmaster@gmail.com</p>
        <p>7058461105</p>
     </div>
     <div className="links">
        <h2>Quick Links</h2>
        <Link to="">Home</Link>
        <Link to="">Features</Link>
        <Link to="">Contact / Support</Link>
     </div>

    </div>
  );
}
// Home

// Features

// Login / Signup

// Admin Dashboard (if role-based routing)

// Contact / Support
export default Footer;