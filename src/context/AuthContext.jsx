import { createContext, useContext, useEffect, useState } from "react";
import apiRequest from "../lib/apiRequest"; // Your axios instance
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token,setToken]=useState(null);
  const [loading, setLoading] = useState(true); 
  const nav=useNavigate(); 
  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token");
      // console.log(token);
      if (token) {
        try {
          const res = await apiRequest.get("/auth/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          
          setUser(res.data.user);
          setToken(token);
        } catch (err) {
          console.log("Token invalid or expired");
          localStorage.removeItem("token");
          logout();
          setUser(null);
        }
      }
      setLoading(false);
    };

    verifyUser();
  }, []);
 
  const login = (userData, tokenData) => {
    localStorage.setItem("token", tokenData);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setToken(tokenData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);  
    setToken(null);
    nav('/');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);