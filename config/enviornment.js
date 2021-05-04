const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream("access.log", {
    interval: '1d',
    path: logDirectory

});

const development = {
    name: 'development',
    asset_path: './assets', 
    session_cookie_key: 'bhahsomething',
    db: 'codeial_devlopment',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
             user: 'saurav2071996@gmail.com', 
             pass: '' 
        }
    },
    google_client_id: "476201694499-4hecbed0lk7ha1581hcjj3f113csfmrq.apps.googleusercontent.com",
    google_client_secret: "6iBUqwRXJzyvMqdMYD7LIUHl",
    google_callback_url: "http://localhost:9000/user/auth/google/callback",
    jwt_key: 'codeial',
    morgan: {
   mode: 'dev',
   options: {stream: accessLogStream}
    }


}


 const production = {
    name: 'production',
    asset_path: process.env.CODEIAL_ASSET_PATH, 
    session_cookie_key: process.env.SESSION_COOKIE_KEY,
    db: process.env.DATABASE_NAME,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
             user:  process.env.USEREMAIL, 
             pass: process.env.USER_PASS 
        }
    },
    google_client_id: process.env.GOOGLE_CLIENT_ID,
    google_client_secret: process.env.GOOGLE_SECRET_KEY,
    google_callback_url: process.env.GOOGLE_CALLBACK_URL,
    jwt_key: process.env.JWT_SEC,
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}
         }

    }


 module.exports = eval(process.env.CODEIAL_ENVIORNMENT) == undefined ? development :  eval(process.env.CODEIAL_ENVIORNMENT);
//module.exports = development;