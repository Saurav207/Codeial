const express = require('express');
const app = express();
const port = 2000;
const expressLayouts = require('express-ejs-layouts');
app.use(express.static('./assets'));
app.use(expressLayouts);

//extract the style and scripts from subpages into the layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
//use express router
app.use('/', require('./routes/index'));  //middleware
//setup the views engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err) {
    if(err) {
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on Port : ${port}`);
});