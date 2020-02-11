#!/usr/bin/env node

// create a reference to express
const express = require('express');
const bodyParser = require('body-parser');
// import router function and execute it
const router = require('./routes/router')();

// run express assign the returned value to app
const app = express();
const port = process.env.PORT || 3000;


// set up bodyParser for http POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', router);

app.get('/', (req, res) => {
    res.send('node api!');
});

app.listen(port, () => console.log(`running on port: ${port}`));
