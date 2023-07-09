var logger = require('../config/winston.config.js');
const bcrypt = require('bcrypt');
const UserIdentity = require('../model/UserIdentity.model');

const login = (req,res)=>{
    UserIdentity.findOne({
        _username: req.body.username
    })
    .then(user =>{
        if(!user){
            return res.status(401).send({message:"Unauthorized! "});
        }else{
            let passwordValid = bcrypt.compareSync(req.body.password,user._password);
            if(!passwordValid){
                return res.status(401).send({message:"Unauthorized! "});
            }
            else {
                res.setHeader('Set-Cookie','loggedIn=true');
               // res.redirect('/dashboard')
                return res.status(200).send({message:"Login success"});
            }
        }
    })
    .catch(error=>{
        console.log(error);
        res.status(500).send({message: "An Internal Server error has occurred"});
        return;
    });
}


module.exports = login;