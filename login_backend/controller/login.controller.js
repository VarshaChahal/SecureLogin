const UserIdentity = require('../model/UserIdentity.model');
const bcrypt = require('bcrypt');

const login = (req,res)=>{
    let salt = bcrypt.genSaltSync();
    UserIdentity.findOne({
        //can also check if req.body.username is a string or not
        _username: { $eq: req.body.username}        //using $eq to interpret user input as a query value and not as a query object, NoSql injection attack
    })
    .then(user =>{
        if(!user){
            //hash the user provided password to keep the response time same
            bcrypt.hashSync(req.body.password+'', salt,null);
            return res.status(401).send({message:"Unauthorized!"});
        }else{
 
            let passwordValid = bcrypt.compareSync(req.body.password+'',user._password);
            if(!passwordValid){
                return res.status(401).send({message:"Unauthorized!"});
            }
            else {
                res.cookie('loggedIn','123',{ SameSite: 'None', httpOnly: true, secure: true });
               // res.redirect('/dashboard')
                return res.status(200).send({message:"Login success"});
            }
        }
    })
    .catch(error=>{
        console.log(error);
        res.status(500).send({message: "An Internal Server error has occurred"});
    });
}


module.exports = login;