import React from 'react'
import HomePage from '../components/Homepage/homePage'
import messPage from '../components/MessManagerPage/messPage'
import StudentPage from '../components/StudentPage/studentPage'
import SuperAdminPage from '../components/StudentPage/studentPage'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
function App() {
  const {user}= useAuth();
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>} />

        {user ? (
         <>
         {user.role==='student' && <Route path='/student' element={<StudentPage/>}/>}
         {user.role==='messmanager' && <Route path='/messmanager' element={<messPage/>}/>}
         {user.role==='super_admin' && <Route path='/superadmin' element={<SuperAdminPage/>}/>}
         </> 
        ):
        (
          <Route path="*" element={<Navigate to="/" />} />
          //The path="*" is used as a fallback to handle invalid or undefined routes.
          //Without it, navigating to an undefined route would result in no component being rendered.
        )}
      </Routes>
    </Router>
  )
}

export default App