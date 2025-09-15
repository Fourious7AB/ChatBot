import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import SettingPage from "./pages/SettingPage";
import ProfilePage from "./pages/ProfilePage";
import { useAuthStore } from "./store/useAuthStore.js";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast"

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin h-10 w-10 text-blue-500" />
      </div>
    );
  }


  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser?<HomePage /> : <Navigate to='/Login'/>} />
        <Route path="/Signup" element={!authUser?<SignupPage />: <Navigate to='/' />}/>
        <Route path="/Login" element={!authUser?<LoginPage />: <Navigate to='/' />} />
        <Route path="/Setting" element={<SettingPage />} />
        <Route path="/Profile" element={authUser?<ProfilePage />: <Navigate to='/Login' />} />
      </Routes>
      <Toaster/>
    </div>
  );
}

export default App;
