import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import 'styles/login.css';

let login_url=process.env.REACT_APP_LOGIN_URL;

function loginUser(cred){
    console.log("login url is ",login_url);
    return fetch(login_url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        credentials: 'include', //how is it different in request and response
      //  credentials: 'include', //to send or receive cookies, use 'same-site' to allow cookies only from the same domain. use 'include' to allow cookies from any domain.
        body:JSON.stringify(cred)
    }) 
    .then(response=>{
        console.log("return status is ",response.status);
        console.log("response status is ",response);

        if(response.status==200){
           console.log("cookie from backend, ", response);
            let dataReceived = response.json();
            return dataReceived;
        }else if(response.status == 401){
            alert("Login failed. Unauthorized");
            return;
        }
        else{
            return;
        }
    })
    .then((data)=>{
        return data;
    })
    .catch((error)=>{
        console.log("error");
        return ;
    });
        
   }

export default function Login(props){
  // let setLoginState = props.setLoginState;
   const navigate = useNavigate();

   const [username, setUsername] = useState();
   const [password, setPassword] = useState();

    async function handleLogin(e){
        e.preventDefault();
        const loginSuccess = await loginUser({
            username,
            password
        });
        if(loginSuccess) {
            navigate("/dashboard");
           // setLoginState(loginSuccess);
        }
    }

    return(
        <div className="login" id="login"> 
        <h2>Please Log in to continue</h2>
        <form  onSubmit={handleLogin}>
            <label htmlFor="username">
                <p>Username:</p> 
                <input type="text" name="username" id="username" onChange={e=>setUsername(e.target.value)}/>  
            </label>              
            <label htmlFor="password">
                <p>Password:</p>
                <input type="password" id="password" onChange={e=>setPassword(e.target.value)} />
            </label>
            <div>
                <button type="submit" id="submit">Submit</button>
            </div>
        </form>
        </div>
    )
}
