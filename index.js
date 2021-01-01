const express = require('express');
const app = express();
const port = 2000;

app.listen(port, function(err) {
    if(err) {
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on Port : ${port}`);
});