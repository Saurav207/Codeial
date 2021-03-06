const express = require('express');
var logger = require('morgan')
const env = require('./config/enviornment');
const cookieParser = require('cookie-parser');
const app = express();
require('./config/viewHelper')(app);
const port = 9000;

const db = require('./config/mongoose');

//used for session cookies

const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

const expressLayouts = require('express-ejs-layouts');


const MongoStore = require('connect-mongo')(session);  

const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

const path = require('path');

//setup the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_socket').chatSockets(chatServer);
chatServer.listen(7000);
console.log("chat server is listening on port 5000");

// const kue = require('kue');

if(eval.name == 'development') {
app.use(sassMiddleware({
    src: path.join(__dirname, env.asset_path, '/scss'),
    dest: path.join(__dirname, env.asset_path, 'css'),
    debug: true,
    outputStyle: 'expanded',
    prefix: '/css'
}))
}

app.use(express.static(env.asset_path));
//make the uploads path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));


app.use(logger(env.morgan.mode, env.morgan.options));


app.use(expressLayouts);
app.use(express.urlencoded());
app.use(cookieParser());


//extract the style and scripts from subpages into the layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
//use express router

//setup the views engine
app.set('view engine', 'ejs');
app.set('views', './views');

//mongo store is uesd to store the session cookie in the db
app.use(session({
    name: 'codeial',
    //TODO chnages the secret before deployment in production mode
    
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000* 60 * 100)
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    },
    function(err) {
        console.log(err || 'connect-mongodb setup ok');
    }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);


app.use('/', require('./routes'));  //middleware

app.listen(port, function(err) {
    if(err) {
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on Port : ${port}`);
});