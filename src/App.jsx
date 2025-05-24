import React from 'react'
import HomePage from './Routes/Homepage/homePage'
import messPage from './Routes/MessManagerPage/messPage'
import StudentPage from './Routes/StudentPage/studentPage'
import SuperAdminPage from './Routes/StudentPage/studentPage'
import { useAuth } from "./context/AuthContext"
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'
import Login from './Routes/Login/Login'
import MessPage from './Routes/MessManagerPage/messPage'
import Signup from './Routes/Signup/signup'
 

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to={`/${user.role}`} />} />
         <Route path="/signup" element={!user ? <Signup /> : <Navigate to={`/${user.role}`} />} />
        <Route path='/student' element={<StudentPage/>}/>
        <Route path='/mess_manager' element={<MessPage/>}/>
        {/* <Route path='/student' element={<StudentPage/>}/> */}
        {/* {user ? (
          <>
            {user.role === 'student' && <Route path='/student' element={<StudentPage />} />}
            {user.role === 'messmanager' && <Route path='/messmanager' element={<messPage />} />}
            {user.role === 'super_admin' && <Route path='/superadmin' element={<SuperAdminPage />} />}
            <Route path="*" element={<Navigate to={`/${user.role}`} />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )} */}
      </Routes>
    </Router>
  )
}

export default App