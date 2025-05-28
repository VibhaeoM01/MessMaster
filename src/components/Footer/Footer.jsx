import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import "./Footer.scss";

function Footer() {
  return (
    <div className="footer">
      <div className="about">
        <h2>About Us</h2>
        <p>messmaster@gmail.com</p>
        <p>7058461105</p>
      </div>
      <div className="links">
        <h2>Quick Links</h2>
        <ScrollLink className="link" to="home" smooth={true} duration={500}>
          Home
        </ScrollLink>
        <a className="link">
          <ScrollLink to="Faqs" smooth={true} duration={500}>
            FAQs
          </ScrollLink>
        </a>
        <a className="link">
          <ScrollLink to="features" smooth={true} duration={500}>
            Features
          </ScrollLink>
        </a>
        <ScrollLink className="link" to="contact" smooth={true} duration={500}>
          Contact Us
        </ScrollLink>
      </div>
    </div>
  );
}
export default Footer;
