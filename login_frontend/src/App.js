import logo from './logo.svg';
import './App.css';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Home from './components/Home.js';

import Dashboard from './components/Dashboard.js';
import Navbar from 'components/Navbar.js';
import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom';
import NoPage from 'components/404page';
import { useState } from 'react';
import {Logout} from './components/Logout.js';

function App() {
  const [loginSuccess, setLoginSuccess] = useState();



  
  return (
    <div>
      
    <BrowserRouter>
    <Navbar></Navbar>
    <Routes>  
        <Route index element={<Home/>}/>
        <Route path = "/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path = "/dashboard" element={<Dashboard/>}></Route>
        <Route path="*" element={<NoPage/>} />
        <Route path="/logout" element={<Logout/>}/>

    </Routes>
    </BrowserRouter>
    </div>
    
    
  );
}

export default App;
