const bcrypt = require('bcrypt');
const UserIdentity = require('../model/UserIdentity.model');
var logger = require('../config/winston.config.js');

const register = async (req,res) =>{
    console.log("request is ",req.body.username);
    let salt = bcrypt.genSaltSync();
    const userIdentity = new UserIdentity({
        _username : req.body.username,
        _password: bcrypt.hashSync(req.body.password, salt,null),
        _salt : salt
    });

    UserIdentity.findOne({
        _username: req.body.username
    })
    .then((user)=>{
        if(user) {
            res.status(409).send({message:"User already exists"});
            return;
        } else{
            user = userIdentity.save().then((user)=>{
                if(user){
                    res.status(200).send({message:"User registered successfully!"});
                    return;
                 }else{
                    logger.error(error);
                    res.status(500).send({message: "An Internal Server error has occurred"});
                    return;
                }
            })
             
        } 
    })

    
} ;

module.exports = register;