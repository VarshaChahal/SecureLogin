const bcrypt = require('bcrypt');
const UserIdentity = require('../model/UserIdentity.model');
let logger = require('../config/winston.config.js');

const register = async (req,res) =>{
    console.log("request body: ",req.body);
    let salt = bcrypt.genSaltSync();
    const userIdentity = new UserIdentity({
        _username : req.body.username,
        _password:  bcrypt.hashSync(req.body.password+'', salt,null),
        _salt : salt
    });

    UserIdentity.findOne({
        _username: { $eq: req.body.username}
    })
    .then((user_found)=>{
        if(user_found) {
            res.status(409).send({message:"User already exists"});
        } else{
            userIdentity.save().then((user)=>{
                if(user){
                    res.status(200).send({message:"User registered successfully!"});
                 }else{
                    logger.error(error);
                    res.status(500).send({message: "An Internal Server error has occurred"});
                    ;
                }
            })
             
        } 
    })

    
} ;

module.exports = register;