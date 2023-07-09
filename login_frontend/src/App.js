import logo from './logo.svg';
import './App.css';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Dashboard from './components/Dashboard.js';
import Home from 'components/Home.js';
import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom';
import NoPage from 'components/404page';
import { useState } from 'react';


function App() {
  const [loginSuccess, setLoginSuccess] = useState();
  const [registrationSuccess, setRegistrationSuccess] = useState();
  if(loginSuccess){
    return <Dashboard/>
  } 

  if(registrationSuccess){
    return <Login setLoginState={setLoginState}/>;
  }
  function setLoginState(value){
    setLoginSuccess(value);
  }

  
  return (
    <BrowserRouter>
    <Routes>
        <Route index element={<Home/>}/>
        <Route path = "/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login setLoginState={setLoginState}/>}></Route>
        <Route path = "/dashboard" element={<Dashboard/>}></Route>
        <Route path="*" element={<NoPage/>} />

    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
