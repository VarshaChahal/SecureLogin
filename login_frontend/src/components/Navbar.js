import React from 'react';
import { useNavigate, Link } from "react-router-dom";
import 'styles/navbar.css';


export default function Navbar(){
   const navigate = useNavigate();

    function handleLogin() {
      navigate("/login");
    }
    function handleRegister() {
        navigate("/register");
      }
  
    return (
        <div className='nav-container'>
            <ul>              
                <li className='nav-item'>
                    <Link to="/login" style={{ textDecoration: 'none' }}>Login</Link>
                </li>
                <li className='nav-item'>
                    <Link to="/register" style={{ textDecoration: 'none' }}>Register</Link>
                </li>
                <li className='nav-item'>
                    <Link to="/" style={{ textDecoration: 'none' }}>Guest</Link>
                </li>
                <li className='nav-item'>
                    <Link to="/" style={{ textDecoration: 'none' }}>About</Link>
                </li>
                <li className='nav-item'>
                    <Link to="/logout" style={{ textDecoration: 'none' }}>Logout</Link>
                </li>
            </ul>
        </div>     
    );
}