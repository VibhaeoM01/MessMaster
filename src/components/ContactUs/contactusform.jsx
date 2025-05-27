import { useState } from "react";
import "./contactusform.scss";
import axios from "axios";

function Contactusform() {
  const [name, setName] = useState("");
  const [email, setMail] = useState("");
  const [phone, setPhone] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/contact", { name, email, phone });
      setSuccess(true);
      setName(null);
      setMail(null);
      setPhone(null);
      console.log("Submitted");
    } catch (err) { 
      console.log("Some error");
    }
  };

  return (
    <section id="contact">
      <div className="mainContainer">
        <div className="contactusform">
          <h2>Contact Us</h2>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setMail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <button type="submit">Submit</button>
            {success && <p>Form Submitted Successfully</p>}
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contactusform;
