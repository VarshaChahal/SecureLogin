const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userIdentitySchema = new Schema({
    _username:{ type: String, required: true },
    _password:{ type: String, required: true},
    _salt: {type: String, required:true}
});

userIdentitySchema.methods.hash = function(password){
    console.log('generating salt 1st time', bcrypt.genSaltSync(8));
    console.log('generating salt 2nd time', bcrypt.genSaltSync(8));
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8),null);
};

userIdentitySchema.methods.validateUser = function(password){
    return bcrypt.compareSync(password,this.password);
};

let UserIdentity = mongoose.model('userIdentity',userIdentitySchema);

module.exports = UserIdentity;