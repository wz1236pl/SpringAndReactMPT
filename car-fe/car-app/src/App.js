import React from 'react';
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Components/Home';
import RegisterForm from '../src/Components/RegisterForm';
import LoginForm from '../src/Components/LoginForm';
import AddAnnouncement from './Components/AddAnnouncement';
import Favorite from './Components/Favorite';
import CarList from './Components/CarList';
import ResetPassword from './Components/ResetPassword';

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/AddAnnouncement" element={<AddAnnouncement />} />
        <Route path="/Favorite" element={<Favorite />} />
        <Route path="/CarList" element={<CarList />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;
