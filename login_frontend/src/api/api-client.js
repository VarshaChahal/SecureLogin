let protocol = process.env.HTTPS?'https':'http';
let host = 'localhost';

const loginUser = (credentials) => {
    let login_url = backend_url +'api/auth/login'
    console.log("login url is ",login_url)
    return fetch(login_url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(credentials)
    })
    .then(data=>{
        let dataReceived = data.json();
        console.log(dataReceived);
        return dataReceived;
    })
    .then(resp=>{
        console.log(resp);
    })
   }

   const registerUSer =  (userDetails) => {
    fetch(register_url, {
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(userDetails)
    }).then((response)=>{
        if(response.status == 200){
            return true;      
        }
        else if(response.status == 401){
            alert('access is denied')
        }
    })
    
}

