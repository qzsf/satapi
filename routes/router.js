const express = require('express');
const router = express.Router();

const wordController = require('../controllers/wordController');
const controller = wordController();

// DB
// const mysql = require('mysql');
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'pwd',
//     database: 'dictionary'
// })
// db.connect((err)=>{
//     if(err) {
//         throw err;
//     }
//     console.log('mysql connected.');
// })

function routes() {
    router.route('/voc')
        // HTTP GET return all items
        .get(controller.get)
        // HTTP POST create a new item
        .post(controller.post);

    // middleware for a route
    // next is a function that middleware uses to signal it has done with its
    // processing, and ready to pass the req to the next step
    router.use('/voc/:word', (req, res, next) => {
        const word = req.params.word;
        // mysql query the word
        // if mysql error, return res.send(error)
        // if word found { req.word = word; return next()}
        req.word = word;
        return next();
        // if word not found, return res.sendStatus(404);
    });

    // route with uri params
    router.route('/voc/:word')
        // by using the middleware we can just return the word here
        // return res.json(req.word);
        .get((req, res) => res.json({ id: req.word }))
        .put((req, res) => {
            // implement HTTP PUT here
        })
        .patch((req, res) => {
            // implement HTTP PATCH here
        })
        .delete((req,res)=>{
            // implement DELETE here
        });
    return router;
}

module.exports = routes;
