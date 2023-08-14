import { redirect, useNavigate } from "react-router-dom";
import { useEffect } from "react";
export  function Logout(req){
    const navigate = useNavigate();
    let req_error = false;
     useEffect(() => {
        console.log("in logout action");

        let logout_url=process.env.REACT_APP_LOGOUT_URL;

        fetch(logout_url,{
            method:'POST',
            credentials: 'include'
        }).catch(error =>{
            console.log("error during logout");
        });
        navigate("/");
      }, []);

}