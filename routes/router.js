const express = require('express');
const router = express.Router();

const wordController = require('../controllers/wordController');
const controller = wordController();

function routes() {
    router.route('/voc')
        // HTTP GET return all items
        .get(controller.getAll)
        // HTTP POST create a new item
        .post(controller.post);

    // uri params: example: /voc/sat/{"offset":5,"count":2}
    router.route('/voc/sat/:obj')
        .get(controller.getSat);

    // search word
    router.route('/voc/search/:str')
        .get(controller.search);

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
        .get(controller.get)
        .put(controller.put)
        .patch(controller.patch)
        .delete(controller.deleteEntry);

    return router;
}

module.exports = routes;
