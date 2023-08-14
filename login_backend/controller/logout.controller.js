const logoutController = (req,res) =>{
    console.log("session in logout is: ",req.session);
    req.session.destroy( error => {
        console.log("session destroyed");
    });
    return res.status(200);
}

module.exports = logoutController;