import React , {useRef, useState} from 'react';
import { useNavigate } from "react-router-dom";

let register_url=process.env.REACT_APP_REGISTER_URL;

const registerUSer =  (userDetails) => {
    let registrationSuccess = fetch(register_url, {
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(userDetails)
    }).then((response)=>{
        if(response.status == 200){
            return true;      
        }
        else if(response.status == 409){
            alert("User already exists, please try with a different username.");
            return false;
        }
        else{
            return false;
        }
    })
    return registrationSuccess;
}

export default function Register(props){
    const navigate = useNavigate();

    let passwordRef = useRef(null);
    let usernameRef = useRef(null);
    let cofirmPasswordRef = useRef(null);
    let registrationSuccess = false;

    function handleRegistration(e){
        e.preventDefault();
        if(confirmPasswod()){
            registrationSuccess=  registerUSer({
                username:usernameRef.current.value,
                password: passwordRef.current.value
            });
            
        }
        registrationSuccess.then((success)=>{
            if(success) navigate("/login");
        })
    }

    function confirmPasswod(){
        if(passwordRef.current.value !== cofirmPasswordRef.current.value) alert("passwords do not match, please try again");
        else return true;
     }

    return (
        <div className='register'>
            <form onSubmit={handleRegistration}>
                <label htmlFor="username">
                    <p>Username</p>
                    <input type="text" name="username" id="register-username" ref={usernameRef}/>  
                </label>
                <label htmlFor="password">
                    <p>Password</p>
                    <input type="password" name = "password" id="register-password" ref={passwordRef} />
                </label>
                <label htmlFor="confirm-password">
                    <p>Confirm password</p>
                    <input type="password" name="confirm-password" id="confirm-password" ref = {cofirmPasswordRef}/>
                </label>
                <button type="submit" id= "register-submit">Submit</button>
            </form>
        </div>
    )
}