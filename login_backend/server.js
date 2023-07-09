const cors = require('cors');
const loginRouter = require('./routes/login.route.js');
const registerRouter = require('./routes/register.route.js');

const connectMongoDB = require('./config/db.config.js');

connectMongoDB();

var fs = require('fs');
var http = require('http');
var https = require('https');
var bodyParser = require('body-parser');

var privateKey  = fs.readFileSync('./sslcert/LocalhostNode.key', 'utf8');
var certificate = fs.readFileSync('./sslcert/LocalhostNode.crt', 'utf8');

var credentials = {key: privateKey, cert: certificate};
const express = require("express");
const app = express();

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(8080);
httpsServer.listen(8443);

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(cors());

//allow only certain method types here for better security
app.use(loginRouter);
app.use(registerRouter);
app.get('/check',(req,res)=>{
    res.send("hey");
})

//app.listen(8000, ()=>{console.log(`app listening on port ${port}`)});