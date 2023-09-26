
import './App.css';
import Home from './pages/Home'
import Login from './pages/Login';
import Register from './pages/Register';
import Permit from './pages/Permit';
import ContactUs from './pages/ContactUs';
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
          <Route path="/permit" element={<Permit/>}></Route>   {/*removed private route, will add back later */}
          <Route path = "/contact" element = {<ContactUs/>}></Route>
        </Routes>
      </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
