import React , {useRef, useState} from 'react';
import { useNavigate } from "react-router-dom";
import 'styles/register.css';
import { FcOk } from "react-icons/fc";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"

/*
    TODO: 
        forward refs from PasswordInput to Register to be able to use the values to make http call
        update state in passwordinput for password validation.
*/

let register_url=process.env.REACT_APP_REGISTER_URL;

const registerUSer =  (userDetails) => {
    let registrationSuccess = fetch(register_url, {
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        credentials: 'include',
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
    });
    return registrationSuccess;
}

export default function Register(props){
    const navigate = useNavigate();
    
    let usernameRef = useRef(null);
    let passwordRef = useRef(null);
    let confirmPasswordRef = useRef(null);

    const [ passwordLength, setPasswordLength ] = useState();
    const [ passwordNumber, setpasswordNumber ] = useState();
    const [ passwordCase, setpasswordCase ] = useState();
    const [ passwordSpecialChar, setpasswordSpecialChar ] = useState();

    const [ showPassword, setShowPassword] = useState();
    const [ showConfirmPassword, setShowConfirmPassword] = useState();

    let registrationSuccess = false;

    const onInputHandle = (e) => {
        //TODO: write a single regex to do the password validation
        let enteredPassword = e.target.value;
        if(passwordRef.current.value.match(".*\\d+.*")){
            setpasswordNumber(true);
        }else{
            setpasswordNumber(false);
        }
        if(passwordRef.current.value.length >= 8){
            setPasswordLength(true);
        }else{
            setPasswordLength(false);
        }
        if(passwordRef.current.value.match('.*[a-z]+.*') && enteredPassword.match('.*[A-Z]+.*')){
            setpasswordCase(true);
        }else{
            setpasswordCase(false)
        }
        if(passwordRef.current.value.match("(?=.*?[#?!@$%^&*-])")){
            setpasswordSpecialChar(true);
        }else{
            setpasswordSpecialChar(false);
        }
     }

    const validatePassword = () =>{
        return (passwordNumber && passwordCase && passwordLength && passwordSpecialChar);
    }

    const handleRegistration = (e) => {
        e.preventDefault();
        if(validatePassword()){
            if(confirmPassword()){
                registrationSuccess=  registerUSer({
                    username: usernameRef.current.value,
                    password: passwordRef.current.value
                });
                registrationSuccess.then((success)=>{
                    if(success) navigate("/login");
                    //replace with popup box saying it failed
                    else alert("login failed!");
                });
            }
        }        
    }

    const confirmPassword = () => {
        if(passwordRef.current.value !== confirmPasswordRef.current.value) alert("passwords do not match, please try again");
        else return true;
     }

    const showPasswordHandler = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    }

    const showConfirmPasswordHandler = (e) => {
        e.preventDefault();
        setShowConfirmPassword(!showConfirmPassword);

    }

    return (
        //TODO: Move duplicate elements to a new component
        <div className='register'>
            <form onSubmit={handleRegistration}>
                <div>
                <h2 id="register-heading">Register</h2>
                <label htmlFor="username">
                    <p className='showInline' >Username</p>
                    <input className='showInline'   type="text" name="username" id="register-username" ref={usernameRef}/>  
                </label>
                <div  className="password-container">
                    <label htmlFor="password" >
                        <p className='showInline'>Password</p>
                        <input type={showPassword?"text":"password"} name = "password" id="register-password" ref={passwordRef}  onChange={onInputHandle} />
                        {showPassword?<FaRegEyeSlash className="show-password" onClick={showPasswordHandler}></FaRegEyeSlash>:<FaRegEye className="show-password" onClick={showPasswordHandler}></FaRegEye>}         
                    </label>
                </div>
                <p>Password must contain at least:</p>
                    <ul>                       
                        <li>8 characters {passwordLength?<FcOk></FcOk>:""}</li> 
                        <li>a number {passwordNumber?<FcOk></FcOk>:""}</li>
                        <li>one small case or upper case letter {passwordCase?<FcOk></FcOk>:""}</li>
                        <li>a special character {passwordSpecialChar?<FcOk></FcOk>:""}</li>
                        </ul>
                <div  className="password-container">
                    <label htmlFor="confirm-password">
                        <p>Confirm password</p>
                        <input type={showConfirmPassword?"text":"password"} name="confirm-password" id="confirm-password" ref={confirmPasswordRef}/>
                        {showConfirmPassword?<FaRegEyeSlash className="show-password" onClick={showConfirmPasswordHandler}></FaRegEyeSlash>:<FaRegEye className="show-password" onClick={showConfirmPasswordHandler}></FaRegEye>}
                    </label>
                </div>
                </div>
              <button type="submit" id= "submit">Submit</button>
            </form>
        </div>
    );
}