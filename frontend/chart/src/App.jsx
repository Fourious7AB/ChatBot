import React from 'react'
import Navber from './components/Navber'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import SettingPage from './pages/SettingPage'
import ProfilePage from './pages/ProfilePage'
import { useAuthStore } from './store/useAuthStore'
import { checkAuth } from './store/useAuthStore'
import { useEffect } from 'react'


function App() {

const {authUser, setAuthUser} = useAuthStore()
useEffect(() => {
    checkAuth();
}, [checkAuth]);
console.log({authUser});
if(!isCheckingAuth && !authUser) 
    return (
        <div className="flex items-center justify-center h-screen">
            <loader className="animate-spin h-10 w-10 text-blue-500" />
        </div>
    );






        


  return (
    <div>
      <Navber />
          <Routes>
              <Route path="/" element={<HomePage/>} />
              <Route path="/Signup" element={<SignupPage/>} />
              <Route path="/Login" element={<LoginPage/>} />
              <Route path="/Setting" element={<SettingPage/>}/>
              <Route path="/Profile" element={<ProfilePage/>}/>
          </Routes>
  </div>
  )
}

export default App