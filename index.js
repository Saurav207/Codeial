const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 9000;

const db = require('./config/mongoose');

//used for session cookies

const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');


const expressLayouts = require('express-ejs-layouts');

const MongoStore = require('connect-mongo')(session);

const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'expanded',
    prefix: '/css'
}))

app.use(express.static('./assets'));
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
    secret: 'bhahsomething',
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

app.use('/', require('./routes'));  //middleware

app.listen(port, function(err) {
    if(err) {
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on Port : ${port}`);
});