import logo from './logo.svg';
import './App.css';
import Home from './pages/Home'
import Login from './pages/Login';
import Register from './pages/Register';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes> 
          <Route path = "/"  element = {<Home/>}></Route>
          <Route path = "/login"  element = {<Login/>}></Route>
          <Route path = "/register" element = {<Register/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
