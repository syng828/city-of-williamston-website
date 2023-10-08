
import './App.css';
import Home from './pages/Home'
import Login from './pages/Login';
import Register from './pages/Register';
import MyPermit from './pages/MyPermit';
import SendPermit from './pages/SendPermit';
import ContactUs from './pages/ContactUs';
import DepartmentPage from './pages/DepartmentPage';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <AuthProvider>
        <Routes> 
          <Route path = "/"  element = {<Home/>} ></Route>
          <Route path = "/login"  element = {<Login/>}></Route>
          <Route path = "/register" element = {<Register/>}></Route>
          <Route path="/permit" element={<MyPermit/>}></Route>   
          <Route path = "/permitSend" element = {<SendPermit/>}></Route>
          <Route path = "/contact" element = {<ContactUs/>}></Route>
          <Route path = "/department" element = {<DepartmentPage/>}></Route>
        </Routes>
      </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
