const cors = require('cors');
const rateLimit = require('express-rate-limit');
const loginRouter = require('./routes/login.route.js');
const registerRouter = require('./routes/register.route.js');

const connectMongoDB = require('./config/db.config.js');

connectMongoDB();

let fs = require('fs');
let http = require('http');
let https = require('https');
let bodyParser = require('body-parser');

let privateKey  = fs.readFileSync('./sslcert/LocalhostNode.key', 'utf8');
let certificate = fs.readFileSync('./sslcert/LocalhostNode.crt', 'utf8');

let credentials = {key: privateKey, cert: certificate};
const express = require("express");
const app = express();

let httpServer = http.createServer(app);
let httpsServer = https.createServer(credentials, app);

httpServer.listen(8080);
httpsServer.listen(8443);

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

let corsOptions = {
    origin: 'https://localhost:3000',
    credentials: true, // ******* DO NOT set credentials attr to true for all the paths
  }
app.use(cors(corsOptions));

let limiter = rateLimit({
  windowMs: 1*60*1000, //1 minute
  max: 100
})
app.use(limiter);

//allow only certain method types here for better security
app.use(loginRouter);
app.use(registerRouter);
app.get('/check',(req,res)=>{
    res.cookie('loggedIn','123',{ SameSite: 'None', httpOnly: true, secure: true });
    // res.redirect('/dashboard')
    return res.status(200).send({message:"Login success"});
})