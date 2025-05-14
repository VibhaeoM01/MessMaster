import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import "./index.scss";
import { AuthProvider } from "../src/context/AuthContext.jsx"; // Ensure the path is correct

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/* Use the correct name here */}
      <App />
    </AuthProvider>
  </React.StrictMode>,
);