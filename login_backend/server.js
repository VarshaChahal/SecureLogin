const cors = require('cors');
const fs = require('fs');
const http = require('http');
const https = require('https');

const express = require("express");
const app = express();

const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const session = require('express-session');


const loginRouter = require('./routes/login.route.js');
const registerRouter = require('./routes/register.route.js');
const messageRouter = require('./routes/message.route.js');
const logoutRouter = require('./routes/logout.route.js');

const redis = require('redis');
const RedisStore = require('connect-redis').default;
const connectMongoDB = require('./config/mongodb.config.js');
const connectRedisDB = require('./config/redis.config.js');

connectMongoDB();

let privateKey  = fs.readFileSync('./sslcert/LocalhostNode.key', 'utf8');
let certificate = fs.readFileSync('./sslcert/LocalhostNode.crt', 'utf8');

let credentials = {key: privateKey, cert: certificate};

let httpServer = http.createServer(app);
let httpsServer = https.createServer(credentials, app);

httpServer.listen(8080);
httpsServer.listen(8443);

// enable this if you run behind a proxy (e.g. nginx)
app.set('trust proxy', 1);

//session middleware setup
let redisStore = new RedisStore({
  client: connectRedisDB()
});
console.log("redis store is: ",redisStore.client);

app.use(
  session({
    store: redisStore,
    resave: false, //required
    saveUninitialized: false, //recommended
    secret: [process.env.SESS_SECRET1, process.env.SESS_SECRET2, process.env.SESS_SECRET3],
    cookie: {
      secure: true, //transmit over https only
      httpOnly: true, //prevent client side js from reading this cookie via document.cookie
      maxAge: 1000*60*10, //this will calculate the expire attribute as well
    }
  })
);


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
app.use(logoutRouter);

app.use(messageRouter);
app.get('/check',(req,res)=>{
    res.cookie('loggedIn','123',{ SameSite: 'None', httpOnly: true, secure: true });
    // res.redirect('/dashboard')
    return res.status(200).send({message:"Login success"});
})