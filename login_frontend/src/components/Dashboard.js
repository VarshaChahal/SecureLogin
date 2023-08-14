import React from 'react';
import 'styles/dashboard.css';

let message_url=process.env.REACT_APP_MESSAGE_URL;

export default function Dashboard(){
    const sendMessage = (message) => {
        return fetch(message_url,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            credentials: 'include', //how is it different in request and response
          //  credentials: 'include', //to send or receive cookies, use 'same-site' to allow cookies only from the same domain. use 'include' to allow cookies from any domain.
            body:JSON.stringify(message)
        }) 
        .then(response=>{
            console.log("return status is ",response.status);
            console.log("response status is ",response);
    
            if(response.status==200){
               console.log("cookie from backend, ", response);
                let dataReceived = response.json();
                return dataReceived;
            }else if(response.status != 200){
                alert("Something went wrong sending the message");
                return;
            }
            return;
        })
        .then((data)=>{
            return data;
        })
        .catch((error)=>{
            console.log("error");
            return ;
        });
    }

    const onMessageSubmit = async (e)=>{
        e.preventDefault();
        const messageSuccess = await sendMessage({
            "message":e.target.value,
        });
        if(messageSuccess) {
           // navigate("/dashboard");
           // setLoginState(loginSuccess);
           alert("message was sent successfully");
        }
    }
    return (
        <div id="message-container">
            <h2> Hey there! you successfully logged in</h2>
            <form onSubmit={onMessageSubmit}>
                <p>Your message:</p>
                <textarea id="message-area"></textarea>
                <button type="submit" id= "submit">Submit</button>
            </form>
        </div>
    )
}