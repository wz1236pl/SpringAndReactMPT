import React from 'react';
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Components/Home';
import RegisterForm from '../src/Components/RegisterForm';
import LoginForm from '../src/Components/LoginForm';
import AddAnnouncement from './Components/AddAnnouncement';
import CarList from './Components/CarList';
import ResetPassword from './Components/ResetPassword';
import EditCar from './Components/EditCar';
import AddNote from './Components/AddNote';
import EditNote from './Components/EditNote';

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
        <Route path="/CarList" element={<CarList />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/EditCar/:id" element={<EditCar />} />
        <Route path="/AddNote/:id" element={<AddNote />} />
        <Route path="/EditNote/:id" element={<EditNote />} />
      </Routes>
    </>
  );
}

export default App;
